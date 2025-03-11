export class storeinfo {
  public store: string = '';
  public qty_items: string = '';
  public sales_metales: number = 0;
  public sales_otros: number = 0;
  public inventory_metales: number = 0;
  public inventory_otros: number = 0;
  public details: wsdetails[] = [];
}

export class wsdetails {
  public sstore: string = '';
  public uom: string = '';
  public item: string = '';
  public sales: number = 0;
  public itemtype: string = '';
  public inventory: number = 0;
  public surtir_30: number = 0;
  public surtir_45: number = 0;
  public sugerido_30: number = 0;
  public sugerido_45: number = 0;
  public proyeccion_30: number = 0;
  public proyeccion_45: number = 0;
  public itemdescription: string = '';
}
