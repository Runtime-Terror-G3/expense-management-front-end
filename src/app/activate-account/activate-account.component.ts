import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  activationToken: string = "";
  statusMessage: string = "Activating your account. Please wait!"

  constructor(
    private userService: UserServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.activationToken = this.activatedRoute.snapshot.paramMap.get('token') ?? "";
    this.activateAccount();
  }

  activateAccount(): void {
    this.userService.activateAccount(this.activationToken).subscribe(
      () => {
        this.toSignIn();
      },
      error => {
        console.log(error);
        this.statusMessage = "En error occured while activating your account. Try again!";
      }
    );
  }

  private toSignIn() {
    this.router.navigate(["/sign-in"])
  }
}
