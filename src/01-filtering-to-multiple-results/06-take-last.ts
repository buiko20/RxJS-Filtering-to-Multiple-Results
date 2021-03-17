// takeLast<T>(
//      count: number
// ): MonoTypeOperatorFunction<T>

import { range, of, interval } from 'rxjs';
import { takeLast } from 'rxjs/operators';
import { run } from './../03-utils/run';

export function takeLastDemo1() {
  const start = 1;
  const count = 100;

  const source$ = range(start, count);

  // Takes the last 10 values from the source, then completes.
  const stream$ = source$.pipe(takeLast(10));
  // run(stream$);
}

// source emits fewer than count values then all of its values are emitted
export function takeLastDemo2() {
  const source$ = of(1, 2, 3);

  // Takes all values from the source, then completes.
  const stream$ = source$.pipe(takeLast(10));
  // run(stream$);
}

export function takeLastDemo3() {
  const period = 1000;
  const source$ = interval(period); // infinite stream

  // This will never emit anything. Interval doesn't have the last values
  const stream$ = source$.pipe(takeLast(10));
  // run(stream$);
}
