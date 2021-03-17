// sampleTime<T>(
//        period: number, 
//        scheduler: SchedulerLike = async
// ): MonoTypeOperatorFunction<T>

import { interval } from 'rxjs';
import { sampleTime, take } from 'rxjs/operators';
import { run } from './../03-utils/run';

export function sampleTimeDemo() {
  const source$ = interval(100);
  const period = 500;

  const stream$ = source$.pipe(
    sampleTime(period),
    take(5)
  );
  // run(stream$);
}
