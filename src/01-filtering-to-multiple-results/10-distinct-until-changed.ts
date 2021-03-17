// distinctUntilChanged<T, K>(
//        compare?: (x: K, y: K) => boolean, 
//        keySelector?: (x: T) => K
// ): MonoTypeOperatorFunction<T>

import { from, fromEvent, of } from "rxjs";
import { distinctUntilChanged, map, debounceTime } from "rxjs/operators";
import { run } from './../03-utils/run';

// CASE 1: emit only values if changed from the previous one
export function distinctUntilChangedDemo1() {
  const source$ = from([1, 1, 1, 2, 2, 3, 3, 3, 2, 2, 1, 1]);
  //                       ^  ^     ^     ^  ^     ^     ^ - droped values

  const stream$ = source$.pipe(distinctUntilChanged());
  // run(stream$);
}

// CASE 2: distinctUntilChanged with objects
export function distinctUntilChangedDemo2() {
  interface Person {
    name: string;
    age: number;
  }

  const source$ = of<Person>(
    { name: "Anna", age: 4 },
    { name: "Boris", age: 7 },
    { name: "Anna", age: 5 },
    { name: "Anna", age: 6 }
  );
  const compare = (p1: Person, p2: Person) => p1.name === p2.name;

  const stream$ = source$.pipe(distinctUntilChanged(compare));
  // run(stream$);
}
