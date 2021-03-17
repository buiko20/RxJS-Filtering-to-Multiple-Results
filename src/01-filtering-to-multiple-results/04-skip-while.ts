// skipWhile<T>(
//      predicate: (value: T, index: number) => boolean 
// ): MonoTypeOperatorFunction<T>

import { of } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { run } from './../03-utils/run';

export function skipWhileDemo() {
  const source$ = of(1, 2, 3, 1, 2, 3, 4);
  //                       ^ condition false

  // skip while the condition is true
  const stream$ = source$.pipe(
    skipWhile((val, index) => val < 3) // evaluates only once
  );
  // run(stream$);
}
