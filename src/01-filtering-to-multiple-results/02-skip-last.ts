// skipLast<T>(
//      count: number
// ): MonoTypeOperatorFunction<T>

import { range, interval } from 'rxjs';
import { skipLast } from 'rxjs/operators';
import { run } from './../03-utils/run';

export function skipLastDemo1() {
  const start = 1;
  const count = 100;
  const source$ = range(start, count); // finite stream

  // skip/ignore the last 10 velues
  const stream$ = source$.pipe(skipLast(10));
  // run(stream$);
}

export function skipLastDemo2() {
  const period = 100;
  const source$ = interval(period); // infinite stream

  // skip/ignore the last 10 values = nothing happens
  const stream$ = source$.pipe(skipLast(10));
  // run(stream$);
}
