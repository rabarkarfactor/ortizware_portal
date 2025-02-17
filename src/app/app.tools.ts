import { HttpErrorResponse } from "@angular/common/http";
import { PicResource, User } from "./models/app.models";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

export class AppTools {
    static uuidv4() {
        var buf = new Uint32Array(4);
        window.crypto.getRandomValues(buf);
        var idx = -1;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            idx++;
            var r = (buf[idx >> 3] >> ((idx % 8) * 4)) & 15;
            var v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static getErrorObject(error: any) {
        if (error.error && error.error.errorSource)
            return error.error;
        else if (error instanceof HttpErrorResponse) {
            return {
                errorSource: 'Api',
                statusDescription: error.message
            };
        }
        else {
            return {
                errorSource: 'Api',
                statusDescription: 'Unknown Error Received'
            };
        }
    }

    static base64ArrayBuffer(arrayBuffer: ArrayBuffer): string {
        var base64: string = '';
        var encodings: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

        var bytes: Uint8Array = new Uint8Array(arrayBuffer);
        var byteLength: number = bytes.byteLength;
        var byteRemainder: number = byteLength % 3;
        var mainLength: number = byteLength - byteRemainder;

        var a, b, c, d;
        var chunk;

        // Main loop deals with bytes in chunks of 3
        for (var i = 0; i < mainLength; i = i + 3) {
            // Combine the three bytes into a single integer
            chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

            // Use bitmasks to extract 6-bit segments from the triplet
            a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
            b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
            c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
            d = chunk & 63;               // 63       = 2^6 - 1

            // Convert the raw binary segments to the appropriate ASCII encoding
            base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
        }

        // Deal with the remaining bytes and padding
        if (byteRemainder == 1) {
            chunk = bytes[mainLength];

            a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

            // Set the 4 least significant bits to zero
            b = (chunk & 3) << 4;// 3   = 2^2 - 1

            base64 += encodings[a] + encodings[b] + '==';
        } else if (byteRemainder == 2) {
            chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

            a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
            b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

            // Set the 2 least significant bits to zero
            c = (chunk & 15) << 2; // 15    = 2^4 - 1

            base64 += encodings[a] + encodings[b] + encodings[c] + '=';
        }

        return base64;
    }

    static resizeImageFromDataUrl(dataUrl: string, maxWidth: number, maxHeight: number):  Promise<string> {
        return new Promise<string>((resolve) => {
            const image = new Image();
            image.onerror = function (err) { console.log("Failed Image", err); };
            image.onload = function () {
                if (image.width <= maxWidth && image.height <= maxHeight) {
                    resolve(dataUrl);
                }
                else {
                    let newWidth = maxWidth;
                    let newHeight = maxHeight;
                    const canvas = document.createElement('canvas');

                    // Seeting same aspect ratio
                    newHeight = image.height * maxWidth / image.width;
                    newWidth = image.width * maxHeight / image.height;

                    if (newHeight < maxHeight) {
                        newWidth = maxWidth;
                    }
                    else {
                        newHeight = maxHeight;
                    }

                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    const ctx = canvas.getContext('2d');
                    if (ctx != null) {
                        ctx.drawImage(image, 0, 0, newWidth, newHeight);
                    }

                    var data = canvas.toDataURL(dataUrl.substring(dataUrl.indexOf('base64,') + 7), 1);
                    resolve(data);
                }
            };
            image.src = dataUrl;
        });
    }


    static resizeImage(pic: PicResource, maxWidth: number, maxHeight: number, sanitizer: DomSanitizer | undefined): Promise<PicResource> {
        return new Promise<PicResource>((resolve) => {
            const image = new Image();
            image.onerror = function (err) { console.log("Failed Image", err); };
            image.onload = function () {
                if (image.width <= maxWidth && image.height <= maxHeight) {
                    resolve(pic)
                }
                else {
                    let newPic: PicResource = new PicResource();
                    newPic.label = pic.label;
                    let newWidth = maxWidth;
                    let newHeight = maxHeight;
                    const canvas = document.createElement('canvas');

                    // Seeting same aspect ratio
                    newHeight = image.height * maxWidth / image.width;
                    newWidth = image.width * maxHeight / image.height;

                    if (newHeight < maxHeight) {
                        newWidth = maxWidth;
                    }
                    else {
                        newHeight = maxHeight;
                    }

                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    const ctx = canvas.getContext('2d');
                    if (ctx != null) {
                        ctx.drawImage(image, 0, 0, newWidth, newHeight);
                    }

                    var data = canvas.toDataURL(pic.mimeType, 1);
                    newPic.b64Content = data.substring(data.indexOf('base64,') + 7);
                    newPic.mimeType = pic.mimeType;
                    if (sanitizer) {
                        newPic.safeResourceContent = sanitizer.bypassSecurityTrustResourceUrl(`data:${newPic.mimeType};base64,${newPic.b64Content}`);
                    }

                    resolve(newPic);
                }
            };
            image.src = `data:${pic.mimeType};base64,${pic.b64Content}`;
        });
    }

    static getWindowSize(): {height: number, width: number, layout: string} {
        var size = 'na';
        if (window.innerWidth < 768) {
            size = 'xs';
        } else if (window.innerWidth < 992) {
            size = 'sm';
        } else if (window.innerWidth < 1200) {
            size = 'md'
        } else {
            size = 'lg';
        }
        return {
            height: window.innerHeight,
            width: window.innerWidth,
            layout: size
        };
    }

    static HapticFeedBack() {
        window.navigator.vibrate(40);
    }

    static cleanUsrPic(user: User, sanitizer: DomSanitizer) {
        if (user.b64Pic && user.b64Pic.trim() != '')
            user.safePic = sanitizer.bypassSecurityTrustResourceUrl(user.b64Pic);
        else
        user.safePic = sanitizer.bypassSecurityTrustResourceUrl('assets/imgs/generic_user.svg');
    }

}