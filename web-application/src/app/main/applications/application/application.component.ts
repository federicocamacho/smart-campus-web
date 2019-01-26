import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, take } from 'rxjs/operators';

import { ToastyService } from 'ng2-toasty';

import { ApiError } from 'src/app/core/models/api-error';
import { Application } from 'src/app/core/models/application';
import { ApplicationService } from '../../../core/api/application.service';
import { Cleanable } from 'src/app/core/utils/cleanable';
import { Utils } from '../../../core/utils/utils';

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
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router,
    private toasty: ToastyService) {
    super();
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
            },
            (err: ApiError) => {
              this.toasty.error(Utils.buildToastyConfig('ERROR OBTENIENDO APLICACIÓN', err.message));
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
