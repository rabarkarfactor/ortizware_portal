import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-modalloading',
  imports: [MatProgressSpinnerModule],
  templateUrl: './modalloading.component.html',
  styleUrl: './modalloading.component.css'
})
export class ModalloadingComponent {

}
