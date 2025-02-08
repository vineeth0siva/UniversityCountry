import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAddingComponent } from './data-adding.component';

describe('DataAddingComponent', () => {
  let component: DataAddingComponent;
  let fixture: ComponentFixture<DataAddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataAddingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
