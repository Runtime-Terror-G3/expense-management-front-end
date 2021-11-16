import { SessionService } from './../services/session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  name="Cristian Rotar";
  isSignedOut = false;
  title = "Expense Management App";

  constructor(private sessionService: SessionService) { }

  signOut() {
    this.sessionService.signOut();
  }
}
