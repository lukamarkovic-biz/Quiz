import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoznaznaPageComponent } from './koznazna-page.component';

describe('KoznaznaPageComponent', () => {
  let component: KoznaznaPageComponent;
  let fixture: ComponentFixture<KoznaznaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KoznaznaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KoznaznaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
