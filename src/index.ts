import { skipDemo, skipLastDemo1, skipLastDemo2, skipUntilDemo, skipWhileDemo, takeDemo, takeLastDemo1, takeLastDemo2, takeLastDemo3, takeUntilDemo, takeWhileDemo1, takeWhileDemo2, distinctDemo1, distinctDemo2, distinctDemo3, distinctUntilChangedDemo1, distinctUntilChangedDemo2, distinctUntilKeyChangedDemo1, distinctUntilKeyChangedDemo2, filterDemo, sampleDemo, auditTimeDemo, auditDemo, debounceTimeDemo, sampleTimeDemo, throttleDemo2, throttleDemo1, throttleDemo3, throttleTimeDemo1, throttleTimeDemo2 } from './01-filtering-to-multiple-results';
import { debounceDemo } from './01-filtering-to-multiple-results/19-debounce';
import { runner } from './02-practice/tasks';
console.log(`Hi, Rxjs`);


// ************************************************
// *                  Filtering to Multiple Results
// ************************************************

skipDemo();
skipLastDemo1();
skipLastDemo2();
skipUntilDemo();
skipWhileDemo();

takeDemo();
takeLastDemo1();
takeLastDemo2();
takeLastDemo3();
takeUntilDemo();
takeWhileDemo1();
takeWhileDemo2();

distinctDemo1();
distinctDemo2();
distinctDemo3();

distinctUntilChangedDemo1();
distinctUntilChangedDemo2();

distinctUntilKeyChangedDemo1();
distinctUntilKeyChangedDemo2();

filterDemo();

sampleDemo();
sampleTimeDemo();

auditDemo();
auditTimeDemo();

throttleDemo1();
throttleDemo2();
throttleDemo3();
throttleTimeDemo1();
throttleTimeDemo2();

debounceDemo();
debounceTimeDemo();

runner();