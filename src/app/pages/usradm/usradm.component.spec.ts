import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsradmComponent } from './usradm.component';

describe('UsradmComponent', () => {
  let component: UsradmComponent;
  let fixture: ComponentFixture<UsradmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsradmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsradmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
