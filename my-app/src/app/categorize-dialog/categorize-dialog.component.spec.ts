import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorizeDialogComponent } from './categorize-dialog.component';

describe('CategorizeDialogComponent', () => {
  let component: CategorizeDialogComponent;
  let fixture: ComponentFixture<CategorizeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorizeDialogComponent ]
    })
    .compileComponents();
  }); 

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorizeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
