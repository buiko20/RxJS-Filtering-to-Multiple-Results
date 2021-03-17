// take<T>(
//      count: number
// ): MonoTypeOperatorFunction<T>

import { range } from 'rxjs';
import { take } from 'rxjs/operators';
import { run } from './../03-utils/run';

export function takeDemo() {
  const start = 1;
  const count = 100;

  const source$ = range(start, count);

  // Takes the first 10 values from the source, then completes.
  const stream$ = source$.pipe(take(10));
  // run(stream$);
}
