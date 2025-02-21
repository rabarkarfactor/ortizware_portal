import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './services/login.service';
import { LoginComponent } from './components/login/login.component';
import { MenuPanelComponent } from "./components/menu-panel/menu-panel.component";
import { User } from './models/app.models';
import { MatDialog } from '@angular/material/dialog';
import { AppTools } from './app.tools';
import { AppCommonDialog, DialogArgs, DialogOps, DialogResult, DialogType } from './components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    LoginComponent,
    MenuPanelComponent,
    MenuPanelComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    LoginService
  ]
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  private sideNavStatus: {
    mode: MatDrawerMode,
    open: boolean
  } = {
      mode: 'over',
      open: false
    };
  private dialog = inject(MatDialog);
  protected currentUser: User = new User();

  protected get sessionToken(): string | undefined {
    return LoginService.ApiToken;
  }

  constructor(private bpObserver: BreakpointObserver, private loginService: LoginService) { }

  ngAfterViewInit(): void {
    this.bpObserver
      .observe(['(max-width: 800px)'])
      .subscribe(res => {
        if (res.matches)
          this.sideNavStatus = {
            mode: 'over',
            open: false
          };
        else
          this.sideNavStatus = {
            mode: 'side',
            open: true
          };

        this.setupSideNav();
      });
  }

  setupSideNav(countInit: number = 10) {
    let maxTry = countInit;

    if (maxTry <= 0) {
      return;
    }

    if (!this.sidenav) {
      setTimeout(() => { this.setupSideNav(maxTry - 1) }, 100);
    }
    else {
      this.sidenav.mode = this.sideNavStatus.mode;

      if (this.sideNavStatus.open)
        this.sidenav.open();
      else
        this.sidenav.close();
    }
  }


  ngOnInit(): void {
    console.log('OnInit');
    this.loginService.checkSession()
      .then(usr => {
        this.currentUser = usr;
      })
      .catch(error => {

      });
  }

  doLogin(loginArgs: any) {
    this.setupSideNav();
    this.loginService.login(loginArgs)
      .then(ssdata => {
        this.currentUser = ssdata.user;
      })
      .catch(error => {
        alert(`${error.errorSource} - ${error.statusDescription}`)
      })
  }

  logout() {
    this.openDialog({
      title: 'Salir de Aplicacion',
      message: '¿Esta seguro que desea salir de la aplicación?',
      ops: DialogOps.OkCancel,
      type: DialogType.Directions
    })
      .then(res => {
        if (res == DialogResult.Ok) {
          this.loginService.logout()
            .then(() => {
              this.currentUser = new User();
            })

        }
      });
  }

  openDialog(args: DialogArgs): Promise<DialogResult> {
    return new Promise<DialogResult>(resolve => {
      this.dialog.open(AppCommonDialog, {
        data: args
      })
        .afterClosed()
        .subscribe((res: boolean | undefined) => {
          resolve(
            res == undefined ? DialogResult.Escape :
              res ? DialogResult.Ok : DialogResult.Cancel
          );
        });

    });
  }
}
