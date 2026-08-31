/*
"Vanilla" JavaScript objects.
    We are assuming you have experiences with OOP--object-oriented programming.
    You should be (roughly) familiar with these terms:
        -"class"
        -"instance" 
            (of some class)
        -"method" 
            (a function defined inside a class--can be invoked on a
             given instannce of said class.)
        -"constructor"
            (a special method used to initialize a new instance)
    
    Object-oriented programming in TypeScript is a little complicated to
    explain because JavaScript was not built initially as an OOP
    language in the way that, say, C++ was. "Classes" in the typical
    sense were a later addition.

    From the beginning, JavaScript has been built around "objects".

    Be warned: the word "object" has a subtler meaning than in other
    languages. In a language like Python or C++, it's (mostly) okay
    to think of "object" as a synonym for "instance" of some class
    type. But in JavaScript/TypeScript, it's more complex.
*/

// For starters, an "object" is _not_ a primitive type like 'number'
// or 'string':
//
// Errors
// let someObj : object = 10
// let someObj : object = undefined
// let someObj : object = null
// let someObj : object = 'text'
// let someObj : object = true


// However, the following are specific kinds of "object":
//   -arrays
//   -functions
let someObj : object = [];
someObj = [0,1,2,"text"];
someObj = ( a : number, b : number ) => Math.max( a, b );
someObj = () => { console.log( 'Hello world.') };

// So what is the essence of 'object'? 
// What is it in JavaScript that unifies 
//   -arrays
//   -functions
//   -all other 'object's ?
//
// Every 'object' in JavaScript is a collection of 
// named properties.

// An "empty" object with no named properties
someObj = {}

// An object with two named properties
someObj = 
{
    // Here, the ":" precedes the _value_ assigned to a property rather
    // than a type annotation.
    name: "Gogol",
    age: 30
};

// An object with three named properties
someObj =
{
    price : 123.33,
    barcode : 2333333,
    discount : 0
};



/*
Interfaces
    In TypeScript, if you want to use an object, you need to 
    use type annotations to say what the named properties of
    said object are. "interface" is a powerful tool for doing
    this.
*/

// Here's us making an object along with a type annotation
// to indicate to TypeScript what the names and types of 
// the properties are.
const personObj : { name : string, age : number } =
{
    name : "Gogol",
    age : 30
};

// Because we used that type annotation, we can now 
// legally (as per TypeScript) interact with the
// properties of 'personObj'.
personObj.name = "Gogol II";
personObj.age = 31
const hisAge : number = personObj.age;

// What if we want to make multiple person-style 'object''s, 
// where each has a string 'name' property and a numeric 'age'
// property? This is where we use "interface", which is TypeScript's
// way for us to make a reusable type that has this effect.
interface Person
{
    name : string;
    age : number
};

// Let's use Person to make multiple objects
const person1 : Person = 
{
    name : "Angela",
    age : 20
};
const person2 : Person = 
{
    name : "Drupal",
    age : 50
};

// Some more interface examples

interface Point2D
{
    x : number;
    y : number;
};

interface Circle
{
    center : Point2D;
    radius : number;
}

// A function that will come in handy soon...

function pointsEqual( a : Point2D, b : Point2D ) : boolean
{
    return a.x === b.x && a.y == b.y;
}



/*
Classes
    JavaScript also has "classes" in the way you usually think of 
    them. These were added later, built on top of 'object'.

    (Make sure to read all the lines in this part--there are some
     important incidental details about how to handle arrays.)
*/

// Represents a rectangle in 2D space
export class BoundingBox
{
    bottomLeft : Point2D = { x : 0, y : 0 };
    topRight : Point2D = { x : 0, y : 0 };

    // Create a 'BoundingBox' that just encloses 'a' and 'b'.
    constructor( a : Point2D, b : Point2D ) 
    {
        this.setFromPoints( [ a, b ] );
    }

    // This is _not_ a fundamental part of JavaScript or TypeScript. It does
    // not get automatically invoked by '==' or '===' expressions (more on 
    // that later). Rather, 'equals' is specifically expected by the vitest
    // testing framework we're using in this package. It gets invoked by
    // the 'toEqual' calls in `learn.test.ts'.
    equals( other : any ) : boolean
    {
        if( other instanceof BoundingBox ) {
            return pointsEqual( this.bottomLeft, other.bottomLeft ) &&
                   pointsEqual( this.topRight, other.topRight );
        } else {
            return false;
        }
    }

    // Here are some _methods_ for this class. 

    getWidth() : number 
    {
        return this.topRight.x - this.bottomLeft.x;
    } 

    getHeight() : number 
    {
        return this.topRight.y - this.bottomLeft.y;
    } 

    // Expand to include 'p', if necessary.
    addPoint( p : Point2D ) : void 
    {
        this.setFromPoints( [ this.bottomLeft, this.topRight, p ] );
    }

    // Use 'private' to make a method not callable from outside
    // of the class. Use this whenever possible; it is good 
    // to restrict access as much as possible (similar to how
    // it's always best to use 'const' if you can).

    // Initialize this box to just contain everything in 'points' (length>0).
    private setFromPoints( points : Point2D[] ) : void 
    {
        // 'map' is a _method_ of array. Notice that we're passing it
        // an anonymous function as an argument. This anonymous function
        // takes in a 'Point2D' and returns its 'x' value.
        const xCoords : number[] = points.map( p => p.x );
        const yCoords : number[] = points.map( p => p.y );

        // We have to do "for of" instead of "for in"; otherwise
        // 'toSort' would actually be bound to the as-string _indices_
        // of the anonymous array.
        for( const toSort of [xCoords,yCoords] ) {
            // Warning; .sort() normally alphabetically sorts
            // its values (which means it would put the number 20
            // before the number 5, for instance). We have to
            // pass in a comparison function that tells .sort()
            // how to compare elements in 'toSort'.
            toSort.sort( (a,b) => a - b );
        }

        const numP : number = points.length;
        this.bottomLeft = { x : xCoords[ 0 ], y : yCoords[ 0 ] };
        this.topRight = { x : xCoords[ numP - 1 ], y : yCoords[ numP - 1 ] };
    }
};



/*
Checking equality
    This is a trickier part of JavaScript: what actually happens when
    you use '==' and '==='?
*/

let a : any = 0;
let b : any = 0;

// First, use '===' and '!==' instead of '==' and '!='. The latter
// are risky because they will sometimes perform automatic type conversions,
// giving you unexpected results.

// Avoid
a == b; 
a != b;
// Prefer
a === b;
a !== b;

// When it comes to _primitive_ types, '===' and '!==' do what you would expect:
// they evaluate to 'true' or 'false' based on whether the two sides have the same 
// type and the same values.
//
// Remember that primitive types include 'number', 'string', 'boolean', 'null', and 'undefined'.

a = 10
b = 10
a === b // true
a !== b // false

a = 10
b = 11
a === b // false
a !== b // true

a = 10
b = "10"
a === b // false

a = "text"
b = "text"
a === b // true

a = null
b = 0
a === b // false (they're not the same type)

a = null
b = undefined 
a === b // false

// When it comes to 'objects' (non-primitive types), '===' and '!==' work differently.
// In this case, they check for _referential_ equality. The question becomes, "Are these
// two references to the _same object_?" rather than "Are these two objects equivalent?"

a = [0,1,2]
b = [0,1,2]
a === b // false (the contents are the same, but they are two different objects)

a = { x : 0, y : 0 };
b = { x : 0, y : 0 };
a === b // false

a = ( x : number ) => x * 2;
b = ( x : number ) => x * 2;
a === b // false

// Actually checking "deep equality" on two objects requires a different approach.
// There is not a single way to do this. Example: if you are using vitest testing
// and you want to check deep equality on two objects, you'll want to use and 'equal'
// method like in 'BoundingBox'.