import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { userNameValidator } from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(private fb:FormBuilder, private loginService:LoginService, private router:Router){
    this.loginForm = this.fb.group({
      userNameOrEmail : ["",[Validators.required]],
      password:['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(){}

  onLogin(){
    console.log("clicked login");
    console.log(this.loginForm.value);
    
    if(this.loginForm.valid){
      const formData = this.loginForm.value;
      this.loginService.login(formData).subscribe(
        response => {
          console.log("user logged in successfully", response);
         this.router.navigate(['/profile']) 
        },
        error => {
          console.error("login failed", error)
        }
      )
    }
  }


}
