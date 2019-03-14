import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreEditDialog } from './dialog-score-edit.dialog';

describe('DialogScoreEditComponent', () => {
  let component: ScoreEditDialog;
  let fixture: ComponentFixture<ScoreEditDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreEditDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreEditDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
