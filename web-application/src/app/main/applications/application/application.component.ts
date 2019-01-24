import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cleanable, Application, ApiError, ApiException, Utils } from '../../../core';
import { takeUntil, take } from 'rxjs/operators';
import { ApplicationService } from 'src/app/core/api';
import { HttpResponse } from '@angular/common/http';
import { AppService } from 'src/app/app.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'sc-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent extends Cleanable implements OnInit {
  
  /**
   * Stores the opened Application.
   *
   * @memberof ApplicationComponent
   */
  public application: Application;

  constructor(
    private appService: AppService,
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router,
    private toasty: ToastyService) {
    super();
    this.appService.isBusyGlobally = true;
  }
  
  ngOnInit(): void {
    const param = this.route.paramMap
      .pipe(
        takeUntil(this.destroyed)
      )
    .subscribe(paramMap => {
      const id = paramMap.get('id');
      if (id) {
        this.applicationService.getApplicationById(Number(id))
          .pipe(
            take(1),
            takeUntil(this.destroyed))
          .subscribe(
            (res: HttpResponse<Application>) => {
              this.application = { ...res.body };
              this.appService.isBusyGlobally = false;
            },
            (err: ApiError) => {
              this.toasty.error(Utils.buildToastyConfig('ERROR OBTENIENDO APLICACIÓN', err.message));
              this.appService.isBusyGlobally = false;
            }
          );
      } else {
        this.application = new Application();
      }
    });
  }
    
  public onCreate(): void {
    this.router.navigate(['/applications', 0]);
  }
}
