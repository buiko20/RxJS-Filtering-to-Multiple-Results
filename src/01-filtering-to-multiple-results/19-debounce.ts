// debounce<T>(
//      durationSelector: (value: T) => SubscribableOrPromise<any> 
// ): MonoTypeOperatorFunction<T>

import { fromEvent, interval, timer } from 'rxjs';
import { debounce, map, tap, take } from 'rxjs/operators';
import { addItem } from '../03-utils';
import { run } from './../03-utils/run';

export function debounceDemo() {
  const source$ = fromEvent(document, 'mousemove').pipe(map(event => ({
    clientX: event['clientX'],
    clientY: event['clientY']
  })));

  const stream$ = source$.pipe(
    tap(val => addItem(`value from source: ${JSON.stringify(val)}`, { color: '#ccc'})),
    debounce(val_from_source => {
      addItem(
        `value used to calculate next Observable: ${JSON.stringify(val_from_source)}`, {color: '#ccc'}
      );
      return interval(1000); // <-- period of silence in source observable
    }),
    take(5)
  );
  // run(stream$);
}
