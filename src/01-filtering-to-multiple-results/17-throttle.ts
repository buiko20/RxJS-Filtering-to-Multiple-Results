// throttle<T>(
//      durationSelector: (value: T) => SubscribableOrPromise<any>, 
//      config: ThrottleConfig = defaultThrottleConfig //  Defaults to { leading: true, trailing: false }.
// ): MonoTypeOperatorFunction<T>

import { timer, interval } from 'rxjs';
import { throttle, take, tap, map } from 'rxjs/operators';
import { addItem } from '../03-utils';
import { run } from './../03-utils/run';

export function throttleDemo1() {
  const source$ = timer(0, 100);

  const stream$ = source$.pipe(
    tap(valueFromSource => addItem(`source: ${valueFromSource}`, { color: '#ccc'})),
    throttle(() => {
      return interval(1000); // interval is a const = 1c
    }),
    take(10)
  );
  // run(stream$);
}

export function throttleDemo2() {
  const source$ = timer(0, 100);

  const stream$ = source$.pipe(
    throttle(valueFromSource => {
      addItem(`throttle: value from source: ${valueFromSource}, delay ${valueFromSource * 100}`, { color: '#ccc'});
      return interval(valueFromSource * 100); // interval depends on value from source
    }),
    take(5)
  );
  // run(stream$);
}

export function throttleDemo3() {
  const source$ = timer(0, 100).pipe(map(x => x + 1));

  const stream$ = source$.pipe(
    tap(valueFromSource => addItem(`source: ${valueFromSource}`, { color: '#ccc'})),
    throttle(() => {
      return interval(1000); // interval is a const = 1c
    }, {leading: true, trailing: false}),
    take(10)
  );
  // run(stream$);
}
