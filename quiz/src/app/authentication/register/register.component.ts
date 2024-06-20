import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userNameValidator, passwordValidator, emailDomainValidator, confirmPasswordValidator } from 'src/app/shared/validators/validators';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registrationForm: FormGroup;
  isEditMode: boolean = false;
  userId: string | null = null;


  constructor(
    private fb: FormBuilder, 
    private router:Router , 
    private route: ActivatedRoute,
    private userService:UserService
  ) {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]], // Minimum length of 3 characters
      email: ['', [Validators.required, Validators.email, ]], // Valid email and from allowed domains
      password: ['', [Validators.required, Validators.minLength(3), ]], // Minimum length of 6, complex password
      role: ['user'],
      profilePic: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      console.log("edit id", id);
      
      if(id){
        this.isEditMode = true;
        this.userId = id;
        console.log(this.userId);
        console.log(this.isEditMode);
        
        this.userService.getUserById(id).subscribe(user => {
          console.log(user);
          this.registrationForm.patchValue({
            userName : user.userName,
            email: user.email,
            password: user.password,
            role: user.role,
            profilepic: user.profilePic
          })
        }, error => {
          console.error(`error fetching user: ${error}`)
        })
      } else{
        this.isEditMode = false;
        this.userId = null;
      }
    })
  }

  onSubmit() : void {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      console.log(this.isEditMode, "edit mode");
      
      if(this.isEditMode && this.userId){
        console.log(this.userId);
        
        // console.log("form submitted");
        // const formData = this.registrationForm.value;
        this.userService.updateUser(this.userId, formData).subscribe(
          response => {
            console.log("update successful",response);
            this.router.navigate(['/login'])
          },error => {
            console.error(error)
          }
        );
      } else{
        this.userService.createUser(formData).subscribe(
          response => {
            console.log("registration is successful");
            this.router.navigate(['/profile'])
          }, error => {
            console.error("error in creating user", error)
          }
        );
      }
    }else{
      console.error("error in submiting");
    }
  }

}





