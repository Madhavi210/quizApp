import { Component , OnInit} from '@angular/core';
import { ResultService } from 'src/app/shared/services/result.service';
import { IResult } from 'src/app/shared/models/result.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit{
  result: IResult | null = null;

  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService
  ) { }

  ngOnInit():void {
    // const quizId = this.route.snapshot.paramMap.get('_id');
    const quizId=  localStorage.getItem("quizId")
    console.log(quizId);
    
    if (quizId) {
      this.getResultByQuizId(quizId);
      // console.log(quizId);
    }
  }

  getResultByQuizId(quizId: string): void {
    console.log("inside");
    
    this.resultService.getResultByQuizId(quizId).subscribe(
      (result: IResult) => {
        this.result = result;
        console.log(result,"tes");
      },
      (error) => {
        console.error('Error fetching result:', error);
        // Handle error (show message, redirect, etc.)
      }
    );
  }
}
