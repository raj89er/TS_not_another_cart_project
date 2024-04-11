
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

function createUser(name: string, age: number): User {
    const id = uuidv4(); // generate UUID for id
    const cart: Item[] = []; // Initialize empty cart
    return { id, name, age, cart };
}

function createItem(name: string, price: number, description: string): Item {
    const id = uuidv4(); // Autogenerate UUID for id
    return { id, name, price, description };
}

function addToCart(item: Item, user: User): void {
    user.cart.push(item);
}

function removeFromCart(item: Item, user: User): void {
    user.cart = user.cart.filter(cartItem => cartItem.id !== item.id);
}

function cartTotal(user: User): number {
    return user.cart.reduce((total, item) => total + item.price, 0);
}

function printCart(user: User): void {
    console.log("Items in cart:");
    user.cart.forEach(item => {
        console.log(`${item.name} - Price: ${item.price}`);
    });
}

function removeQuantityFromCart(item: Item, user: User, quantity: number): void {
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




