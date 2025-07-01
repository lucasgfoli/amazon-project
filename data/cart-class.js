// OBJECT-ORIENTED PROGRAMING (OOP)
// ORGANIZE THE CODE INTO OBJECTS

//Object generator
class Cart {
    cartItems; //Property of the class / Public
    #localStorageKey = undefined; // This # make the porpertie private. Only be use in this class

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        //This = Use the porpeties of this object inside of hiSm
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

        if (!this.cartItems) {
            this.cartItems = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }];
        }
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        if (matchingItem) {
            matchingItem.quantity += 1;
        } else {
            this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1'
            });
        }

        this.saveToStorage(); //To acces the function inside the object
    }

    removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });

        this.cartItems = newCart;

        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
    }

}

// Multiple objects created with class

const cart = new Cart('cart-oop'); //Object generator or Instance of the class
const businessCart = new Cart('cart-business'); // This values inside of the brackets its the parameters of the constructor

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);