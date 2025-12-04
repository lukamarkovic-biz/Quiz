import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsocijacijePageComponent } from './asocijacije-page.component';

describe('AsocijacijePageComponent', () => {
  let component: AsocijacijePageComponent;
  let fixture: ComponentFixture<AsocijacijePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsocijacijePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsocijacijePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
