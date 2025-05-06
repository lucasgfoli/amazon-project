export const cart = [];

export function addToCart(productId) {
    const productQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    let matchingItem = cart.find(item => item.productId === productId);
  
    if (matchingItem) {
      matchingItem.quantity += productQuantity;
    } else {
      cart.push({
        productId,
        quantity: productQuantity
      });
    }
  }