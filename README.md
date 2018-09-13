

# typeself provides self-referential types to JavaScript/TypeScript

JavaScript only has basic [Data types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Data_structures_and_types) and [typeof ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)operator returns a string indicating the type of the unevaluated operand.

[TypeScript](http://www.typescriptlang.org/) brings you optional static type-checking, however, it does not provide a type that has a totally unique property.

[typeself](https://www.npmjs.com/package/typeself) ( https://github.com/kenokabe/typeself )

provides a unique self-referential type with the name of the function.

As the most simple example, a unique type: `Type(Member)` is defined by an identity function: `Member = a => a`

```js
const  Member  = (a) =>  Type(Member)(a);
```

Here, the output of the function: `Member` is a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)  of `a`.

Now, define `alice` that has a string value as usual and `bob` also has a string value, but in this case, has given type `Member`.

```js
const  alice  =  "Alice";
const  bob  =  Member("Bob");
```
The typed data is, in fact, a proxy of the original and behaves like the original. The proxy objects are rarely distinguishable than the original object. The proxy object is noticeable on, for instance, `console.log`.

`isType(Member)` returns Boolean(true/flase) for the data with `Type(Member)`
 or non-typed.
 
```js
log(
"Member status of "  +  alice
);//Member status of Alice
log(
isType(Member)(alice)
);//false
log(
"Member status of "  +  bob
);//Member status of Bob
log(
isType(Member)(bob)
);//true
```

The original concept introduced in [SICP](http://mitpress.mit.edu/sites/default/files/sicp/index.html) as "TypeTag".
 
## ESM

ES Modules are distributed as

- `./dist/build/modules/typeself.js`
- `./dist/build/modules/primitive-obj.js`

```js
import { Type, isType } from "./dist/build/modules/typeself.js";
```

## CJS

### npm

Using npm:

```sh
$ npm i typeself
```

In Node.js:

```js
const { Type, isType } = require("typeself");
```

## Test

```sh
$ node -r esm ./dist/build/index.js
```

### ./test/test-typeself.js


```js
import { log } from "./log";
import { Type, isType } from "../modules/typeself";

const test_typeself = () => {
  log("=Are you a member??? ========= ");
  const Member = (a: string) => Type(Member)([a]);
  const alice = "Alice";
  const bob = Member("Bob");
  log(
    "Member status of " + alice
  );//Member status of Alice
  log(
    isType(Member)(alice)
  );//false
  log(
    "Member status of " + bob
  );//Member status of Bob
  log(
    isType(Member)(bob)
  );//true

  log("=Is this a special operation??========= ");
  const specialOperation = (f: Function) => Type(specialOperation)(f);

  const f1 = (a: number) => a + 1; //vanilla function
  const f2 = Type(specialOperation) //typed function
    ((a: number) => {
      //This function might be considered to be "special" 
      //because it does some featured operations in a context.
      return a * 2;
    });

  log(
    isType(specialOperation)(f1)
  );//false
  log(
    f1(1) // f1 = a => a +1
  );//2  // just in case, let you know
  log(
    isType(specialOperation)(f2)
  );//true
  log(
    f2(1) // f2 = a => a * 2
  );//2  // just in case, let you know

  log("=type test of nontyped=========================");
  const I = (a: undefined) => a;  //just a dummy function

  log(
    isType(I)(I) // true
  );
  log(
    isType(I)(1) // false
  );
  log(
    isType(I)([]) // false
  );
  log(
    isType(I)({}) // false
  );
  log(
    isType(I)("hello") //fakse
  );
  log(
    isType(I)((x: undefined) => x) // false
  );
  log(
    isType(I)(true) // false
  );
  log(
    isType(I)(false) // false
  );

  log("=type test of typed=========================");

  log(
    isType(I)(Type(I)(I)) // true
  );
  log(
    isType(I)(Type(I)(1)) // true
  );
  log(
    isType(I)(Type(I)([])) // true
  );
  log(
    isType(I)(Type(I)({})) // true
  );
  log(
    isType(I)(Type(I)("hello")) //true
  );
  log(
    isType(I)(Type(I)((x: undefined) => x)) // true
  );
  log(
    isType(I)(Type(I)(true)) // true
  );
  log(
    isType(I)(Type(I)(false)) // true
  );
  log(
    (Type(I)(false) == false)
      ? "Type(I)(false) == false  (as should be)"
      : "something is wrong"
  );
  log(
    (Type(I)(false) !== false)//Object !== Primitive
      ? "Type(I)(false) !== false  (as should be)"
      : "something is wrong"
  );
  log(
    isType(I)(Type(I)(NaN)) //true
  );
  log(
    isType(I)(Type(I)(undefined)) // false
  );
  log(
    isType(I)(Type(I)(null)) // false
  );

  log("check---------------------------");
  log(
    Type(I)(1) + Type(I)(2)//3
  );
  log(
    Type(I)([1, 2, 3])//[1, 2, 3]
  );

  log("check---------------------------");
  const n = Type(I)(6);
  log(
    n.toString()
  );


};

export { test_typeself };
```