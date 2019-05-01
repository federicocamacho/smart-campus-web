import { AppService } from './app.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscribable } from './shared/utils/subscribable';
import { RxStompService } from '@stomp/ng2-stompjs';
import { take, takeUntil } from 'rxjs/operators';

/**
 * Main component used to bootstrap the application.
 *
 * @date 2019-04-09
 * @export
 */
@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends Subscribable implements OnInit, OnDestroy {

  public title: string;

  constructor(public appService: AppService, private rxStompService: RxStompService) {
    super();
    this.title = 'Smart Campus';
  }

  ngOnInit() {
    this.rxStompService.webSocketErrors$
      .pipe(take(1), takeUntil(this.destroyed)).subscribe(
        (event: Event) => {
          if (event.type === 'error') {
            console.error('An error occurred with the broker. Stopping subscription.');
            this.rxStompService.deactivate();
          }
        }
      );
  }
}
