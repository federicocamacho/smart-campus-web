import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sc-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.css']
})
export class SectionCardComponent {

  /**
   * Receives the card's title.
   *
   */
  @Input() title: string;

  /**
   * Receives the card's description.
   *
   */
  @Input() description: string;

  /**
   * Receives the card image's source.
   *
   */
  @Input() materialIconName: string;

  /**
   * Receives the card's url.
   *
   */
  @Input() url: string;

  /**
   * Receives the progress and icon's color.
   *
   */
  @Input() cardColor: string;

  /**
   * Creates an instance of SectionCardComponent.
   * @param router
   */
  constructor(private router: Router) {}

  /**
   * Redirects to the passed url.
   *
   */
  public redirectToUrl(): void {
    this.router.navigate([this.url]);
  }
}
