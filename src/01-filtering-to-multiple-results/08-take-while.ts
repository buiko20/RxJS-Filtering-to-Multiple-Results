// takeWhile<T>(
//      predicate:(value: T, index: number) => boolean, 
//      inclusive: boolean = false 
// ): MonoTypeOperatorFunction<T>

import { of } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { run } from './../03-utils/run';

export function takeWhileDemo1() {
  const source$ = of(1, 2, 3, 1);
  //                       ^ condition false

  // Emit values while provided expression is true.
  const stream$ = source$.pipe(takeWhile(n => n < 3));
  // run(stream$);
}

// use index in predicate
export function takeWhileDemo2() {
  const source$ = of(1, 2, 3, 1);
  const inclusive = true;

  const stream$ = source$.pipe(
    takeWhile((elem, index) => index < 3, inclusive)
  );
  // run(stream$);
}
