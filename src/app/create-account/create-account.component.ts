import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../models/user';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private userService:UserServiceService ) {
      
   }

  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  ]);
  password: FormControl = new FormControl('', [Validators.required]);
  firstName: FormControl = new FormControl('', [Validators.required]);
  lastName: FormControl = new FormControl('', [Validators.required]);
  dateOfBirth: FormControl = new FormControl('', [Validators.required]);

  createAccountForm: FormGroup = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    dateOfBirth: this.dateOfBirth,
    password: this.password
  });


  createAccount(): void {
    let currentUser={firstName:this.firstName.value,
      lastName:this.lastName.value,
      dateOfBirth:this.dateOfBirth.value,
      passwordHash:this.password.value,
      email:this.email.value,
    }as IUser
      if(this.createAccountForm.valid){
        this.userService.createAccount(currentUser)
        console.log("Testing if this is successful")
      }
  }
  


  ngOnInit(): void {
  }

}
