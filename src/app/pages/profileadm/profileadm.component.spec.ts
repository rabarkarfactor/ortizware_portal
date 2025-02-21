import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileadmComponent } from './profileadm.component';

describe('ProfileadmComponent', () => {
  let component: ProfileadmComponent;
  let fixture: ComponentFixture<ProfileadmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileadmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileadmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
