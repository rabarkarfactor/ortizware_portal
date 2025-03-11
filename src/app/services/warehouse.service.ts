import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from "@angular/platform-browser";
import { ApiToken, SessionData, User } from "../models/app.models";
import { Router } from "@angular/router";
import { AppTools } from "../app.tools";
import { HttpApiClient } from "./httpapiclient.service";
import { storeinfo } from "../models/warehouse.models"

@Injectable({  providedIn: 'root' })
export class WarehouseService {

  backendEndpoint: string;
  private http: HttpApiClient;

  constructor(http: HttpApiClient, @Inject('BACKEND_ENDPOINT') backendEndpoint: string, private sanitizer: DomSanitizer, private router: Router) {
    this.http = http;
    this.backendEndpoint = backendEndpoint;
  }

  storeinfo(storedata: string): Promise<storeinfo[]> {
    return new Promise<storeinfo[]>((resolve, reject) => {
      this.http.get<storeinfo[]>(this.backendEndpoint + 'warehouse/warehouseinfo?store=' + storedata )
        .subscribe({
          next: stdata => {
            resolve(stdata);
          },
          error: error => {
            reject(AppTools.getErrorObject(error));
          }
        });
    });
  }

}
