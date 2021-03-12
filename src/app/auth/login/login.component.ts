import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  fieldTextType: boolean = false;

  constructor(
    private title: Title,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService
  ) { 
    this.title.setTitle('Sniffer | Login');
  }

  loginForm = this.formBuilder.group({
    email: new FormControl('',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(this.commonService.emailPattern)
      ]
    ),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.commonService.isUserLoggedIn();
  }

  onLogin(){
    this.submitted = true;
    if(this.loginForm.valid){
      this.authService.postRequest('user/login', this.loginForm.value).then(res => {
        if(res['status']){
          localStorage.setItem('token', res['token']);
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/']);
        }
        if(!res['status']){
          this.commonService.showErrorMessage(res['message'])
        }
      });
    }
  }

  onPassword() {
    this.fieldTextType = !this.fieldTextType;
  }
}
