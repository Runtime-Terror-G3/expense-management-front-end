import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  ]);
  password: FormControl = new FormControl('', [Validators.required]);
  confirmPassword: FormControl = new FormControl('', [Validators.required]);
  firstName: FormControl = new FormControl('', [Validators.required]);
  lastName: FormControl = new FormControl('', [Validators.required]);
  dateOfBirth: FormControl = new FormControl('', [Validators.required, this.dateValidation]);
  createAccountForm: FormGroup = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    dateOfBirth: this.dateOfBirth,
    password: this.password,
    confirmPassword: this.confirmPassword
  });

  constructor(
    private userService: UserServiceService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  createAccount(): void {
    if (this.createAccountForm.valid) {
      this.userService.createAccount(this.firstName.value, this.lastName.value, this.dateOfBirth.value, this.email.value, this.password.value).subscribe(
        response => {
          this.createAccountForm.reset();
          alert("Account was created successfully! Please check your email and click the activation link in order to activate it!");
        },
        error => {
          alert(error.message);
        }
      );
    } else {
      alert("Fields are invalid!")
    }
  }

  dateValidation(datepicker: FormControl) {
    let pickedDate = datepicker.value;
    let today = new Date();
    pickedDate = new Date(pickedDate);
    if (pickedDate >= today) {
      return { dateError: { parsed: pickedDate } }
    }
    return null;
  }

}
