// import {  } from '../index';
// test('My Greeter', () => {
//   expect(Greeter('Carl')).toBe('Hello Carl');
// });

import { Conductor } from '../conductor';
// import { SystemTimeSource } from '../sytem-time-source';

test(
    "Start",
    () => {
        const conductor = new Conductor();
        conductor.start();
    }
);