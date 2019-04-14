import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse } from 'src/app/shared/models/api-response';
import { CoreModule } from 'src/app/core/core.module';
import { environment } from 'src/environments/environment';
import { Notification } from 'src/app/shared/models/notification';
import { Util } from 'src/app/shared/utils/util';

@Injectable({
  providedIn: CoreModule
})
export class NotificationService {

  public notifications: Notification[];
  public unreadNotificationsCount: number;

  constructor(private http: HttpClient) { }

  public getNotificationsByUser(userId: number, page: number = null, count: number = null): Observable<Notification[]> {
    let endpoint = `${ environment.adminService }/notifications/user/${ userId }`;
    if (page || count) {
      endpoint += `?page=${ page }&count=${ count }`;
    }
    return this.http.get<Notification[]>(endpoint, Util.options());
  }

  public getUnreadNotificationsCount(userId: number): Observable<number> {
    return this.http.get<number>(`${ environment.adminService }/notifications/user/${ userId }/count`, Util.options());
  }

  public deleteNotification(notificationId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${ environment.adminService }/notifications/notification/${ notificationId }`, Util.options())
  }

}
