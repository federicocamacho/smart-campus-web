import { Injectable } from '@angular/core';
import { CoreModule } from '@angular/flex-layout';
import { Notification } from 'src/app/shared/models/notification';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Util } from 'src/app/shared/utils/util';

@Injectable({
  providedIn: CoreModule
})
export class NotificationService {

  public notifications: Notification[];
  public unreadNotificationsCount: number;

  constructor(private http: HttpClient) { }

  public getUnreadNotificationsCount(userId: number): Observable<number> {
    return this.http.get<number>(`${ environment.adminService }/notifications/user/${ userId }/count`, Util.options());
  }
}
