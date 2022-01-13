import { MatSnackBar } from '@angular/material/snack-bar';
import {Component, OnInit} from '@angular/core';
import {SessionService} from "../services/session.service";
import {FormBuilder} from "@angular/forms";
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
  form = this.formBuilder.group({
    email: '',
    password: '',
  });

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    if (this.sessionService.activeSession())
      this.toHome();
  }

  /**
   * Submits the sign-in form data to the service and starts a new session
   */
  submit(): void {
    this.sessionService.signIn(this.form.value.email, this.form.value.password).subscribe(
      response => {
        this.sessionService.saveToken(response.token);
        this.toHome();
      },
      error => {
        this.snackBar!.open('Invalid email or password!', '', {
          duration: 3000,
          panelClass: ['snackbar']
        });
        this.form.reset();
      });
  }

  /**
   * Redirects to the home page
   */
  toHome(): void {
    this.router.navigate(['/home']).then(() => {
      this.form.reset();
    });
  }
}
