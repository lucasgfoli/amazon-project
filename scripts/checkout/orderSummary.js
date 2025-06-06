import {calculateCartQuantity, cart, removeFromCart, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import {calculateDeliveryDate} from '../../data/deliveryOptions.js';
// When we import a function, we can also use 'as' to change its name.

export function renderOrderSummary(){

    let cartSummaryHTML = '';

    cart.forEach((item) => {

        const productId = item.productId;
        const matchingProduct = getProduct(productId);
        const deliveryOptionId = item.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);
        const dateString = calculateDeliveryDate(deliveryOption); 

    cartSummaryHTML += 
        `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id = "${matchingProduct.id}">
                    Update
                    </span>
                    <input class = "quantity-input js-quantity-input">
                    <span class = "save-quantity-link link-primary js-save-link" data-product-id = "${matchingProduct.id}"> Save </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, item)}
                </div>
                </div>
            </div>
        </div>
        
        
        `;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem){
            let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            const dateString = calculateDeliveryDate(deliveryOption);

            const priceString = deliveryOption.priceCents
            === 0
                ? 'FREE'
                : `$${formatCurrency(deliveryOption
                    .priceCents)} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

                    html +=
            `<div class="delivery-option js-delivery-option"
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id=${deliveryOption.id}>
                    <input type="radio" 
                    ${isChecked ?'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                    </div>
            </div>`
        });

        return html;
    }


    document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHTML;

        
    // Recalcular e atualizar a quantidade total de itens no carrinho ao carregar a página
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-quantity-items').innerHTML = `${cartQuantity} item${cartQuantity !== 1 ? 's' : ''}`;

    // Adicionar eventos de deleção e atualização de quantidade
    document.querySelectorAll('.js-delete-link').forEach((link) => {

        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

                renderOrderSummary();
                renderPaymentSummary();

            // Recalcular e atualizar a quantidade total de itens no carrinho
            const updatedCartQuantity = calculateCartQuantity();
            document.querySelector('.js-quantity-items').innerHTML = `${updatedCartQuantity} item${updatedCartQuantity !== 1 ? 's' : ''}`;
            
            
        });
    });

    document.querySelectorAll('.js-update-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add('is-editing-quantity');
            const updatedCartQuantity = calculateCartQuantity();
        });
    });

    document.querySelectorAll('.js-save-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            const input = container.querySelector('.js-quantity-input');
            const newQuantity = Number(input.value);

            if (newQuantity >= 0 && newQuantity < 1000) {
                // Atualizar a quantidade do item
                updateQuantity(productId, newQuantity);

                // Atualizar a quantidade exibida no item do carrinho
                container.querySelector('.quantity-label').innerHTML = newQuantity;

                // Recalcular e atualizar a quantidade total de itens no carrinho
                const updatedCartQuantity = calculateCartQuantity();
                document.querySelector('.js-quantity-items').innerHTML = `${updatedCartQuantity} item${updatedCartQuantity !== 1 ? 's' : ''}`;

                // Remover a classe de edição
                container.classList.remove('is-editing-quantity');
                
                renderPaymentSummary();
            } else {
                alert('Insira um valor entre 0 e 999');
            }
        });

                
    });

    document.querySelectorAll('.js-quantity-input').forEach((input) => {
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const container = input.closest('.cart-item-container');
                const productId = container.querySelector('.js-save-link').dataset.productId;
                const newQuantity = Number(input.value);

                if (newQuantity >= 0 && newQuantity < 1000) {
                    // Atualizar a quantidade do item
                    updateQuantity(productId, newQuantity);

                    // Atualizar a quantidade exibida no item do carrinho
                    container.querySelector('.quantity-label').innerHTML = newQuantity;

                    // Recalcular e atualizar a quantidade total de itens no carrinho
                    const updatedCartQuantity = calculateCartQuantity();
                    document.querySelector('.js-quantity-items').innerHTML = `${updatedCartQuantity} item${updatedCartQuantity !== 1 ? 's' : ''}`;

                    // Remover a classe de edição
                    container.classList.remove('is-editing-quantity');
                } else {
                    alert('Insira um valor entre 0 e 999');
                }
            }
        });
    });

    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const {productId, deliveryOptionId} = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);

                //Recursion
                renderOrderSummary();
                renderPaymentSummary();
            });
        });}

