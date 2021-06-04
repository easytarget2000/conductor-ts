// import {  } from '../index';
// test('My Greeter', () => {
//   expect(Greeter('Carl')).toBe('Hello Carl');
// });

import { Conductor } from '../conductor';

test(
    "Start",
    () => {
        const sut = new Conductor();
        sut.start();
    }
);

test(
    "Update",
    () => {
        const sut = new Conductor();
        sut.start();
        const result = sut.update();
        console.log(result);
    }
);