document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Product Data
    const products = [
        {
            id: 1,
            name: 'Rose Glow Serum',
            price: 29.99,
            image: '/api/placeholder/250/200',
            badge: 'Bestseller'
        },
        {
            id: 2,
            name: 'Gentle Cleansing Milk',
            price: 24.99,
            image: '/api/placeholder/250/200',
            badge: 'New'
        },
        {
            id: 3,
            name: 'Hydrating Face Cream',
            price: 34.99,
            image: '/api/placeholder/250/200'
        },
        {
            id: 4,
            name: 'Detox Clay Mask',
            price: 27.99,
            image: '/api/placeholder/250/200'
        }
    ];

    // Display Products
    const productsGrid = document.getElementById('productsGrid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="btn product-button" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Shopping Cart
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.overlay');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartCount = document.querySelector('.cart-count');
    
    let cart = [];

    // Toggle Cart
    cartIcon.addEventListener('click', function() {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    });

    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Add to Cart
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('product-button')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        }
    });

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCart();
    }

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <div class="quantity-btn minus" data-id="${item.id}">-</div>
                        <span>${item.quantity}</span>
                        <div class="quantity-btn plus" data-id="${item.id}">+</div>
                    </div>
                    <div class="remove-item" data-id="${item.id}">Remove</div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
            
            total += item.price * item.quantity;
        });
        
        cartTotal.innerHTML = `
            <div class="total-row">
                <span>Subtotal</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <div class="total-row">
                <span>Shipping</span>
                <span>Free</span>
            </div>
            <div class="total-row">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        `;
        
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Cart Item Quantity
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quantity-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            
            if (e.target.classList.contains('plus')) {
                item.quantity += 1;
            } else if (e.target.classList.contains('minus') && item.quantity > 1) {
                item.quantity -= 1;
            }
            
            updateCart();
        }
        
        if (e.target.classList.contains('remove-item')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        }
    });

    // Testimonial Slider
    const testimonialContainer = document.getElementById('testimonialContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial');
    
    function updateSlider() {
        testimonialContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    });
    
    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Form submission would go here
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.style.display = 'none';
            }
        });
    });

    // Responsive Nav
    function handleResize() {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
});
