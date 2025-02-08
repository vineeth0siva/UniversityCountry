import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityHomeComponent } from './university-home.component';

describe('UniversityHomeComponent', () => {
  let component: UniversityHomeComponent;
  let fixture: ComponentFixture<UniversityHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversityHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversityHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
