import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScCommonComponent } from './sc-common.component';

describe('ScCommonComponent', () => {
  let component: ScCommonComponent;
  let fixture: ComponentFixture<ScCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
