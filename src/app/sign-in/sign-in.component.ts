import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment'
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  signInForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.httpClient.post(
      this.baseUrl + '/session',
      this.signInForm.getRawValue(),
      {
        withCredentials: true
      }
    ).subscribe(() => this.router.navigate([this.baseUrl]));
    this.signInForm.reset();
  }
}
