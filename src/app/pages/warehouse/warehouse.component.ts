import { Component, Renderer2, ElementRef, OnInit, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { storeinfo, wsdetails } from "../../models/warehouse.models"
import { WarehouseService } from '../../services/warehouse.service';
import { Router } from '@angular/router';
import { ModalloadingComponent } from '../../components/modalloading/modalloading.component'



@Component({
  selector: 'app-warehouse',
  imports: [
    CommonModule,
    ModalloadingComponent
  ],
  providers:[WarehouseService],
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css'
})
export class WarehouseComponent implements OnInit {
  isLoading = true;
  slideOut = false;
  public _store: string = "";
  public _storedetails: wsdetails[] = [];
  active_warehousedetail = false;
  public stdatas: storeinfo[] = [];
  public stdatasfilter: storeinfo [] =[]; 
  constructor(private renderer: Renderer2, private el: ElementRef, public appdbroc: WarehouseService, private router: Router) { }

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'height', 'calc(100vh - 105px)');
    this.renderer.setStyle(this.el.nativeElement, 'width', 'calc(100% - 100px)');
    this.renderer.setStyle(this.el.nativeElement, 'text-align', 'center');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
    this.getdashboard();
  }

  getdashboard() {
    this.appdbroc.storeinfo("ALL")
      .then(stdata => {
        this.stdatas = stdata;
        this.isLoading = false;
      })
      .catch((error) => {

      });
  }

  goToDetail(_storef: string) {
    this._store = _storef;
    this.active_warehousedetail = true;
    console.log("Esto es para mostrar", this.stdatas);
    this.stdatasfilter = this.stdatas.filter(details =>
      details.store.toLowerCase().includes(_storef));
    console.log("Esto es para mostrar", this.stdatasfilter);
  }

  CloseDetail(){
    this.active_warehousedetail = false;
  }
}
