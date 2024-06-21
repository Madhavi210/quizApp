import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from 'src/app/shared/services/quiz.service';
import { IQuiz } from 'src/app/shared/models/quiz.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private quizService:QuizService, private router:Router){
    this.quizForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnInit(): void{}

  onSubmit():void{ 
    if(this.quizForm.valid){
      const { title, description } = this.quizForm.value;
      const newQuiz: any = {
        title,
        description,
        // Add questions array here if needed
      };
      this.quizService.createQuiz(newQuiz).subscribe(
        (createdQuiz: IQuiz) => {
          console.log('Quiz created:', createdQuiz);
          // Optionally, display a success message or redirect to quiz listing
        },
        (error) => {
          console.error('Failed to create quiz:', error);
          // Handle error (e.g., display error message)
        }
      );
    }
  }


}
