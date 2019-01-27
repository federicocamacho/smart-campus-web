import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { map, takeUntil } from 'rxjs/operators';

import { Cleanable } from '../../core/utils/cleanable';
import { MenuType } from '../../core/utils/menu-type';
import { WizardService } from '../../core/services/wizard.service';
import { Application } from 'src/app/core/models/application';

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
   * @param bpObserver Breakpoint Observer to monitor the device's width.
   * @param route Angular Activated Route.
   * @param wizard {@link WizardService}.
   * @memberof WizardComponent
   */
  constructor(
    private bpObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private wizard: WizardService) {
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
        if (this.wizard.id !== newId) {
          // The opened application changed.
          this.wizard.id = newId;
          this.clearOnChange();
        }
        const newIndex = MenuType.getIndexFromPath(paramMap.get('section'));
        console.log(this.wizard.selectedIndex, newIndex);
        if (this.wizard.selectedIndex !== newIndex) {
          // The section changed.
          console.log('section change');
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
   * @param stepIndex index of the section that was saved.
   * @memberof WizardComponent
   */
  public onSectionSaved(stepIndex: number): void {
    // TODO: Implement this
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
    this.wizard.navigate((this.wizard.selectedIndex - 1) % 4);
  }

  /**
   * Triggered when pressing the 'Next' button.
   *
   * @date 2019-01-27
   * @memberof WizardComponent
   */
  public onNext(): void {
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
  
}
