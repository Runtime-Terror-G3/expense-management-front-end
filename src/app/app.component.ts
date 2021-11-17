import { NavigationEnd, Router, Event as RouterEvent } from '@angular/router';
import { Component } from '@angular/core';
import { EventEmitterService } from './services/event-emitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ExpenseManagement';

  constructor(private router: Router, private eventEmitterService: EventEmitterService){
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        eventEmitterService.getEmitter('onRouteChanged')?.emit(event.url);
      }
    })
  }
}
