// skipUntil<T>(
//      notifier: Observable<any>
// ): MonoTypeOperatorFunction<T>

import { interval, timer } from 'rxjs';
import { skipUntil } from 'rxjs/operators';
import { run } from './../03-utils/run';

export function skipUntilDemo() {
  const period = 1000;
  const dueTime = 5000;
  
  const source$ = interval(period);
  const startSignal$ = timer(dueTime);

  // ignore emitted values from source until provided observable emits
  const stream$ = source$.pipe(skipUntil(startSignal$));
  // run(stream$);
}
