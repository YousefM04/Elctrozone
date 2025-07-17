document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function addToCart(name, price, image) {
        let existingProduct = cart.find(item => item.name === name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }
        saveCart();
        alert("تمت إضافة المنتج إلى العربة!");
    }

    function renderCart() {
        let cartContainer = document.getElementById("cart-items");
        let totalPriceElement = document.getElementById("total-price");

        if (!cartContainer || !totalPriceElement) return;

        cartContainer.innerHTML = "";
        let totalPrice = 0;

        cart.forEach(item => {
            let itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>الكمية: ${item.quantity}</p>
                </div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-item" data-name="${item.name}">إزالة</button>
            `;
            cartContainer.appendChild(itemElement);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                let name = this.getAttribute("data-name");
                cart = cart.filter(item => item.name !== name);
                saveCart();
                renderCart();
            });
        });
    }

    if (document.getElementById("cart-items")) {
        renderCart();
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let productCard = this.closest(".product-card");
            let name = productCard.querySelector(".product-name").innerText;
            let price = parseFloat(productCard.querySelector(".product-price").innerText.replace("$", ""));
            let image = productCard.querySelector("img").src;
            addToCart(name, price, image);
        });
    });
});
