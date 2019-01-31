import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
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
   * Component's lifecycle onInit method, used to observe the device's width
   * and parameters to execute all REST services required for the section.
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
          // The opened application changed.
          this.wizard.id = newId;
          this.clearOnChange();
          if (this.wizard.id !== 0) {
            this.getApplicationById(newId);
          }
        }
        const newIndex = MenuType.getIndexFromPath(paramMap.get('section'));
        if (this.wizard.selectedIndex !== newIndex) {
          // The section changed.
          this.wizard.selectedIndex = newIndex;
          this.clearOnChange();
        }
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
    this.wizard.id = null;
    this.wizard.selectedIndex = null;
  }

  /**
   * Triggered when the current section is saved.
   *
   * @date 2019-01-25
   * @memberof WizardComponent
   */
  public onSectionSaved(): void {
    this.appService.isBusyGlobally = true;
    const application = this.wizard.application;
    switch (this.wizard.selectedIndex) {
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
   * Triggered when pressing the 'Previous' button.
   *
   * @date 2019-01-27
   * @memberof WizardComponent
   */
  public onPrev(): void {
    this.appService.isBusyGlobally = true;
    this.wizard.navigate((this.wizard.selectedIndex - 1) % 4);
  }

  /**
   * Triggered when pressing the 'Next' button.
   *
   * @date 2019-01-27
   * @memberof WizardComponent
   */
  public onNext(): void {
    this.appService.isBusyGlobally = true;
    this.wizard.navigate((this.wizard.selectedIndex + 1) % 4);
  }

  /**
   * Event handler used when changing the section opened.
   *
   * @date 2019-01-27
   * @param event navigation event.
   * @memberof WizardComponent
   */
  public onSelectionChanged(event: StepperSelectionEvent): void {
    this.wizard.navigate(event.selectedIndex);
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
          this.applicationService.applications.push(applicationCreated);
          const newItem = this.appService.menu.mapApplicationsToMenuItems([ applicationCreated ]);
          this.appService.menu.insertForType(MenuType.APPLICATIONS, newItem);
          this.appService.isBusyGlobally = false;
        },
        (err: ApiError) => {
          this.toasty.error(Utils.buildToastyConfig('APPLICACIÓN',
            `Ocurrió un error creando la aplicación ${ application.name }: ${ err.message }`));
          this.appService.isBusyGlobally = false;
        }
      );
  }

    /**
   * Retrieves the application for the given id. Required when initializing the application section.
   *
   * @date 2019-01-30
   * @param id of the application to be retrieved.
   * @memberof WizardService
   */
  public getApplicationById(id: number): void {
    this.applicationService.getApplicationById(id)
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe(
        (res: HttpResponse<Application>) => {
          this.wizard.application = res.body;
          this.appService.isBusyGlobally = false;
        },
        (err: ApiError) => {
          this.toasty.error(Utils.buildToastyConfig('Aplicación', 
            `La aplicación no pudo ser obtenida: ${ err.message }`));
          this.appService.isBusyGlobally = false;
        }
      );
  }
  
}
