import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { take, takeUntil } from 'rxjs/operators';

import { AppService } from 'src/app/app.service';
import { DataTable } from 'src/app/shared/utils/data-table';
import { Process } from 'src/app/shared/models/process';
import { ProcessesFilter } from 'src/app/shared/models/types';
import { ProcessService } from 'src/app/core/services/process.service';
import { Util } from 'src/app/shared/utils/util';

@Component({
  selector: 'sc-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.css']
})
export class ProcessesComponent extends DataTable<Process, ProcessesFilter> implements OnInit {

  constructor(
    private appService: AppService,
    private processService: ProcessService,
    protected route: ActivatedRoute,
    protected router: Router) {
    super(route, router);
  }

  ngOnInit() {
    this.initDataTable();
    this.getProcesses();
  }

  private getProcesses(): void {
    this.processService.getProcessesByUserId(this.appService.user.id)
    .pipe(take(1), takeUntil(this.destroyed))
    .subscribe(
      (processes: Process[]) => {
        this.processService.processes = processes;
        this.dataSource.data = processes;
        this.buildGatewaysSelect();
      },
      (err: HttpErrorResponse) => this.appService.handleGenericError(err));
  }

  private buildGatewaysSelect(): void {

  }

  protected filterPredicate: (data: Process, filter: string) => boolean = (data: Process, filter: string) => {
    switch (this.filterType) {
      case 'NAME': return Util.stringContains(data.name, filter);
      case 'DESCRIPTION': return Util.stringContains(data.description, filter);
      case 'IS_ALIVE': return data.alive === (filter === 'true');
      case 'GATEWAY': return data.gatewayId === Number(filter);
      case 'NONE': return true;
    }
  }

}
