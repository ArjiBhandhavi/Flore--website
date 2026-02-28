const TAX_RATE = 0.05;

function addToCart(name, price, image) {
    let cart = getCart();

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, image, qty: 1 });
    }

    saveCart(cart);
    alert("Added to cart 🛒");
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateTotals(cart) {
    let subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    let tax = subtotal * TAX_RATE;
    let total = subtotal + tax;

    document.getElementById("subtotal").textContent = "$" + subtotal.toFixed(2);
    document.getElementById("tax").textContent = "$" + tax.toFixed(2);
    document.getElementById("total").textContent = "$" + total.toFixed(2);
}

function changeQty(index, delta) {
    let cart = getCart();

    cart[index].qty += delta;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);
    renderCart();
}

function renderCart() {
    let cart = getCart();
    const container = document.getElementById("cart-items");

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        updateTotals([]);
        return;
    }

    cart.forEach((item, index) => {
        container.innerHTML += `
            <div class="cart-item">
                <div class="cart-left">
                    <img src="${item.image}">
                    <div>
                        <strong>${item.name}</strong>
                        <p>$${item.price}</p>
                    </div>
                </div>

                <div class="qty-controls">
                    <button onclick="changeQty(${index}, -1)">−</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>
            </div>
        `;
    });

    updateTotals(cart);
}

renderCart();