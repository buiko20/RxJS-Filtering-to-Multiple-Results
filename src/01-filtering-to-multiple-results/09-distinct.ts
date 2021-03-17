// distinct<T, K>(
//      keySelector?: (value: T) => K, 
//      flushes?: Observable<any>
// ): MonoTypeOperatorFunction<T>

import { from, of } from "rxjs";
import { distinct } from "rxjs/operators";
import { run } from './../03-utils/run';

export function distinctDemo1() {
  const source$ = from([1, 1, 1, 2, 2, 3, 3, 3, 2, 2, 1, 1]);

  // select only unique values from the source
  const stream$ = source$.pipe(distinct());
  // run(stream$);
}

export function distinctDemo2() {
  const source$ = from([1, -1, 2, -2, 3, -3]);

  // select only unique values from the source as determined by function
  const stream$ = source$.pipe(distinct(elem => Math.abs(elem)));
  // run(stream$);
}

export function distinctDemo3() {
  const source$ = from([
    { name: "Anna", age: 16 },
    { name: "Boris", age: 20 },
    { name: "Anna", age: 30 }
  ]);

  // select only unique values from the source as determined by function
  const stream$ = source$.pipe(distinct(elem => elem.name));
  // run(stream$);
}
