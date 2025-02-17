import { SafeResourceUrl } from "@angular/platform-browser";

export class AppModule {
    public id: number = 0;
    public name: string = '';
    public label: string = '';
    public path: string = '';
    public level: number = 0;
    public active: boolean = false;
    public orderNum: number = 0;
    public addedToProfile: boolean = false;
}

export class Profile {
    public id: number = 0;
    public name: string = 'New Profile';
    public access: string = 'USER';
    public modules: AppModule[] = [];
    public users: User[] = [];
}

export class User {
    public id: number = 0;
    public userName: string = '';
    public fullName: string = '';
    public title: string = '';
    public email: string = '';
    public b64Pic: string = '';
    public localKey: string = '';
    public active: boolean = false;
    public safePic: SafeResourceUrl | undefined;
    public modules: AppModule[] = [];
    public selected: boolean = false;
}

export class TokenCreationLog {
    public id: number = 0;
    public tokenId: string = '';
    public user: User = new User();
    public userFullName: string = '';
    public audience: string = '';
    public expires: Date = new Date();
    public timestamp: Date = new Date();
    public remoteAddress: string = '';
    public clientAddress: string = '';
}

export class SessionData {
    public user: User = new User();
    public token: ApiToken = new ApiToken();
}

export class AppInfo {
    public name: string = '';
    public description: string = '';
    public version: string = '';
    public comments: string = '';
    public vector: string = '';
    public profiles: Array<Profile> = [];
}

export class ApiToken {
    public token: string = '';
    public expires: Date = new Date();
    public issuer: string = '';
    public audience: string = '';
}

export class PagedDataSet<T> {
    public totalRecs: number = 0;
    public pageSize: number = 10;
    public pageNum: number = 1;
    public recs: Array<T> = [];
    public query: string = '';
    public get numPages(): number {
        if (this.pageSize == 0) return 0;
        return Math.ceil(this.totalRecs / this.pageSize);
    }
}

export class PicResource {
    public label: string = '';
    public b64Content: string = '';
    public safeResourceContent: SafeResourceUrl | undefined;
    public mimeType: string = '';
}

export class Module {
    public id: number = 0;
    public name: string = '';
    public label: string = '';
}

export class RawFile {
    public name: string = '';
    public mimeType: string = '';
    public b64Content: string = '';
}
