import { log } from "./log.js";
import { Type, isType } from "../modules/typeself.js";
const test_typeself = () => {
    log("=Are you a member??? ========= ");
    const Member = (a) => Type(Member)(a);
    const alice = "Alice";
    const bob = Member("Bob");
    log(alice);
    log(isType(Member)(alice)); //false
    log(bob);
    log(isType(Member)(bob)); //true
    log("=Is this a special operation??========= ");
    const specialOperation = (f) => Type(specialOperation)(f);
    const f1 = (a) => a + 1; //vanilla function
    const f2 = Type(specialOperation) //typed function
    ((a) => {
        //This function might be considered to be "special" 
        //because it does some featured operations in a context.
        return a * 2;
    });
    log(isType(specialOperation)(f1)); //false
    log(f1(1) // f1 = a => a +1
    ); //2  // just in case, let you know
    log(isType(specialOperation)(f2)); //true
    log(f2(1) // f2 = a => a * 2
    ); //2  // just in case, let you know
    log("=type test of nontyped=========================");
    const I = (a) => a; //just a dummy function
    log(isType(I)(I) // true
    );
    log(isType(I)(1) // false
    );
    log(isType(I)([]) // fakse
    );
    log(isType(I)({}) // false
    );
    log(isType(I)("hello") //fakse
    );
    log(isType(I)((x) => x) // false
    );
    log(isType(I)(true) // false
    );
    log(isType(I)(false) // false
    );
    log("=type test of typed=========================");
    log(isType(I)(Type(I)(I)) // true
    );
    log(isType(I)(Type(I)(1)) // true
    );
    log(isType(I)(Type(I)([])) // true
    );
    log(isType(I)(Type(I)({})) // true
    );
    log(isType(I)(Type(I)("hello")) //true
    );
    log(isType(I)(Type(I)((x) => x)) // true
    );
    log(isType(I)(Type(I)(true)) // true
    );
    log(isType(I)(Type(I)(false)) // true
    );
    log((Type(I)(false) == false)
        ? "Type(I)(false) == false  (as should be)"
        : "something is wrong");
    log((Type(I)(false) !== false) //Object !== Primitive
        ? "Type(I)(false) !== false  (as should be)"
        : "something is wrong");
    log(isType(I)(Type(I)(NaN)) //true
    );
    log(isType(I)(Type(I)(undefined)) // false
    );
    log(isType(I)(Type(I)(null)) // false
    );
    log("check---------------------------");
    log(Type(I)(1) + Type(I)(2) //3
    );
    log(Type(I)([1, 2, 3]) //[1, 2, 3]
    );
    log("check---------------------------");
    const n = Type(I)(6);
    log(n.toString());
};
export { test_typeself };
