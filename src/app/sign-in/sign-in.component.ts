import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment'
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {SessionService} from "../services/session.service";

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
    private service: SessionService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  submit(): void {
    const val = this.signInForm.value;
    if (val.email && val.password) {
      this.service.signIn(val.email, val.password)
        .subscribe(() => this.router.navigateByUrl(this.baseUrl));
    }
    this.signInForm.reset();
  }
}
