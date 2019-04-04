import { Component, OnInit, Input } from '@angular/core';

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
  @Input() imgSrc: string;

  /**
   * Receives the card's url.
   *
   */
  @Input() url: string;
}
