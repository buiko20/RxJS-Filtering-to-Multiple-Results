// sample<T>(
//      notifier: Observable<any>
// ): MonoTypeOperatorFunction<T>

import { interval } from 'rxjs';
import { sample, take } from 'rxjs/operators';
import { run } from './../03-utils/run';

export function sampleDemo() {
  const period = 100;
  const source$ = interval(period);

  const notifyPeriod = 500;
  const notifier$ = interval(notifyPeriod);

  const stream$ = source$.pipe(
    sample(notifier$),
    take(5)
  );

  // run(stream$);
}


