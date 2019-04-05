import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Page to manage all the user's applications.
 *
 * @date 2019-04-03
 * @export
 */
@Component({
  selector: 'sc-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent {

  /**
   * Creates an instance of ApplicationsComponent.
   * @date 2019-04-03
   * @param activatedRoute - current Route.
   * @param router - Angular router.
   */
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  /**
   * Trigerred when pressing "Create app" button.
   *
   * @date 2019-04-03
   */
  public createApplication(): void {
    this.router.navigate([ '0' ], { relativeTo: this.activatedRoute });
  }

}
