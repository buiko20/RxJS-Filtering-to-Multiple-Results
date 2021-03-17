// filter<T>(
//        predicate: (value: T, index: number) => boolean, 
//        thisArg?: any
// ): MonoTypeOperatorFunction<T>

import { range } from 'rxjs';
import { filter } from 'rxjs/operators';
import { run } from './../03-utils/run';

// emit values matching a given predicate
export function filterDemo() {
  const start = 1;
  const count = 100;

  const source$ = range(start, count);
  const predicate = (n: number) => n % 3 === 0;

  const stream$ = source$.pipe(filter(predicate));
  // run(stream$);
}
