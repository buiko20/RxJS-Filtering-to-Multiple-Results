// audit<T>(
//      durationSelector: (value: T) => SubscribableOrPromise<any>
// ): MonoTypeOperatorFunction<T>

import { timer, interval } from 'rxjs';
import { audit, take, tap } from 'rxjs/operators';
import { addItem } from '../03-utils';
import { run } from './../03-utils/run';

export function auditDemo() {
  const dueTime = 0;
  const period = 100;
  const source$ = timer(dueTime, period);

  const stream$ = source$.pipe(
    audit(valueFromSource => {
      addItem(`audit: value from source: ${valueFromSource}, delay ${valueFromSource * 100}`);
      return interval(valueFromSource * 100); // ignore time = silencing duration
    }),
    take(5)
  );
  // run(stream$);
}
