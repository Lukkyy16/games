import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectNComponent } from './connect-n.component';

describe('ConnectNComponent', () => {
  let component: ConnectNComponent;
  let fixture: ComponentFixture<ConnectNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
