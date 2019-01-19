import { Injectable } from '@angular/core';

import { CoreModule } from '../core.module';

/**
 * Consumes Application related REST Services.
 *
 * @date 2019-01-17
 * @export
 * @class ApplicationService
 */
@Injectable({
  providedIn: CoreModule
})
export class ApplicationService {

  constructor() { }
}
