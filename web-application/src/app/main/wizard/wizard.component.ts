import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MatStepper } from '@angular/material';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { map, takeUntil, take } from 'rxjs/operators';

import { ToastyService } from 'ng2-toasty';

import { ApiError } from '../../core/models/api-error';
import { Application } from '../../core/models/application';
import { ApplicationService } from '../../core/api/application.service';
import { AppService } from '../../app.service';
import { Cleanable } from '../../core/utils/cleanable';
import { MenuType } from '../../core/utils/menu-type';
import { Utils } from '../../core/utils/utils';
import { WizardService } from '../../core/services/wizard.service';

@Component({
  selector: 'sc-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent extends Cleanable implements OnInit, OnDestroy {

  /**
   * Indicates if the device has a mobile view width.
   *
   * @memberof WizardComponent
   */
  public isMobile: boolean;

  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;

  @ViewChild('verticalStepper') verticalStepper: MatStepper;

  /**
   * Creates an instance of WizardComponent.
   * @date 2019-01-25
   * @param appService Application's main service.
   * @param applicationService Applications (entity) service.
   * @param bpObserver Breakpoint Observer to monitor the device's width.
   * @param route Angular Activated Route.
   * @param wizard {@link WizardService}.
   * @memberof WizardComponent
   */
  constructor(
    private appService: AppService,
    private applicationService: ApplicationService,
    private bpObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private toasty: ToastyService,
    public wizard: WizardService) {
    super(); 
  }

  /**
   * Component's lifecycle onInit method, used to observe the device's width.
   * And retrieve from cache/api the required object.
   *
   * @date 2019-01-25
   * @memberof WizardComponent
   */
  ngOnInit() {
    this.bpObserver
      .observe([ Breakpoints.XSmall ])
      .pipe(
        map(value => value.matches),
        takeUntil(this.destroyed))
      .subscribe(isMobile => this.isMobile = isMobile);

      this.route.paramMap
        .pipe(
          takeUntil(this.destroyed))
        .subscribe(paramMap => {
          const newId = Number(paramMap.get('id'));
          if (this.wizard.id !== newId || this.wizard.id === 0) {
            // The opened application changed or is 'create' mode.
            this.wizard.id = newId;
            this.wizard.clearCache(newId);
          }
          this.clearOnChange();
          this.getApplication(newId);

        });
  }

  /**
   * Clears all wizard related information in global service.
   *
   * @date 2019-01-27
   * @memberof WizardComponent
   */
  ngOnDestroy() {
    super.ngOnDestroy();
    this.clearOnChange();
    // this.wizard.clearCache();
    this.wizard.id = null;
  }

  /**
   * Triggered when the current section is saved.
   *
   * @date 2019-01-25
   * @memberof WizardComponent
   */
  public onSectionSaved(index: number): void {
    this.appService.isBusyGlobally = true;
    const application = this.wizard.application;
    switch (index) {
      case 0:
        if (!application || Utils.anyIsEmptyString(application.name, application.description)) {
          return;
        }
        application.idUser = this.appService.user.id;
        if (this.wizard.id === 0) {
          // Create the application
          application.idApplication = null;
          this.createApplication(application);
        } else {
          // TODO: Update the application.
        }
        break;
      default:
        // TODO: Implement all other cases.
        break;
    }
  }

  /**
   * Clears all the section related information when changing steps in the wizard.
   *
   * @date 2019-01-26
   * @memberof WizardComponent
   */
  public clearOnChange(): void {
    this.wizard.application = new Application();
  }

  /**
   * Event handler used when changing the section opened.
   *
   * @date 2019-01-27
   * @param event navigation event.
   * @memberof WizardComponent
   */
  public onSelectionChanged(event: StepperSelectionEvent): void {
    console.log('selection changed', event.previouslySelectedIndex, event.selectedIndex);
    switch (event.selectedIndex) {
      case 0:
        this.getApplication(this.wizard.id);
        break;
      default:
        // TODO: Implement other steps.
        this.wizard.isPrevEnabled = true;
        this.wizard.isNextEnabled = false;
        break;
    }
  }

  private getApplication(id: number): void {
    const application = this.wizard.get('APPLICATION');
    if (application) {
      this.wizard.isNextEnabled = true;
    } else if (this.wizard.id !== 0) {
      this.getApplicationById(id);
    } else {
      this.wizard.isNextEnabled = false;
    }
  }

  private getApplicationById(id: number): void {
    this.applicationService.getApplicationById(id)
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe(
        (res: HttpResponse<Application>) => {
          this.wizard.cache('APPLICATION', res.body);
          this.appService.isBusyGlobally = false;
          this.wizard.isNextEnabled = true;
        },
        (err: ApiError) => {
          this.toasty.error(Utils.buildToastyConfig('Aplicación', 
            `La aplicación no pudo ser obtenida: ${ err.message }`));
          this.appService.isBusyGlobally = false;
          this.wizard.isNextEnabled = false;
        }
      );
  }

  /**
   * Creates an application in the wizard section.
   *
   * @date 2019-01-30
   * @param application to be created.
   * @memberof WizardComponent
   */
  public createApplication(application: Application): void {
    this.applicationService.createApplication(application)
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe(
        (res: HttpResponse<Application>) => {
          this.toasty.success(Utils.buildToastyConfig('APLICACIÓN',
            `Aplicación ${ application.name } creada satisfactoriamente`));
          const applicationCreated = res.body;
          this.appService.applications.push(applicationCreated);
          const newItem = this.appService.menu.mapApplicationsToMenuItems([ applicationCreated ]);
          this.appService.menu.insertForType(MenuType.APPLICATIONS, newItem);
          this.wizard.isNextEnabled = true;
          this.appService.isBusyGlobally = false;
        },
        (err: ApiError) => {
          this.toasty.error(Utils.buildToastyConfig('APPLICACIÓN',
            `Ocurrió un error creando la aplicación ${ application.name }: ${ err.message }`));
          this.wizard.isNextEnabled = false;
          this.appService.isBusyGlobally = false;
        }
      );
  }

  public updateApplication(application: Application): void {
    this.applicationService.updateApplication(application.idApplication, application)
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe(
        (res: HttpResponse<Application>) => {
          this.toasty.success(Utils.buildToastyConfig('APLICACIÓN',
            `Aplicación ${ application.name } actualizada satisfactoriamente`));
        },
        (err: ApiError) => {
          // TODO: Implement this.
        }
      );
  }

  private getActivatedStepper(): MatStepper {
    if (this.horizontalStepper) {
      return this.horizontalStepper;
    }
    if (this.verticalStepper) {
      return this.verticalStepper;
    }
    
    return null;
  }

  public onPrevious(): void {
    this.getActivatedStepper().previous();
  }

  public onNext(): void {
    this.getActivatedStepper().next();
  }

  public toStep(step: number): void {
    this.getActivatedStepper().selectedIndex = step;
  }

}
