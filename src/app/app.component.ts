import { Component, AfterViewInit, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public loginform: FormGroup;
  title = 'Demo-Angular-App';
  userName: string;
  public showLoginPage: boolean = true;
  constructor(private router: Router, private formBuilder: FormBuilder) {
  }
  redirectToHomePage() {
    this.showLoginPage = false;
    this.router.navigateByUrl('/home-page');
  }

  public ngOnInit() {
    // prepare the form controls
    this.buildForm();
  }

  private buildForm(): void {

    this.loginform = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required
      ])],
      password: ['', Validators.compose([Validators.required
      ])]
    });

  }

  public onSubmit(loginObj): void {
    this.userName = loginObj.email.split('@')[0];
    this.redirectToHomePage();
  }
}
