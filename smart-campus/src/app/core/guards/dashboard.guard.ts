import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class DashboardGuard implements CanActivate {

  constructor(private appService: AppService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.appService.user) {
        return true;
      }

      this.router.navigate(['/login']);
      return false;
  }

}
