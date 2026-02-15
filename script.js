document.addEventListener('DOMContentLoaded', () => {
    // Cart functionality
    const cartIcon = document.getElementById('cart-icon');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCart = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalAmount = document.getElementById('cart-total-amount');

    let cart = [];

    function toggleCart() {
        cartDrawer.classList.toggle('open');
        cartOverlay.classList.toggle('show');
    }

    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCart();
    });

    closeCart.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price'));

            addItemToCart(name, price);
            updateCartUI();

            // Open cart drawer when item is added
            if (!cartDrawer.classList.contains('open')) {
                toggleCart();
            }
        });
    });

    function addItemToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
    }

    function updateCartUI() {
        // Update count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Update items list
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-msg">Your bag is currently empty.</p>';
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.quantity} x $${item.price.toFixed(2)}</p>
                    </div>
                </div>
            `).join('');
        }

        // Update total
        const totalValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalAmount.textContent = `$${totalValue.toFixed(2)}`;
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const msg = document.getElementById('form-message');
            msg.textContent = "Thank you. Our concierge will contact you shortly.";
            msg.style.color = "#c5a059";
            msg.style.marginTop = "1rem";
            msg.style.fontWeight = "700";
            this.reset();
        });
    }

    // Newsletter handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert("Thank you for joining the Inner Circle!");
            this.reset();
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
