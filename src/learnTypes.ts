/* 'const' 
   Use 'const' to bind a name permanently to one object.
   The object itself _can be mutated_, but the name can
   never be _rebound_ to a new object.
 */
const a : number = 10
// Errors: 
// a++;
// a = 11;

const b : number[] = [0,1,2]
// Okay:
b.push(3) // mutates the object, but does not rebind the name 'my_nums'.
b[0] = 10 // same idea
// Error:
// b = [0,1,2,3,4] // this is not allowed since it would mean binding the name 'b' to a new object.



/* 'let'
   Use 'let' in situations where a name needs to be able to rebind to
   a new object. Only use if necessary; use 'const' otherwise.
 */
let c : string = "text"
c = "different text" // name 'might_rebind' is bound to a new object



/* Basic Type Annotation Usage
   When you declare a name, use ": typename" to say what type of 
   object that name should always be bound to.
 */
// boolean 
const myBool : boolean = true

// Number (could be float or integer; unfortunately JavaScript,
// and therefore TypeScript do not have separate primitive
// types for integers and floating-point numbers.
const myNum : number = 123.3 // floating point
const myNum2 : number = 123 // integer

// String
const myStr : string = "some text"
const myStr2 : string = `my_num is ${myNum} and my_num2 is ${myNum2}` 
    // ^ Use backticks `` and ${} to create a string containing to-be-stringified 
    // JavaScript expressions.

// Array of numbers
let myNums : number[] = []
myNums = [1]
myNums = [1,2,3]

// Array of strings
let myStrings : string[] = []
myStrings = ['a','b']
myStrings = ['c','d','e']

// 'null'
// In JavaScript 'null' is both a datatype and it is the
// value that has that datatype. (It is similar to 'None'
// in Python and to 'null' in other languages.)
//
// Use 'null' to cover situations where you need to represent
// that something might not be there.
const nullVal : null = null

// 'undefined'
// When a name has been introduced but it has not been assigned any
// value, it is bound to 'undefined'.
// Also, when a function has no explicit 'return' statement, it 
// is understood to return 'undefined'
const undefinedVal : undefined = undefined



/* Literals-based types
   It is possible to express a requirement such as, "this object
   must be literally the number 1 or the number 2".
 */
let oneOrTwo : 1 | 2 = 1
oneOrTwo = 2
// Error:
// one_or_two = 3 

let xOrY : 'x' | 'y' = 'x'
xOrY = 'y'
// Error:
// x_or_y = 'Y' 



/* Fixed Array Type Annotations 
   You can require that an array has a specific size.
   You can even specify that the first element is a number, second is a string, etc.
 */
const numAndNum : [ number, number ] = [1,2]
const numAndStr : [ number, string ] = [1,"2"]
const numAndStrAndNum : [number, string, number] = [1,"2",3]




/* The "any" type.
   Means what it sounds like
*/
let whatever : any = false
whatever = 123
whatever = "123"
whatever = null

const arrOfWhatever : any[] = [ "a", 123, false, null ]



/*
Union types ( plus undefined/null )
   It is possible to require a name to be bound to 
   either a number OR to a string, etc. This is good
   place to introduce "undefined" and "null", two 
   special values in JavaScript that you will often
   run into.
*/
let numOrStr : number | string = 123
numOrStr = "123"

let nullableNum : number | null = null
nullableNum = 123

let numsOrUndefined : number[] | undefined = [ 1, 2, 3 ]
numsOrUndefined = undefined



/*
Maps
   (This is a less basic type than the others covered here,
    but it's one you'll likely find useful in this course.)
   In JavaScript, "Map" refers to the "map" data structure,
   where each _key_ is associated with some _value_. 
*/
// Keys are integers, values are strings.
// Note the use of "new" to construct a new Map object (you
// don't need "new" to create a new array object, by contrast).
const idToName : Map<number,string> = new Map<number,string>(
   [ [ 1234354554, 'ava' ],
     [ 1234444556, 'lark'],
     [ 1233334445, 'erwin' ] ]);
const new_id : number = 123333555;
idToName.set( new_id, 'garvey' ); // key, value
// Note the type hint on 'value'--when you get a value by key, the
// result _could_ be undefined.
const value : string | undefined = idToName.get( new_id )

// Same idea with a new Map whose keys are new strings and whose values are
// integers.
const nameToColor : Map<string,number> = new Map<string,number>();
nameToColor.set( 'red', 0xff000000 )
nameToColor.set( 'green', 0x00ff0000 )
nameToColor.set( 'blue', 0x000000ff )



/* 
"type": naming your own types
   To create a name for a type itself is very useful
   because you can name the type once and then refer
   to that name multiple times.
   
   A word about _naming style_:
      -Use camel-case to name variables
            e.g., 'myLocalVariable'
      -Use Pascal-case to name your own types.
            e.g., 'MyCustomType'
*/
// Defining some types.
// "export" lets us "import" this definition from a different 
// source file (you'll see this come in handy soon.)
export type DegreesCelsius = number
export type DegreesFahrenheit = number
// An example of each of those types.
const boiling : DegreesCelsius = 100
const freezing : DegreesFahrenheit = -32

export type OptionalNum = number | null
const optNum : OptionalNum = null
const optNumPair : [ OptionalNum, OptionalNum ] = [ null, 123 ]

type OptionalString = string | null;
const optStrings : OptionalString[] = [ null, null, "a", "b", null ]

type Coords = [ number, number ]
const myCoords : Coords = [ 0, 0 ]

type NameToAddress = Map<string,string>
const addressBook : NameToAddress = new Map<string,string>();

type XOrY = 'X' | 'Y'
type ArrOfXOrY = XOrY[]
const letters : ArrOfXOrY = [ 'X', 'Y', 'Y', 'X' ]
// Error
// letters.push( 'z') 

type RowOfNums = number[]
type Matrix = RowOfNums[] // this is a 2D array; each entry is a _row_ in a matrix.
const my3x3Matrix : Matrix = 
[
   [ 1, 0, 0 ],
   [ 0, 1, 0 ],
   [ 0, 0, 1 ]
]; 
// Actually, 'Matrix' is a bit loosely defined; nothing about it says that 
// all the RowOfNums inside have to be the same size!

// Here's a way to make a type exclusively for 3x3 matrices
type RowOf3 = [ number, number, number ]
type Matrix3 = [ RowOf3, RowOf3, RowOf3 ]
// Error:
// const my_new_3x3_matrix : Matrix3 = 
// [
//    [ 1, 0, 0 ],
//    [ 1, 0, 0, 0 ], // 'RowOf3' requires this row to be length 3.
//    [ 0, 0, 1 ]
// ]
