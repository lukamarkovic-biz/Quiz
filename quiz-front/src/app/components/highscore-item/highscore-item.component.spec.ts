import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighscoreItemComponent } from './highscore-item.component';

describe('HighscoreItemComponent', () => {
  let component: HighscoreItemComponent;
  let fixture: ComponentFixture<HighscoreItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighscoreItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighscoreItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
