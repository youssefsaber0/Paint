import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapesHComponent } from './shapes-h.component';

describe('ShapesHComponent', () => {
  let component: ShapesHComponent;
  let fixture: ComponentFixture<ShapesHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapesHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapesHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
