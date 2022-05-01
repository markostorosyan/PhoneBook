const fs = require('fs');
const isDataExists = fs.existsSync("./phoneBook2.txt")
let json = "[]";

if(isDataExists) {
    json = fs.readFileSync("./phoneBook2.txt", "utf8");
}
 
const userArray = toPars(json);

let userId = 0;

class User {
    constructor(name, surName, phoneNumber, address, id) {
        this._name = name;
        this._surName = surName;
        this._phoneNumber = phoneNumber;
        this._address = address;
        this._id = id;   
    }
}

/* 
How to add user

in conlose write node main2.js --add userName userSurName userPhoneNumber userAddress;

*/

if(process.argv[2] === "--add") {
    createUser(process.argv[3],process.argv[4], process.argv[5], process.argv[6])
    fs.writeFileSync("./phoneBook2.txt", toStr(userArray))
}

/* 
How to edit user

in conlose write node main2.js --edit userId userName userSurName userPhoneNumber userAddress;

*/

if(process.argv[2] === "--edit") {
    editUser(process.argv[3], process.argv[4], process.argv[5], process.argv[6], process.argv[7])
    fs.writeFileSync("./phoneBook2.txt", toStr(userArray))
}

/* 
How to delete user

in conlose write node main2.js --del userId;

*/

if(process.argv[2] === "--del") {
    deleteUser(process.argv[3]);
}

function toStr (arr) {
    return JSON.stringify(arr);
}

function toPars (arr) {
    return JSON.parse(arr);
}

function createUser (name, surName, phoneNumber, address) {
    // if (userArray.length === 0){
    //     userId = 1;
    // } else {
    //     userArray.forEach((val) => {
    //         userId = val._id + 1
    //     });
    // }

    if(userArray.length === 0) {
        userId = 1;
    } else {
        let p = userArray.map((val) => {
          return val._id;
      })
      let p2 = Math.max(...p);
      userId = p2 + 1
    }

    return userArray.push(new User(name, surName, phoneNumber, address, userId))
}

function editUser(id, name, surName, phoneNumber, address) {

    let user = userArray.find((val) => {
        return val._id === Number(id);
    })
    if (user !== undefined) {
        user._name = name;
        user._surName = surName;
        user._phoneNumber = phoneNumber;
        user._address = address;
        user._id = +id;
    }
    return user;
        
   
}

function deleteUser(id) {
    let a = userArray.filter((val) => {
        if(Number(id) !== val._id)
            return val;
    });
    let b = fs.writeFileSync("./phoneBook2.txt", toStr(a))
    return b;
}