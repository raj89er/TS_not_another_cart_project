
import { v4 as uuidv4 } from "uuid";

let uuid = uuidv4()
console.log(uuid)

type Item = {
    id: string;
    name: string;
    price: number;
    description: string;
};

type User = {
    id: string;
    name: string;
    age: number;
    cart: Item[];
};

function createUser(
    name: string,
    age: number
): User {
    const id = uuidv4(); // generate UUID for id
    const cart: Item[] = []; // Initialize empty cart
    return { id, name, age, cart };
}

function createItem(
    name: string,
    price: number,
    description: string
): Item {
    const id = uuidv4(); // Autogenerate UUID for id
    return { id, name, price, description };
}

function addToCart(
    item: Item,
    user: User
): void {
    console.log(`1 ${item.name} was added to ${user.name}'s cart.`);
    user.cart.push(item);
}

function removeFromCart(
    item: Item,
    user: User
): void {
    console.log(`1 ${item.name} was removed from ${user.name}'s cart.`);
    user.cart = user.cart.filter(cartItem => cartItem.id !== item.id);
}

function cartTotal(
    user: User
): number {
    return user.cart.reduce((total, item) => total + item.price, 0);
}

function printCart(user: User): void {
    console.log(`+#############################################+`);
    console.log(`|                  Receipt                    |`);
    console.log(`+---------------------------------------------+`);
    console.log(`| Item                  | Price               |`);
    console.log(`+---------------------------------------------+`);
    user.cart.forEach(item => {
        console.log(`| ${item.name.padEnd(22)} | $${item.price.toFixed(2).padStart(10)} |`);
    });
    console.log(`+=============================================+`);
    console.log(`| Total                 |         $${cartTotal(user).toFixed(2).padStart(10)} |`);
    console.log(`+#############################################+`);
}

function removeQuantityFromCart(
    item: Item, 
    user: User, 
    quantity: number
): void {
    console.log(`${quantity} ${item.name} was removed from ${user.name}'s cart.`);
    let remainingQuantity = quantity;
    user.cart = user.cart.filter(cartItem => {
        if (cartItem.id === item.id) {
            if (remainingQuantity > 0) {
                remainingQuantity--;
                return false;
            }
        }
        return true;
    });
}

function emptyCart(user: User): void {
    user.cart = [];
    console.log(`The cart for ${user.name} has been emptied.`);
}

const bilbo = createUser(
    `Bilbo Baggins`,
    77
);
const oneRing = createItem(
    `The One Ring`,
    100,
    `Grants the wearer invisibility and has absolutely no forseen ill effects whatsoever.`
);
const lembasBread = createItem(
    `Lembas Bread`,
    10,
    `A few bites of this elven waybread sustain a traveler for days. It’s lightweight, nutritious, and perfect for long journeys.`
);
const hobbitsPipe = createItem(
    `Hobbit’s Pipe of Calm`,
    15,
    `Relaxing pipe`
);

addToCart(oneRing, bilbo);
printCart(bilbo);

addToCart(lembasBread, bilbo);
addToCart(lembasBread, bilbo);
addToCart(lembasBread, bilbo);
printCart(bilbo);

addToCart(hobbitsPipe, bilbo);
addToCart(hobbitsPipe, bilbo);
addToCart(hobbitsPipe, bilbo);
printCart(bilbo);

removeFromCart(lembasBread, bilbo);
printCart(bilbo);

removeQuantityFromCart(hobbitsPipe, bilbo, 2);
printCart(bilbo);
emptyCart(bilbo);
printCart(bilbo);

