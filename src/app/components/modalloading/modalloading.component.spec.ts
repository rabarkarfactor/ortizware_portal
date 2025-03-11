import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalloadingComponent } from './modalloading.component';

describe('ModalloadingComponent', () => {
  let component: ModalloadingComponent;
  let fixture: ComponentFixture<ModalloadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalloadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
