import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './services/login.service';
import { LoginComponent } from './components/login/login.component';
import { MenuPanelComponent } from "./components/menu-panel/menu-panel.component";

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
export class AppComponent implements AfterViewInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  protected get sessionToken(): string | undefined {
    return LoginService.ApiToken;
  }

  constructor(private bpObserver: BreakpointObserver, private loginService: LoginService) { }

  ngAfterViewInit(): void {
    this.bpObserver
      .observe(['(max-width: 800px)'])
      .subscribe(res => {
        if (this.sidenav)
          if (res.matches) {
            this.sidenav.mode = "over";
            this.sidenav.close();
          }
          else {
            this.sidenav.mode = "side";
            this.sidenav.open();
          }
      });
  }
}
