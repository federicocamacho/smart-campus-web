export class Section {
  public title: string;
  public description: string;
  public url: string;
  public materialIconName: string;
  public cardColor: string;

  /**
   * Creates an instance of Section.
   *
   * @param {string} [title] of the section.
   * @param {string} [description] of the section.
   * @param {string} [url] of the section.
   * @param {string} [materialIconName] of the section's card.
   * @param {string} [cardColor] of the section's card.
   * @memberof Section
   */
  constructor(title?: string, description?: string, url?: string, materialIconName?: string, cardColor?: string) {
    this.title = title;
    this.description = description;
    this.url = url;
    this.materialIconName = materialIconName;
    this.cardColor = cardColor;
  }
}
