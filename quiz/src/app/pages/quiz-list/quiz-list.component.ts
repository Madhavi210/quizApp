import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/shared/services/quiz.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IQuiz } from 'src/app/shared/models/quiz.model';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit{

  quizzes: IQuiz[] = [];

  constructor(
    private quizService:QuizService, 
    private route:ActivatedRoute ,
    private router:Router, 
    private formBuilder:FormBuilder
  ){ }
  
  ngOnInit(): void {
    this.fetchQuiz();
  }


  fetchQuiz(): void {
    this.quizService.getQuiz().subscribe(
      (quizzes: IQuiz[]) =>{
        this.quizzes = quizzes
      }, (error) => {
        console.error('error fetching quiezzes', error)
      }
    )
  }

  onSelectQuiz(quizId: string): void {
    this.router.navigate(['/quizExam', quizId]);
  }

}
