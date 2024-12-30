const cart = [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = JSON.parse(button.getAttribute('data-product'));
        addToCart(product);
    });
});

function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    updateCart();
}

function updateCart() {
    cartCount.textContent = cart.reduce((count, item) => count + item.quantity, 0);
    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length > 0) {
        cart.forEach(item => {
            total += item.price * item.quantity;
            cartItems.innerHTML += `
                <div class="d-flex align-items-center mb-2">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                    <div>
                        <p class="mb-0">${item.name}</p>
                        <p class="mb-0">Qty: ${item.quantity} x ₨${item.price.toFixed(2)}</p>
                    </div>
                    <button class="btn btn-danger btn-sm ms-auto" onclick="removeFromCart('${item.name}')">Remove</button>
                </div>`;
        });
    } else {
        cartItems.innerHTML = '<p class="text-center">Your cart is empty.</p>';
    }

    cartTotal.textContent = `₨${total.toFixed(2)}`;
}

function removeFromCart(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex > -1) {
        cart.splice(productIndex, 1);
        updateCart();
    }
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Proceeding to checkout with the following items:\n' + 
          cart.map(item => `${item.name} - Qty: ${item.quantity}`).join('\n') +
          `\nTotal: ${cartTotal.textContent}`);
});

