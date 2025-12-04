import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighscorePageComponent } from './highscore-page.component';

describe('HighscorePageComponent', () => {
  let component: HighscorePageComponent;
  let fixture: ComponentFixture<HighscorePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighscorePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighscorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
