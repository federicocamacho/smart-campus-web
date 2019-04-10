import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Gateway } from 'src/app/shared/models/gateway';

@Component({
  selector: 'sc-gateway-selection-dialog',
  templateUrl: './gateway-selection-dialog.component.html',
  styleUrls: ['./gateway-selection-dialog.component.css']
})
export class GatewaySelectionDialogComponent implements OnInit {

  public selectedGateway: Gateway;
  public gateways: Gateway[];

  constructor(
    public dialogRef: MatDialogRef<GatewaySelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Gateway[]) { }

  ngOnInit() {
    this.gateways = this.data;
  }

}
