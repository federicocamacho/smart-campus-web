import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatStepperModule,
  MatTooltipModule } from '@angular/material';
import { PlatformModule } from '@angular/cdk/platform';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    InfiniteScrollModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    MatTooltipModule,
    PlatformModule,
    ScrollingModule,
    ToastyModule.forRoot()
  ],
  declarations: [],
  exports: [
    InfiniteScrollModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    MatTooltipModule,
    PlatformModule,
    ScrollingModule,
    ToastyModule
  ]
})
export class LibrariesModule { }
