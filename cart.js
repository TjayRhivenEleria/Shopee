document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartButton = document.getElementById('clear-cart');
    const placeOrderButton = document.getElementById('place-order');
  
    function updateCart() {
      if (!cartItemsList) return;
      
      cartItemsList.innerHTML = '';
      let total = 0;
  
      for (const [name, { price, quantity }] of Object.entries(cart)) {
        const itemElement = document.createElement('li');
        itemElement.innerHTML = `
          ${name} - ₱${price} x ${quantity}
          <button class="minus">-</button>
          <button class="plus">+</button>
          <button class="remove">Remove</button>
        `;
        cartItemsList.appendChild(itemElement);
  
        total += price * quantity;
  
        itemElement.querySelector('.minus').addEventListener('click', () => {
          if (cart[name].quantity > 1) {
            cart[name].quantity -= 1;
          } else {
            delete cart[name];
          }
          saveCart();
          updateCart();
        });
  
        itemElement.querySelector('.plus').addEventListener('click', () => {
          cart[name].quantity += 1;
          saveCart();
          updateCart();
        });
  
        itemElement.querySelector('.remove').addEventListener('click', () => {
          delete cart[name];
          saveCart();
          updateCart();
        });
      }
  
      if (cartTotal) {
        cartTotal.textContent = total.toLocaleString();
      }
    }
  
    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    document.querySelectorAll('#products .product button').forEach(button => {
      button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product');
        const productName = productElement.getAttribute('data-name');
        const productPrice = parseFloat(productElement.getAttribute('data-price'));
  
        if (!cart[productName]) {
          cart[productName] = { price: productPrice, quantity: 0 };
        }
        cart[productName].quantity += 1;
  
        saveCart();
        window.location.href = 'cart.html';
      });
    });
  
    if (clearCartButton) {
      clearCartButton.addEventListener('click', () => {
        for (const productName in cart) {
          delete cart[productName];
        }
        saveCart();
        updateCart();
      });
    }
  
    if (placeOrderButton) {
      placeOrderButton.addEventListener('click', () => {
        if (Object.keys(cart).length > 0) {
          alert("Your Order is On The Way!");
          for (const productName in cart) {
            delete cart[productName];
          }
          saveCart();
          updateCart();
        } else {
          alert("Your cart is empty.");
        }
      });
    }
  
    updateCart();
  });
  