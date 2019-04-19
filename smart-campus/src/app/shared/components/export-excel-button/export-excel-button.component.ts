import { Component, OnInit, Input } from '@angular/core';
import { Util } from '../../utils/util';

@Component({
  selector: 'sc-export-excel-button',
  templateUrl: './export-excel-button.component.html',
  styleUrls: ['./export-excel-button.component.css']
})
export class ExportExcelButtonComponent {

  @Input() json: any;

  @Input() filename: string;

  constructor() { }

  /**
   * Exports the table to an excel file.
   *
   */
  public saveExcel() {
    Util.exportAsExcelFile(this.json, this.filename);
  }

}
