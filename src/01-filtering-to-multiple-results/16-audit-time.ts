// auditTime<T>(
//      duration: number, 
//      scheduler: SchedulerLike = async
// ): MonoTypeOperatorFunction<T>

import { fromEvent } from 'rxjs';
import { take, tap, auditTime, map } from 'rxjs/operators';
import { run } from './../03-utils/run';

export function auditTimeDemo() {
  const source$ = fromEvent(document, 'mousemove').pipe(
    map(event => ({
      clientX: event['clientX'],
      clientY: event['clientY']
    }))
  );

  const stream$ = source$.pipe(
    auditTime(1000), // ignore mousemove event during 1000ms
    take(5)
  );
  // run(stream$);
}
