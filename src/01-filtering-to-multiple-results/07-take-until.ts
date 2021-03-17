// takeUntil<T>(
//      notifier: Observable<any>
// ): MonoTypeOperatorFunction<T>

import { timer, interval } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { run } from './../03-utils/run';

export function takeUntilDemo() {
  const period = 100;
  const dueTime = 500;
  
  const source$ = interval(period);
  const stopSignal$ = timer(dueTime).pipe(take(1));

  // Emit values until provided observable emits.
  const stream$ = source$.pipe(takeUntil(stopSignal$));
  // run(stream$);
}
