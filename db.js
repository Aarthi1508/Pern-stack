const Pool = require("pg").Pool

const pool = new Pool({
    user:"postgres",
    password:"loveuappa",
    host:"localhost",
    port:5432,
    database:"perndemo",
});

module.exports = pool;

/*


In JavaScript, the "new" keyword is used to create an instance of a user-defined object or a built-in constructor function. When you use the new keyword followed by a constructor function, it creates a new object and binds that object as the this context within the constructor function. This allows you to initialize properties and methods on the newly created object.

// Constructor function
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Creating a new instance of Person using the new keyword
var john = new Person('John', 30);

console.log(john.name); // Output: John
console.log(john.age);  // Output: 30

*/