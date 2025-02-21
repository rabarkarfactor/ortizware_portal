import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/app.models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-panel',
  imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './menu-panel.component.html',
  styleUrl: './menu-panel.component.css'
})
export class MenuPanelComponent {
  @Input() user: User = new User();
  @Output() logoutTriggered = new EventEmitter();

  sendLogout() {
    this.logoutTriggered.emit();
  }
}
