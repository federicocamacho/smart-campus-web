import { Subscription } from 'rxjs';

export class RxJsUtil {
  public static unsubscribe(...subscription: Subscription[]): void {
    if (!subscription) { return; }

    subscription.forEach(sub => sub && !sub.closed && sub.unsubscribe());
  }
}
