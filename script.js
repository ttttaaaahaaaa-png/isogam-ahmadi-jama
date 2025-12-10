// وقتی صفحه لود شد
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 سایت ایزوگام احمدی جاما لود شد!');
    
    // بارگذاری سبد خرید
    loadCart();
    
    // نمایش تاریخ شمسی
    showPersianDate();
    
    // انیمیشن اسکرول
    initScrollAnimations();
    
    // ردیابی کلیک‌ها برای آنالیتیکس
    initClickTracking();
});

// نمایش تاریخ شمسی
function showPersianDate() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    };
    
    try {
        const persianDate = now.toLocaleDateString('fa-IR', options);
        const dateElement = document.createElement('div');
        dateElement.className = 'persian-date';
        dateElement.innerHTML = `📅 ${persianDate}`;
        dateElement.style.cssText = `
            text-align: center;
            padding: 12px;
            background: linear-gradient(45deg, #2563eb, #1d4ed8);
            color: white;
            margin: 20px 0;
            border-radius: 10px;
            font-weight: bold;
            font-size: 1.1rem;
        `;
        
        const footer = document.querySelector('.footer .container');
        if(footer) {
            footer.prepend(dateElement);
        }
    } catch(e) {
        console.log('تاریخ فارسی نمایش داده نشد');
    }
}

// انیمیشن اسکرول
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.product-card, .section-title').forEach(el => {
        observer.observe(el);
    });
}

// ردیابی کلیک
function initClickTracking() {
    document.addEventListener('click', function(e) {
        if(e.target.matches('.btn-buy, .btn-primary, .btn-secondary')) {
            console.log('کلیک روی دکمه:', e.target.textContent);
        }
    });
}

// مدیریت سبد خرید
let cart = [];

function loadCart() {
    const savedCart = localStorage.getItem('isogamCart');
    if(savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

function saveCart() {
    localStorage.setItem('isogamCart', JSON.stringify(cart));
}

function addToCart(productId) {
    const products = {
        1: { name: "ایزوگام دلیجان کد ۱۴۳", price: 140500 },
        2: { name: "ایزوگام مشهد صادراتی", price: 154000 },
        3: { name: "پشم شیشه دلیجان درجه ۱", price: 117000 },
        4: { name: "ایزوگام بام گستر دلیجان", price: 135000 }
    };
    
    const product = products[productId];
    const existingItem = cart.find(item => item.id === productId);
    
    if(existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1,
            date: new Date().toISOString()
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification(`✅ ${product.name} به سبد خرید اضافه شد!`);
    
    // انیمیشن دکمه
    const button = event.target;
    button.classList.add('animate-shake');
    button.innerHTML = '✅ اضافه شد';
    button.style.background = 'linear-gradient(45deg, #059669, #10b981)';
    
    setTimeout(() => {
        button.classList.remove('animate-shake');
        button.innerHTML = '🛒 افزودن به سبد';
        button.style.background = '';
    }, 1500);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBtn = document.querySelector('.btn-cart');
    
    if(cartBtn && totalItems > 0) {
        cartBtn.innerHTML = `🛒 سبد خرید (${totalItems})`;
    }
}

function showCart() {
    const modal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    
    if(cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #64748b;">سبد خرید خالی است</p>';
    } else {
        let html = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            html += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                    <div>
                        <strong>${item.name}</strong>
                        <div style="font-size: 0.9rem; color: #64748b;">
                            ${item.quantity} × ${item.price.toLocaleString()} تومان
                        </div>
                    </div>
                    <div style="font-weight: bold; color: #059669;">
                        ${itemTotal.toLocaleString()} تومان
                    </div>
                </div>
            `;
        });
        
        html += `
            <div style="display: flex; justify-content: space-between; padding: 15px 0; border-top: 2px solid #2563eb; margin-top: 10px;">
                <strong>مجموع:</strong>
                <strong style="color: #2563eb; font-size: 1.2rem;">${total.toLocaleString()} تومان</strong>
            </div>
        `;
        
        cartItems.innerHTML = html;
    }
    
    modal.style.display = 'flex';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// کلیک خارج از مدال
document.addEventListener('click', function(e) {
    const modal = document.getElementById('cartModal');
    if(e.target === modal) {
        closeCart();
    }
});

// نمایش نوتیفیکیشن
function showNotification(message, type = 'success') {
    // حذف نوتیفیکیشن قبلی
    const oldNotif = document.querySelector('.notification');
    if(oldNotif) oldNotif.remove();
    
    // ایجاد نوتیفیکیشن جدید
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideInRight 0.3s;
        font-weight: 600;
        max-width: 400px;
    `;
    
    document.body.appendChild(notif);
    
    // حذف خودکار
    setTimeout(() => {
        notif.style.animation = 'slideInRight 0.3s reverse forwards';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// فرم تماس
function submitContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // شبیه‌سازی ارسال
    showNotification('📩 پیام شما با موفقیت ارسال شد! به زودی با شما تماس می‌گیریم.', 'success');
    
    // رزت فرم
    setTimeout(() => {
        form.reset();
    }, 1000);
    
    return false;
}

// جستجو
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    if(searchInput) {
        const query = searchInput.value.trim();
        if(query.length > 0) {
            showNotification(`🔍 جستجو برای: ${query}`);
            // در حالت واقعی، اینجا محصولات فیلتر می‌شوند
        }
    }
}

// کلید Enter برای جستجو
document.addEventListener('keypress', function(e) {
    if(e.key === 'Enter' && e.target.matches('#searchInput')) {
        searchProducts();
    }
});
