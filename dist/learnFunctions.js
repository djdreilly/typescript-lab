/*
Functions: Design Recipe and Type Annotations
   The "design recipe" for a function is a set of steps to follow
   when making a new function:
        (1) data types (define any data types you need for the function's inputs/outputs)
        (2) header/purpose statement
                The header is the line where you name the function and specify the types of its inputs and
                outputs. The purpose statement is a comment above the header saying "Do this", explaining
                to other programmers what the function does without unnecessarily repeating information
                that is already in the header.
        (3) tests
                You'll see how to make these soon.
        (4) the body of the function itself.
    
    Type annotations should be used for
        (1) the inputs to the function
        (2) the output of the function
                (Can leave this out if the function has no return statement,
                 which technically means that the function returns 'undefined'.)
        (3) anything created inside of the function (local variables).
*/
// Convert 'celsius' to Fahrenheit.
export function convertCToF(celsius) {
    const fahrenheit = celsius * (9 / 5) + 32;
    return fahrenheit;
}
// If 'numText' is a strictly the string representation of
// a decimal number, return said number; return null otherwise.
export function strToNum(numText) {
    // Make sure to use type annotations on local variables
    // inside functions.
    const trimmed = numText.trim();
    if (trimmed.length === 0) {
        return null;
    }
    const asNum = Number(trimmed);
    return Number.isNaN(asNum) ? null : asNum;
}
/// Print a message.
function printGreeting() {
    // Note that there is no annotation for the return type since there is 
    // no explicit return statement. Do bear in mind that a function like
    // this _does_ return a value; that value is 'undefined'.
    //
    // (So a valid header would be 'function printGreeting() : undefined'.)
    //
    // (You could also say 'function printGreeting() : void', but remember
    //  that 'void' is a TypeScript construct; there is not actually a 'void'
    //  datatype in JavaScript.)
    console.log("Hello world.");
}
// Add one to 'x'.
function addOne(x) {
    return x + 1;
}
// Square 'x'.
function square(x) {
    return x ** 2;
}
// Notice how the name 'myScalarFunction' is bound
// to two different _values_, both of which are of 
// type 'ScalarOp'.
//
// (If you think about it, the same applies to the
//  names 'addOne' and 'square'; these are just two
//  names bound to function values that happen to be
//  specifically 'ScalarOp' functions.)
let myScalarFunction = addOne;
myScalarFunction = square;
/*
Functions: Function-type parameters
    It is very common in JavaScript for a function to take
    a function as an argument.
*/
// Apply 'transform' to the values in 'nums' and return
export function transformNums(nums, // 'readonly' means you can't mutate the array that 'nums' is bound to.
transform) {
    const newNums = Array(nums.length);
    // In this for loop we are binding the name 'index' to each
    // of the values in 'nums.keys()', which returns all the 
    // indices into 'nums'.
    for (const index of nums.keys()) {
        const valueAtIndex = nums[index];
        newNums[index] = transform(valueAtIndex);
    }
    // Go to introFunctions.test.ts and look at the tests on this function
    // to help you understand how it works. Watch out for arrow-syntax functions;
    // we're coming to that soon.
    // Notice that this function returns a modified copy of 'nums' but
    // does not modify the array object which 'nums' is bound to at 
    // all. This is expressed/enforced using "readonly", which is good
    // to use on complex function arguments--especially arrays--whenever
    // possible. (One could easily write a different version of 'transformNums'
    // in which the point was actually to change values inside of 'nums',
    // in which case 'readonly' would not be valid).
    return newNums;
}
/*
Functions: Anonymous Functions
    It's time to explain the strange syntax you saw when you looked
    at the tests on 'transformNums'.

    When you want to call a function like 'transformNums' which takes
    another function as an argument, it can be tedious to have to go
    and create an official name for that other function. It's possible
    instead to define that function in place without naming it.
    This is called making an "anonymous function", and JavaScript has
    a couple of ways to do it.
*/
// First, let's look at calling 'transformNums' the more tedious way,
// where we officially name the function it's going to be passed.
const nums = [0, 1, 2];
function add30(x) {
    return x + 30;
}
transformNums(nums, add30);
// Now let's look at doing the same thing using an anonymous function
transformNums(nums, function (a) { return a + 30; });
// Did you see that? We defined an anonymous function in place and 
// passed it directly to 'transformNums'. We did not need to give
// it a name.
// The previous syntax is actually kind of dated; here's the more modern,
// arrow-based style.
// Either of these works
transformNums(nums, (a) => a + 30);
transformNums(nums, (a) => { return a + 30; });
/*
Taking what you've learned and revisiting the tests
    Anonymous functions feature heavily.
*/
// Go back to introFunctions and take a look at what's actually happening in there.
// Two functions are repeatedly called:
//   (1) describe
//   (2) test
//
//  Look at one of the calls to 'describe'. What arguments are being passed to it?
//   (1) a string, e.g., 'convertCToF', and
//   (2) an anonymous function.
//
//  And what happens inside this anonymous function? Calls to the function 'test'.
//  
//  What is passed to an individual call of 'test'?
//   (1) a string--e.g., ''basic functionality'--and
//   (2) an anonymous function.
//
//  And what happens inside _this_ anonymous function? This is where you 
//  finally do actual test work using calls to functions like 'expect'.
//
//  (Note that the functions 'toBeCloseTo', 'toBe', and 'toEqual' are actually
//   _methods_ called on the object that gets returned by 'expect'.)
/*
Asynchronous programming and callback functions.
    A lot of JavaScript involves "asynchronous programming", which
    means providing functions that won't be called right away, but
    when some event occurs in the future. These to-be-called-later
    functions are known as "callback functions."
*/
// We'll introduce this concept by using the function 'setInterval'.
// This function takes two arguments:
//   (1) some callback function 'yourCallback'
//   (2) a 'number' in milliseconds.
// This function returns an "interval ID"
// 
// When you call 'setInterval', an under-the-hood timer will
// start running until the specified time interval has passed,
// at which point 'yourCallback' will be called (this is where
// the asynchrony is happening--'yourCallback' gets called _later_,
// not the moment you supply it).
//
// The timer will reset whenever it elapses, so 'yourCallback' will
// be called over and over until 'clearInterval' is called (typically
// you'll make this call from within 'yourCallback'.)
//
// See the example 'printCountdown' below. Go and call this
// function from 'index.ts' (you'll need to use an 'import' statement).
// Print a countdown starting at 'start' ( integer > 0 )
// and counting down every 'delay' milliseconds ( > 0 ).
export function printCountdown(start, delay) {
    // The first argument passed to 'setInterval' is 
    // a "callback" function.
    const intervalID = setInterval(() => {
        console.log(`Countdown at ${start}`);
        start--;
        if (start <= 0) {
            console.log('Countdown complete.');
            clearInterval(intervalID);
        }
    }, delay);
}
//# sourceMappingURL=learnFunctions.js.map