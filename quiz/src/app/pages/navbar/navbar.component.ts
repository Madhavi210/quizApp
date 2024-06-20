import { Component , OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  ngOnInit(){} 
  constructor(private router: Router ) {}

  showLoginAlert() {    
    Swal.fire({
      title: 'Hello Users!',
      html: `
      <div style="text-align: center;">
        <button  id="login-button" routerLink="/login" class="swal2-confirm swal2-styled btn" style="background-color: #000; color: #fff; border-radius: 5px;">Login</button>
        <button  id="register-button" routerLink="/register" class="swal2-confirm swal2-styled btn" style="background-color: #000; color: #fff; border-radius: 5px;">Register</button>
        <button  id="logout-button" routerLink="/logout" class="swal2-confirm swal2-styled btn" style="background-color: #000; color: #fff; border-radius: 5px;">Logout</button>
      </div>
    `,
    showConfirmButton: false,
    showCloseButton: true,
    didOpen: () => {
      const loginButton = document.getElementById("login-button");
      const registerButton = document.getElementById("register-button");
      const logoutButton = document.getElementById('logout-button');
      if (registerButton) {
        registerButton.addEventListener('click', (event) => {
          this.router.navigate(['register']);
          Swal.close();
          console.log('register button is clicked');
        });
      }
      if (loginButton) {
        loginButton.addEventListener('click', (event) => {
          this.router.navigate(['login']);
          Swal.close();
          console.log('login button is clicked');
        });
      }
      if(logoutButton){
        logoutButton.addEventListener("click", (event) => {
          // this.loginService.logout();
          this.router.navigate(['login'])
          Swal.close();
          console.log("logout button clicked");
        })
      }
    },
    customClass: {
      popup: 'animate__animated '
    }
    });
  }


}
