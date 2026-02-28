function placeOrder() {
    alert("Order placed successfully 🌸\nThank you for shopping with Floré!");

    /* Clear cart after order */
    localStorage.removeItem("cart");

    /* Redirect if you want */
    window.location.href = "index.html"; // change if needed
}