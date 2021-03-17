import { addItem, run } from './../03-utils';
import { first, last, elementAt, min, max, find, findIndex, single, filter, sample, tap, sampleTime, map, audit, auditTime, throttle, throttleTime, debounce, debounceTime, skip, skipLast, skipUntil, skipWhile, take, pluck, takeLast, takeUntil, startWith, takeWhile, distinct, reduce, distinctUntilChanged, distinctUntilKeyChanged, switchMap, withLatestFrom, combineAll, toArray } from 'rxjs/operators';
import { from, fromEvent, fromEventPattern, generate, interval, of, pairs, range, timer } from 'rxjs';
import { ajax } from 'rxjs/ajax';

// Task 1. skip()
// Создайте поток из массива чисел от 1 до 10, используя range()
// Получите элементы потока начиная с 3.
(function task1(): void {
    // const stream$ = 

    // run(stream$);
})();

// Task 2. skipLast()
// Создайте поток из массива [1, 2, {}], используя from()
// Получите элементы потока без последнего элемента
(function task2(): void {
    // const stream$ = 

    // run(stream$);
})();


// Task 3. skipUntil()
// Создайте поток чисел, который выдает их каждую 1с, используя interval().
// Выведите эти числа серым цветом, использыя tap(), addItem(value, {color: '#ccc'})
// Создайте поток собития клик по кнопке runBtn
// Игнорируйте элементы первого потока до клика на кнопке
(function task3(): void {

    const event$ = fromEvent(document.querySelector('#runBtn'), 'click')
    const stream$ = interval(1000).pipe(
        skipUntil(event$),
        tap(value => addItem(value, { color: '#ccc' }))
    )

    //run(stream$);
})();

// Task 4. skipWhile()
// Создайте поток чисел, который выдает их каждую 500мс, используя timer().
// Выведите эти числа серым цветом, использыя tap(), addItem(value, {color: '#ccc'})
// Игнорируйте элементы потока, пока они меньше 10, получите 5 элементов и завершите поток, используя take()
(function task4() {
    const stream$ = timer(0, 500).pipe(
        tap(value => addItem(value, { color: '#ccc' })),
        skipWhile(value => value < 10),
        take(5)
    )

    // run(stream$);
})();


// Task 5. take()
// Создайте поток собития клик по кнопке runBtn, используя fromEvent()
// Получите метку времени трех кликов, используя pluck() и завершите поток. 
(function task5() {
    const event$ = fromEvent(document.querySelector('#runBtn'), 'click')
    const stream$ = event$.pipe(
        pluck("timeStamp"),
        take(3)
    );

    //run(stream$);
})();

// Task 6. takeLast()
// Создайте поток из слов 'Ignore', 'Ignore', 'Hello', 'World!', используя of().
// Модифицируйте поток так, чтобы получить последние два слова в потоке.
// Соберите из них предложение, используя reduce()
(function task6() {
    const stream$ = of('Ignore', 'Ignore', 'Hello', 'World!')
        .pipe(
            takeLast(2),
            reduce((acc, value) => `${acc} ${value}`, "")
        );

    // const stream$ = of('Ignore', 'Ignore', 'Hello', 'World!').pipe(
    //     takeLast(2),
    //     toArray(),
    //     map(res => res.join(' '))
    // );

    //run(stream$);
})();

// Task7. takeUntil()
// Создайте поток, который будет выполнять запрос каждую 1с в течении 5с, используя timer()
// и ajax(`https://api.github.com/users?per_page=5`); Время остановки должно формироваться с помощью потока,
// созданого с помощью timer()
// Добавьте в поток ответ запроса, используя pluck(). 
// Испльзуйте вспомагательный оператор switchMap() 
(function task7() {
    const stream$ = timer(0, 1000)
        .pipe(
            takeUntil(timer(5000).pipe(take(1))),
            switchMap(() => ajax(`https://api.github.com/users?per_page=5`)),
            filter(r => r.status == 200),
            switchMap(r => from(r.response)),
            pluck("login"),
        )

    //run(stream$);
})();

// Task 8. takeWhile()
// Создайте поток случайных чисел в диапазоне от 0 до 1, используя Math.random, генератор, from()
// Добавьте в поток в качестве стартового значения 0.11, используя startWith() 
// Получайте из потока числа пока они находятся в диапазоне от 0 до 0.7.
// Добавьте в поток также значение, которое нарушило условие.
(function task8() {
    function* generator(min, max) {
        while (true) {
            yield Math.random() * (max - min) + min;
        }
    }

    const stream$ = from(generator(0, 1))
        .pipe(
            startWith(0.11),
            takeWhile(n => (n > 0 && n < 0.7), true)
        );

    //run(stream$);
})();

// Task 9. distinct()
// Создайте массив чисел с дублями, используя from().
// Модифицируйте поток так, чтобы в массиве были уникальные элементы
// Используйте reduce()
(function task9() {
    const stream$ = from([1, 2, 2, 2, 3, 5, 5, 5, 5, 6, 1, 1, 1]).pipe(
        distinct(),
        toArray(),
    )


    // run(stream$);
})();

// Task 10. distinctUntilChanged()
// Реализуйте функцию, которая создает Observable, который будет выдавать в поток значения, 
// хранящихся в свойстве sequence класса С, используя generate()
// Модифицируйте поток - уберите повторы в подряд идущих группах, соберите предложение,
// используя reduce()
(function task10() {
    class C<T> {
        private words: T[] = [];

        get size(): number {
            return this.words.length;
        }

        add(elem: T) {
            this.words.push(elem);
            return this;
        }

        get(index: number): T {
            return this.words[index];
        }
    }

    const obj = new C<string>()
        .add('На')
        .add('дворе')
        .add('дворе')
        .add('трава,')
        .add('на')
        .add('траве')
        .add('траве')
        .add('дрова.');


    const stream$ = generate(
        0,
        i => obj.size > i,
        i => i + 1,
        i => obj.get(i)
    ).pipe(
        distinctUntilChanged(),
        reduce((acc, value) => `${acc} ${value}`, "")
    );

    //run(stream$);
})();


// Task 11. distinctUntilKeyChanged()
// Пусть есть массив объектов. Создайте поток, в котором будут только три объекта, за исключением, второго объекта { name: 'Joe' }.
// Используйте from()
(function task11() {
    const ar = [
        { name: 'Brian' },
        { name: 'Joe' },
        { name: 'Joe' },
        { name: 'Sue' }
    ];

    const stream$ = from(ar).pipe(distinctUntilKeyChanged('name'));

    //run(stream$);
})();


// Task 12. filter()
// Пусть есть поток objAddressStream, который выдает объект и второй поток skipFieldsStream, который содержит перечень ключей объекта
// Необходимо модифицировать поток так, чтобы он выдавал объект без ключей из второго потока. 
// Используйте switchMap, pairs, withLatestFrom, reduce
(function task12() {
    const objAddressStream = of({
        country: 'Ukraine',
        city: 'Kyiv',
        index: '02130',
        street: 'Volodymyra Velikogo',
        build: 100,
        flat: 23
    });

    const skipFieldsStream$ = from(['build', 'flat']);


    const stream$ = objAddressStream
        .pipe(
            switchMap(data => pairs(data)),
            withLatestFrom(skipFieldsStream$.pipe(reduce((acc, elem) => { acc.push(elem); return acc; }, []))),
            filter(data => {
                const [obj, fields] = data;
                return (fields as any).includes(obj[0]) === false;
            }),
            map(data => data[0]),
            reduce((acc, elem) => {
                acc[elem[0]] = elem[1];
                return acc;
            }, {})
        );

    //run(stream$, { outputMethod: 'console' });
})();



// Task 13. sample()
// Создайте поток, который выдает числа каждую секунду, используя interval(). Выведите эти числа серым цветом,
// использыя tap(), addItem(value, {color: '#ccc'})
// Создайте поток событий 'click' на кнопке, используя fromEventPattern()
// Организуйте получение последнего элемента из первого 
// потока во время клика по кнопке
(function task13() {
    function addClickHandler(handler) {
        document.addEventListener('click', handler);
    }

    function removeClickHandler(handler) {
        document.removeEventListener('click', handler);
    }

    const clicks$ = fromEventPattern(
        addClickHandler,
        removeClickHandler
    );

    const stream$ = interval(1000).pipe(
        tap(value => addItem(value, { color: '#ccc' })),
        sample(clicks$)
    )


    // run(stream$);
})();

// Task 14. sampleTime()
// Создайте поток, который выдает числа каждую секунду, используя interval(). Выводите эти числа серым цветом,
// использыя tap(), addItem(value, {color: '#ccc'})
// Модифицируйте данный поток так, чтобы он выдавал последнее число, которое было в потоке 
// с периодом 3000мс
(function task14() {
    const stream$ = interval(1000).pipe(
        tap(value => addItem(value, { color: '#ccc' })),
        sampleTime(3000)
    )

    // run(stream$);
})();


// Task 15. audit()
// Создайте поток, который выдает числа каждые 500мс, используя interval(). 
// Выводите эти числа серым цветом, использыя tap(), addItem(value, {color: '#ccc'})
// Создайте функцию, которая принимает число и возращает поток, который выдает числа каждую 
// 1с, используя interval().
// Модифицируйте первый поток так, чтобы он выдавал значение только спустя время, заданое во 
// втором потоке.
(function task15() {
    const stream$ = interval(500).pipe(
        tap(value => addItem(value, { color: '#ccc' })),
        audit(value => interval(1000))
    )

    // run(stream$);
})();


// Task 16. auditTime()
// Создайте поток, который выдает числа каждую 1с, используя interval(). 
// Выводите эти числа серым цветом, использыя tap(), addItem(value, {color: '#ccc'})
// Модифицируйте первый поток так, чтобы он выдавал числи только спустя каждые 3с
(function task16() {
    const stream$ = interval(1000).pipe(
        tap(value => addItem(value, { color: '#ccc' })),
        //audit(value => interval(3000)),
        auditTime(3000)
    );
    //run(stream$);
})();


// Task 17. throttle()
// Создайте поток, который выдает числа каждую 1с, используя interval(). 
// Выводите эти числа серым цветом, использыя tap(), addItem(value, {color: '#ccc'})
// Модифицируйте первый поток так, чтобы он выдавал число, затем выдавал числа с периодом в число * 1000 мс.
(function task17() {
    const stream$ = interval(1000).pipe(
        tap(value => addItem(value, { color: '#ccc' })),
        throttle(value => interval(value * 1000)),
    );

    //run(stream$);
})();


// Task 18. throttleTime()
// Создайте поток объектов события mousemove?  Модифицируйте этот поток так, чтобы он выдал первое значение,
// а потом выдавал значение через каждый 2с
(function task18() {
    const stream$ = fromEvent(document, 'mousemove').pipe(
        tap(value => addItem(value, { color: '#ccc' })),
        throttleTime(2000),
    );

    //run(stream$, { outputMethod: 'console' });
})();

// Task 19. debounce()
// Создайте поток объектов события mousemove. Модифицируйте этот поток так, чтобы он выдал значение после того,
// как в потоке не будет появляться объект в течении времени заданого с помощью второго потока, например 500мс.
(function task19() {
    const stream$ = fromEvent(document, 'mousemove').pipe(
        tap(value => addItem(value, { color: '#ccc' })),
        debounce(() => interval(500))
    );

    //run(stream$, { outputMethod: 'console' });
})();

// Task 20. debounceTime()
// Создайте поток значений поля ввода с id='text-field' для события keyup, используя fromEvent()  
// Модифицируйте этот поток так, чтобы он выдавал значение поля ввода после того,
// как в потоке не будет появляться новое значение в течении 500мс.
(function task20() {
    const stream$ = fromEvent(document.getElementById("text-field"), "keyup")
        .pipe(
            tap(value => addItem(value, { color: '#ccc' })),
            pluck('target'),
            pluck('value'),
            debounceTime(500),
            distinctUntilChanged()
        );

    run(stream$, { outputMethod: 'console' });
})();

// HomeTask 1. debounceTime()
// Пользователь очень активно кликает на кнопку runBtn, чтобы получить спиок логинов пользователей (https://api.github.com/users?per_page=5).
// Сделайте так, чтобы только 1 запрос за пользователями был отправлен и выведите список логинов.
(function homeTask1() {
    const stream$ = fromEvent(document.getElementById("runBtn"), "click")
        .pipe(
            debounceTime(300),
            switchMap(() => ajax(`https://api.github.com/users?per_page=5`)),
            switchMap(r => from(r.response)),
            map((u: any) => u.login)
        );

    //run(stream$);
})();

// HomeTask 2. takeWhile()
// Создайте поток ввода текста из поля ввода до тех пора, пока не будет нажата клавиша Enter.
// Затем выведете набранную строку.
(function homeTask2() {
    const stream$ = fromEvent(document.getElementById("text-field"), "keyup")
        .pipe(
            map((e: KeyboardEvent) => e.key),
            takeWhile(key => key !== "Enter"),
            toArray(),
            switchMap(d => from(d)),
            reduce((acc, value) => `${acc}${value}`, "")
        );

    //run(stream$);
})();

// HomeTask 3. skip() take()
// Создайте поток ajax(`https://api.github.com/users`)
// Вывидите логины 10го, 11го, 12го, 13го, 14го по порядку пользователей.
(function homeTask3() {
    const stream$ = ajax(`https://api.github.com/users`)
        .pipe(
            switchMap(r => from(r.response)),
            skip(10),
            take(5),
            map((u: any) => u.login)
        );

    //run(stream$);
})();


export function runner() { }