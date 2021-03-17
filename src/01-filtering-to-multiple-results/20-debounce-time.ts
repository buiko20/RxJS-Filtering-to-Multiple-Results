// debounceTime<T>(
//      dueTime: number, 
//      scheduler: SchedulerLike = async
// ): MonoTypeOperatorFunction<T>

import { fromEvent } from 'rxjs';
import { debounceTime, map, tap, take } from 'rxjs/operators';
import { addItem } from '../03-utils';
import { run } from './../03-utils/run';

export function debounceTimeDemo() {
  const source$ = fromEvent(document, 'mousemove').pipe(
    map(event => ({
      clientX: event['clientX'],
      clientY: event['clientY']
    }))
  );

  const stream$ = source$.pipe(
    tap(val => addItem(`value from source: ${JSON.stringify(val)}`, { color: '#ccc'})),
    debounceTime(1000), // <-- period of silence in source observable
    take(5)
  );
  // run(stream$);
}
