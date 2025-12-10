// سبد خرید
let cart = [];

// بارگذاری سبد از localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('isogam-cart');
    if(savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// ذخیره سبد در localStorage
function saveCartToStorage() {
    localStorage.setItem('isogam-cart', JSON.stringify(cart));
}

// افزودن به سبد
function addToCart(productId) {
    const product = getProductById(productId);
    
    if(!product) {
        showMessage('error', 'محصول یافت نشد!');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if(existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        });
    }
    
    saveCartToStorage();
    updateCartCount();
    showMessage('success', 'محصول به سبد خرید اضافه شد!');
    
    // انیمیشن
    const button = event.target;
    button.classList.add('animate-shake');
    setTimeout(() => {
        button.classList.remove('animate-shake');
    }, 500);
}

// حذف از سبد
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartCount();
    showMessage('info', 'محصول از سبد خرید حذف شد!');
}

// آپدیت تعداد
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const countElement = document.querySelector('.cart-count');
    
    if(countElement) {
        countElement.textContent = cartCount;
        
        if(cartCount > 0) {
            countElement.style.display = 'flex';
        } else {
            countElement.style.display = 'none';
        }
    }
}

// نمایش سبد خرید
function showCart() {
    const cartModal = document.createElement('div');
    cartModal.className = 'cart-modal';
    cartModal.innerHTML = `
        <div class="cart-modal-content">
            <div class="cart-header">
                <h3>🛒 سبد خرید</h3>
                <button onclick="closeCart()" class="close-cart">×</button>
            </div>
            <div class="cart-items">
                ${cart.length > 0 ? 
                    cart.map(item => `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="cart-item-info">
                                <h4>${item.name}</h4>
                                <p>${item.price.toLocaleString()} تومان</p>
                            </div>
                            <div class="cart-item-actions">
                                <button onclick="updateQuantity(${item.id}, -1)">−</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                                <button onclick="removeFromCart(${item.id})" class="remove-btn">🗑️</button>
                            </div>
                        </div>
                    `).join('') : 
                    '<p class="empty-cart">سبد خرید خالی است</p>'
                }
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <strong>مجموع:</strong>
                    <span>${calculateTotal().toLocaleString()} تومان</span>
                </div>
                <button onclick="checkout()" class="btn-checkout" ${cart.length === 0 ? 'disabled' : ''}>
                    ادامه فرآیند خرید
                </button>
            </div>
        </div>
    `;
    
    // استایل مدال
    const style = document.createElement('style');
    style.textContent = `
        .cart-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: flex-end;
            z-index: 1001;
        }
        .cart-modal-content {
            width: 400px;
            max-width: 90%;
            height: 100%;
            background: white;
            padding: 20px;
            overflow-y: auto;
        }
        .cart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #eee;
        }
        .close-cart {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
        }
        .cart-item {
            display: flex;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #eee;
        }
        .cart-item img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 8px;
            margin-left: 10px;
        }
        .empty-cart {
            text-align: center;
            padding: 40px;
            color: #666;
        }
        .btn-checkout {
            width: 100%;
            padding: 15px;
            background: #10b981;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            margin-top: 20px;
        }
        .btn-checkout:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(cartModal);
}

// بستن سبد خرید
function closeCart() {
    const modal = document.querySelector('.cart-modal');
    if(modal) {
        modal.remove();
    }
}

// محاسبه مجموع
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// اطلاعات محصولات (دمو)
function getProductById(id) {
    const products = {
        1: { name: "ایزوگام سراپوش دلیجان کد ۱۴۳", price: 140500, image: "images/products/isogam-1.jpg" },
        2: { name: "ایزوگام شرق مشهد صادراتی", price: 154000, image: "images/products/isogam-2.jpg" },
        3: { name: "ایزوگام پشم شیشه دلیجان درجه ۱", price: 117000, image: "images/products/isogam-3.jpg" },
        4: { name: "ایزوگام بام گستر دلیجان ثبت ۱۷", price: 135000, image: "images/products/isogam-4.jpg" }
    };
    return products[id];
}
