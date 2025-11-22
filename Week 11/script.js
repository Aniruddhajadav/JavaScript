document.addEventListener('DOMContentLoaded', () => {

    // --- "Add to Cart" Button Interaction ---
    const mainCartCountElement = document.getElementById('cart-count'); // Nav bar count
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalCountElement = document.getElementById('cart-total-count'); // Summary count
    const cartTotalPriceElement = document.getElementById('cart-total-price'); // Summary total price
    const cartButtons = document.querySelectorAll('.btn');
    const shoppingCartIcon = document.querySelector('.shopping-cart');
    const clearCartBtn = document.getElementById('clear-cart-btn');

    // Load cart from localStorage or initialize as an empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const btn = e.target;
            const itemElement = btn.closest('.card');
            const itemId = itemElement.dataset.id;
            const itemName = itemElement.querySelector('.product-title').textContent;
            const itemPrice = parseFloat(itemElement.dataset.price);

            // Check if the item is already added
            const itemInCart = cartItems.find(item => item.id === itemId);

            if (itemInCart) { // If item exists, increment quantity
                itemInCart.quantity++;
            } else {
                // --- ADD TO CART ---
                cartItems.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1 });
            }

            btn.classList.add('added');
            btn.textContent = 'Added ✓';

            // Revert button text after a short delay for user feedback
            setTimeout(() => {
                btn.textContent = 'Add to Cart';
                btn.classList.remove('added');
            }, 1500);

            updateCart();
        });
    });

    function updateCart() {
        // Save cart to localStorage
        saveCart();

        // Animate cart icon
        animateCartIcon();

        // Clear current cart summary
        cartItemsContainer.innerHTML = '';

        let totalPrice = 0;
        let totalItems = 0;

        // Re-render cart summary
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
            totalItems += item.quantity;

            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <div class="cart-item-details">
                    <span style="font-weight: bold;">${item.name}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
                <button class="remove-btn" data-id="${item.id}" title="Remove item">&times;</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        // Update cart counts
        mainCartCountElement.textContent = totalItems;
        if(cartTotalCountElement) {
            cartTotalCountElement.textContent = totalItems;
        }
        if (cartTotalPriceElement) {
            cartTotalPriceElement.textContent = totalPrice.toFixed(2);
        }

        // Add event listeners to new "Remove" buttons
        addRemoveButtonListeners();
        addQuantityButtonListeners();

        // Show or hide the clear button based on if the cart has items
        if (clearCartBtn) {
            clearCartBtn.style.display = cartItems.length > 0 ? 'block' : 'none';
        }
    }

    function saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function animateCartIcon() {
        shoppingCartIcon.classList.add('updated');
        setTimeout(() => {
            shoppingCartIcon.classList.remove('updated');
        }, 400);
    }

    // Initial cart render on page load
    updateCart();

    function addRemoveButtonListeners() {
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemIdToRemove = e.target.dataset.id;
                cartItems = cartItems.filter(item => item.id !== itemIdToRemove);

                // Note: We are not resetting the main product button state here,
                // as it now acts as an "add more" button.
                updateCart();
            });
        });
    }

    function addQuantityButtonListeners() {
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.dataset.id;
                const itemInCart = cartItems.find(item => item.id === itemId);

                if (itemInCart) {
                    if (e.target.classList.contains('increase')) {
                        itemInCart.quantity++;
                    } else if (e.target.classList.contains('decrease')) {
                        itemInCart.quantity--;
                        // If quantity drops to 0, remove the item
                        if (itemInCart.quantity <= 0) {
                            cartItems = cartItems.filter(item => item.id !== itemId);
                        }
                    }
                }
                updateCart();
            });
        });
    }

    // --- Clear Cart Logic ---
    clearCartBtn.addEventListener('click', () => {
        // Ask for confirmation before clearing
        if (confirm('Are you sure you want to clear all items from your cart?')) {
            cartItems = []; // Empty the array
            updateCart();   // Update UI and localStorage
        }
    });


    // --- "Like" Icon Interaction ---
    const likeIcons = document.querySelectorAll('.like-icon');

    likeIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            icon.classList.toggle('liked');
        });
    });

    // --- Dark Mode Theme Switcher ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme in localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // --- Cart Modal Logic ---
    const cartModal = document.getElementById('cart-modal');
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeBtn = document.querySelector('.close-btn');

    // Function to open the modal
    openCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    // Function to close the modal
    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Close the modal if the user clicks outside of the modal content
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
});