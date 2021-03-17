// throttleTime<T>(
//      duration: number, 
//      scheduler: SchedulerLike = async, 
//      config: ThrottleConfig = defaultThrottleConfig
// ): MonoTypeOperatorFunction<T>

// { leading: true, trailing: false }

// source:               --0----1----2----3----4----5----6----7----8-- 
// throttle interval:    --[~~~~~~~~~~~~~~~~~]-[~~~~~~~~~~~~~~~~~]-[~~ 
// output:               --0-------------------4-------------------8--


// { leading: false, trailing: true }

// source:               --0----1----2----3----4----5----6----7----8-- 
// throttle interval:    --[~~~~~~~~~~~~~~~~~]-[~~~~~~~~~~~~~~~~~]-[~~ 
// output:               --------------------3-------------------7----


// { leading: true, trailing: true }

// source:               --0----1----2----3----4----5----6----7----8-- 
// throttle interval:    --[~~~~~~~~~~~~~~~~~]-[~~~~~~~~~~~~~~~~~]-[~~  
// output:               --0-----------------3-4-----------------7-8--


// { leading: false, trailing: false }

// source:               --0----1----2----3----4----5----6----7----8--
// throttle interval:    --[~~~~~~~~~~~~~~~~~]-[~~~~~~~~~~~~~~~~~]-[~~
// output:               ---------------------------------------------

import { fromEvent, timer } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import { take, tap, map, throttleTime } from 'rxjs/operators';
import { addItem } from '../03-utils';
import { run } from './../03-utils/run';

export function throttleTimeDemo1() {
  const source$ = fromEvent(document, 'mousemove').pipe(
    map(event => ({
      clientX: event['clientX'],
      clientY: event['clientY']
    }))
  );

  const stream$ = source$.pipe(
    tap(val => addItem(`value from source:, ${JSON.stringify(val)}`, { color: '#ccc'})),
    throttleTime(1000), // <-- emits first value, then the last value of each time frame
    take(5)
  );
  // run(stream$);
}

export function throttleTimeDemo2() {
  const source$ = timer(0, 100).pipe(map(x => x + 1));

  const stream$ = source$.pipe(
    tap(valueFromSource => addItem(`source: ${valueFromSource}`, { color: '#ccc'})),
    throttleTime(1000, async, {leading: true, trailing: false}),
    take(10)
  );
  // run(stream$);
}
