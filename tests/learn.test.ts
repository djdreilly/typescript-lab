import { describe, test, expect } from "vitest"

import { DegreesCelsius } from "../src/learnTypes.ts";
import { convertCToF, strToNum, transformNums, ScalarOp } from '../src/learnFunctions.ts' 
import { BoundingBox } from '../src/learnInterfacesAndClasses.ts'

// A call to describe is a way to make a top-level grouping of some
// tests, e.g., you could use a describe call to define the tests
// for a particular function
describe('convertCToF', () => {
  // A test call is a way to make a subgrouping of some tests.
  test('basic functionality', () => {
    // Here we are verifying that if the input is 0, the output should be
    // _close to_ 32 (when dealing with floating-point answers, there's
    // a risk of the answer not being exactly what you would expect).
    expect(convertCToF(0)).toBeCloseTo(32);
    expect(convertCToF(100)).toBeCloseTo(212);
    const c : DegreesCelsius = 123;
    expect(convertCToF(c)).toBeCloseTo(253.4);
  });
});

describe('strToNum', () => {
  test('good inputs', () => {
    // Notice we use toBe instead of toBeCloseTo because there's
    // no risk of tiny floating-point deviations due to floating-point
    // arithmetic.
    expect(strToNum("0")).toBe(0);
    expect(strToNum("0.1")).toBe(0.1);
    expect(strToNum("1234")).toBe(1234);
    expect(strToNum("1234.33")).toBe(1234.33);
    expect(strToNum("-1234.33")).toBe(-1234.33);
  });

  test('bad inputs', () => {
    // Notice we use toBe instead of toBeCloseTo because there's
    // no risk of tiny floating-point deviations due to floating-point
    // arithmetic.
    expect(strToNum("")).toBe(null);
    expect(strToNum("1a")).toBe(null);
    expect(strToNum("a")).toBe(null);
    expect(strToNum(" ")).toBe(null);
    expect(strToNum("1 c b")).toBe(null);
  });
});

describe( 'transformNums', () => {
  test( 'show how it works', () => {
    const nums : number[] = [0,1,2]

    // Watch out: it's arrow-style function syntax
    const divideBy2 : ScalarOp = ( x : number ) => x / 2;
    const times2 : ScalarOp = ( x : number ) => x * 2;

    // We have to use 'toEqual' and not 'toBe' here because
    // 'toEqual' is able to check whether two _separate_ array
    // objects contain equal values, whereas 'toBe' literally
    // checks whether the _same_ array object is being referred to! 
    expect( transformNums( nums, divideBy2 ) ).toEqual( [ 0, 1/2, 1 ] );
    expect( transformNums( nums, times2 ) ).toEqual( [ 0, 2, 4 ] );
  });
});

describe( 'BoundingBox', () => {
  test( 'basic', () => {

    const bb : BoundingBox = new BoundingBox( { x : 3, y : 4 }, { x : 1, y : 6 } );
    expect( bb ).toEqual(
        new BoundingBox(
          { x : 1, y : 4 },
          { x : 3, y : 6 } ) );

    bb.addPoint( { x : 20, y : 7 } );
    expect( bb ).toEqual(
        new BoundingBox(
          { x : 1, y : 4 },
          { x : 20, y : 7 } ) );

    bb.addPoint( { x : 4, y : 5 } );
    expect( bb ).toEqual(
        new BoundingBox(
          { x : 1, y : 4 },
          { x : 20, y : 7 } ) );

    bb.addPoint( { x : -4, y : -3 } );
    expect( bb ).toEqual(
        new BoundingBox(
          { x : -4, y : -3 },
          { x : 20, y : 7 } ) );

  });
});


