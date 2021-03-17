// skip<T>(
//      count: number
// ): MonoTypeOperatorFunction<T>

import { range } from 'rxjs';
import { skip } from 'rxjs/operators';
import { run } from './../03-utils/run';

export function skipDemo() {
  const start = 1;
  const count = 100;
  const source$ = range(start, count);

  // skip 10 values
  const stream$ = source$.pipe(skip(10));

  // run(stream$);
}
