import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsocijacijeHolderComponent } from './asocijacije-holder.component';

describe('AsocijacijeHolderComponent', () => {
  let component: AsocijacijeHolderComponent;
  let fixture: ComponentFixture<AsocijacijeHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsocijacijeHolderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsocijacijeHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
