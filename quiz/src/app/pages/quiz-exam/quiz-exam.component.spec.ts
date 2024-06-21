import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizExamComponent } from './quiz-exam.component';

describe('QuizExamComponent', () => {
  let component: QuizExamComponent;
  let fixture: ComponentFixture<QuizExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizExamComponent]
    });
    fixture = TestBed.createComponent(QuizExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
