import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ErrorInterceptor } from './shared/error.interceptor';
import {  HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserService } from './shared/services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './pages/profile/profile.component';
import { AgGridModule } from 'ag-grid-angular';
import { ActionRendererComponent } from './pages/action-renderer/action-renderer.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { LoginService } from './shared/services/login.service';
import { QuizService } from './shared/services/quiz.service';
import { QuizExamComponent } from './pages/quiz-exam/quiz-exam.component';
import { QuizResultComponent } from './pages/quiz-result/quiz-result.component';
import { QuizListComponent } from './pages/quiz-list/quiz-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    ProfileComponent,
    ActionRendererComponent,
    QuizComponent,
    QuizExamComponent,
    QuizResultComponent,
    QuizListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // AgGridModule.withComponents([]) ,
    AgGridModule
  ],
  providers: [
  UserService, LoginService, QuizService, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
