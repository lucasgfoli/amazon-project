export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = 
[{
    productId:
    'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
}, {
    productId: 
    '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
}];

}

function saveToStorage () {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    const productQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    let matchingItem = cart.find(item => item.productId === productId);
  
    if (matchingItem) {
      matchingItem.quantity += productQuantity;
    } else {
      cart.push({
        productId,
        quantity: productQuantity,
        deliveryOptionId: '1'
      });
    }

    saveToStorage();
  }


export function removeFromCart (productId) {
     const newCart = [];

      cart.forEach((item) => {
        if(item.productId !== productId){
          newCart.push(item);
        }
      });

      cart = newCart;

      saveToStorage();
  }


export function calculateCartQuantity () {
  let cartQuantity = 0;
    cart.forEach(item => {
      cartQuantity += item.quantity;
    });

  return cartQuantity;
  }

export function updateQuantity (productId, newQuantity){
  let matchingItem = cart.find(item => item.productId === productId);
  
    if (matchingItem) {
      matchingItem.quantity = newQuantity;
    } else {
      cart.push({
        productId,
        quantity: newQuantity
      });
    }

    saveToStorage();
  }

export function updateDeliveryOption (productId, deliveryOptionId){
      let matchingItem;

      cart.forEach((cartItem) => {
        if(productId === cartItem.productId)
          matchingItem = cartItem;
      });

      matchingItem.deliveryOptionId = deliveryOptionId;

      saveToStorage();
  }