import { SessionService } from './../services/session.service';
import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../services/event-emitter.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isSidebarToggled = false;
  isSidebarActive = false;
  isLoggedIn = false;

  constructor(private sessionService: SessionService, private eventEmitterService: EventEmitterService) { }

  ngOnInit() {
    this.eventEmitterService.getEmitter('onRouteChanged')?.subscribe(route => {
      let activateAccountRouteRegex = /^\/activate-account\/.*$/; 
      if (route == '/sign-in' || route == '/create-account' || route == '/' || activateAccountRouteRegex.test(route)){
        this.isLoggedIn = false;
      }
      else {
        this.isLoggedIn = true;
      }
    })
  }
}
