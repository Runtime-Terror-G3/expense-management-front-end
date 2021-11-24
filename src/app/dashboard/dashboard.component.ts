import { Component, OnInit } from '@angular/core';
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.sessionService.signOut();
    if (!this.sessionService.activeSession())
      this.toSignIn();
  }

  toSignIn() {
    this.router.navigate(["sign-in"]).then(() => {})
  }
}
