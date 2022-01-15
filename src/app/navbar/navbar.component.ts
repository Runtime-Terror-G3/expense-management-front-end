import { SessionService } from '../services/session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  name="";
  isSignedOut = false;
  title = "ExPlus";

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.name = this.sessionService.getLoggedUserName()!;
  }

  signOut() {
    this.sessionService.signOut();
  }
}
