import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/shared/services/quiz.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IQuiz } from 'src/app/shared/models/quiz.model';
import { ResultService } from 'src/app/shared/services/result.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-quiz-exam',
  templateUrl: './quiz-exam.component.html',
  styleUrls: ['./quiz-exam.component.scss']
})
export class QuizExamComponent implements OnInit {
  quizForm!: FormGroup;
  quiz!: IQuiz;
  userToken: string | null = null ;
  userId: string | undefined;

  ngOnInit(): void {
    this.initializeForm();
    this.fetchQuiz();
    // this.userToken = localStorage.getItem('token') ;
    // this.fetchUserIdFromToken();
  }

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private resultService: ResultService,
    private formBuilder: FormBuilder,
    private router:Router,
  ) { }

  initializeForm(): void {
      this.quizForm = this.formBuilder.group({
        answers: this.formBuilder.array([]) 
      });
  }

  fetchQuiz(): void {
    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.quizService.getQuizById(quizId).subscribe(
        (quiz: IQuiz) => {
          this.quiz = quiz;
          this.initializeFormArray();
        },
        (error) => {
          console.error('Error fetching quiz:', error);
        }
      );
    }
  }

  initializeFormArray():void{ 
    const formArray = this.quizForm.get('answers') as FormArray;
    this.quiz.questions.forEach(() => {
      formArray.push(this.formBuilder.control(null, Validators.required));
    });
  }

  // fetchUserIdFromToken(userToken: string | null): string | null {
  //   try {
  //     if (!userToken) {
  //       console.error('No token found in local storage');
  //       return null;
  //     }
  //     const decodedToken: any = jwt_decode(userToken);
  //     return decodedToken.userId;
  //   } catch (error) {
  //     console.error('Error decoding JWT token:', error);
  //     return null;
  //   }
  // }

  onSubmit(): void {
    if (this.quizForm.valid && this.quiz) {
      const selectedAnswers = this.quizForm.value.answers;
      const totalQuestions = this.quiz.questions.length;
      const score = this.calculateScore(selectedAnswers);
      const grade = this.calculateGrade(score, totalQuestions);
      const userToken = localStorage.getItem('token');
      const quizId = this.route.snapshot.paramMap.get('id');
      // if(!userToken){
      //   console.error('no token found in local storage');
      //   return ;
      // }
      const resultData = {
        quizId: quizId,
        user: "6675054eaec27466d1597ce6",
        score,
        totalQuestions,
        grade,
        attemptedAt: new Date(),
      };

      // console.log(resultData);
      // console.log(selectedAnswers, totalQuestions, score, grade,quizId );
      
      
      this.resultService.createResult(resultData).subscribe(
        (result) => {
          localStorage.setItem('quizId', this.quiz._id!);
          this.router.navigate(['/result',this.quiz._id])
        }, (error) => {
          console.error("failed to create result")
        }
      );
    } else {
      console.log('Form is invalid.');
      // Handle invalid form submission
    }
  }

  calculateScore(selectedAnswers: number[]) : number {
    let score = 0;
    for(let i=0; i<selectedAnswers.length; i++) {
      if(selectedAnswers[i] === this.quiz.questions[i].correctAnswerIndex){
        score ++ ;
      }
    }
    return score;
  }

  calculateGrade(score:number , totalQuestions: number): string {
    const percentage = (score / totalQuestions) * 100;
    if(percentage >= 85) {
      return 'A';
    } else if (percentage >= 70) {
      return 'B';
    }else if (percentage >= 55){
      return 'C';
    }else if (percentage >= 40) {
      return 'D';
    } else {
      return 'Fail';
    }
  }

}
