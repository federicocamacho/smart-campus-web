import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { map, takeUntil } from 'rxjs/operators';

import { Cleanable } from '../../core/utils/cleanable';

@Component({
  selector: 'sc-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent extends Cleanable implements OnInit {

  /**
   * Indicates if the device has a mobile view width.
   *
   * @memberof WizardComponent
   */
  public isMobile: boolean;

  /**
   * Stores the selected step (index) to keep the state when chaning between
   * vertical and horizontal stepper (due responsive).
   *
   * @memberof WizardComponent
   */
  public selectedIndex: number;

  /**
   * Creates an instance of WizardComponent.
   * @date 2019-01-25
   * @param bpObserver Breakpoint Observer to monitor the device's width.
   * @memberof WizardComponent
   */
  constructor(private bpObserver: BreakpointObserver) {
    super();
    this.selectedIndex = 0;
  }

  /**
   * Component's lifecycle onInit method, used to observe the device's width.
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
  }

  /**
   * Triggered when the current section is saved.
   *
   * @date 2019-01-25
   * @param stepIndex index of the section that was saved.
   * @memberof WizardComponent
   */
  public onSectionSaved(stepIndex: number): void {
    // TODO Implement this
  }

  /**
   * Triggered
   *
   * @date 2019-01-25
   * @param event
   * @memberof WizardComponent
   */
  public onSelectionChanged(event: StepperSelectionEvent): void {
    this.selectedIndex = event.selectedIndex;
  }

}
