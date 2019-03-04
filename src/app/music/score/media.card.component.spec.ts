import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Media.CardComponent } from './media.card.component';

describe('Media.CardComponent', () => {
  let component: Media.CardComponent;
  let fixture: ComponentFixture<Media.CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Media.CardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Media.CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
