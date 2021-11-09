import {Component, OnInit} from '@angular/core';
import {SessionService} from "../services/session.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
/**
 * Component that handles the signing in process
 */
export class SignInComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (this.sessionService.activeSession())
      this.toHome();
  }

  /**
   * Submits the sign in form data to the service and starts a new session
   */
  submit(): void {
    const {email, password} = this.form.getRawValue();
    this.sessionService.signIn(email, password).subscribe(
      response => {
        this.sessionService.saveToken(response.accessToken);
        this.toHome();
      });
  }

  /**
   * Redirects to the home page
   */
  toHome(): void {
    this.router.navigate(['']).then(() => this.form.reset());
  }
}
