// وقتی صفحه لود شد
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 سایت ایزوگام احمدی جاما لود شد!');
    
    // اجرای توابع اولیه
    initLoader();
    initAnimations();
    initScrollAnimations();
    initCounters();
    initTypingEffect();
    initHoverEffects();
    initCart();
    initMobileMenu();
    
    // نمایش تاریخ شمسی
    showPersianDate();
    
    // ردیابی آنالیتیکس
    initAnalytics();
});

// لودر
function initLoader() {
    const loader = document.querySelector('.loader');
    if(loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
}

// انیمیشن‌ها
function initAnimations() {
    // پارتیکل‌های پس‌زمینه
    createParticles();
    
    // انیمیشن کارت‌ها
    const cards = document.querySelectorAll('.feature-card, .product-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// پارتیکل‌ها
function createParticles() {
    const container = document.querySelector('.hero-bg');
    if(!container) return;
    
    for(let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // اندازه تصادفی
        const size = Math.random() * 100 + 50;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // موقعیت تصادفی
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // رنگ تصادفی
        const colors = [
            'rgba(37, 99, 235, 0.1)',
            'rgba(16, 185, 129, 0.1)',
            'rgba(245, 158, 11, 0.1)',
            'rgba(239, 68, 68, 0.1)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // انیمیشن تصادفی
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * -20;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}

// انیمیشن اسکرول
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // اگر المنت شمارنده دارد
                if(entry.target.classList.contains('stat-number')) {
                    const count = parseInt(entry.target.getAttribute('data-count'));
                    animateCounter(entry.target, count);
                }
            }
        });
    }, observerOptions);
    
    // مشاهده المنت‌ها
    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
    document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
}

// انیمیشن شمارنده
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const count = parseInt(counter.getAttribute('data-count'));
        animateCounter(counter, count);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if(current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// تایپینگ افکت
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if(!typingElement) return;
    
    const texts = [
        'ایزوگام دلیجان',
        'پشم شیشه درجه یک',
        'عایق رطوبتی',
        'سقف شیروانی'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if(isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if(!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if(isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    
    setTimeout(type, 1000);
}

// هاوور افکت‌ها
function initHoverEffects() {
    // هاوور روی کارت‌ها
    const cards = document.querySelectorAll('.feature-card, .product-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const hoverEffect = this.querySelector('.feature-hover');
            if(hoverEffect) {
                hoverEffect.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, transparent 70%)`;
            }
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const hoverEffect = this.querySelector('.feature-hover');
            if(hoverEffect) {
                hoverEffect.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, transparent 70%)`;
            }
        });
    });
    
    // هاوور روی دکمه‌ها
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const hoverEffect = this.querySelector('.btn-hover-effect');
            if(hoverEffect) {
                hoverEffect.style.left = `${x}px`;
                hoverEffect.style.top = `${y}px`;
            }
        });
    });
}

// سیستم سبد خرید
function initCart() {
    let cart = JSON.parse(localStorage.getItem('isogam-cart') || '[]');
    updateCartCount(cart);
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('isogam-cart') || '[]');
    
    const existingItem = cart.find(item => item.id === product.id);
    if(existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        });
    }
    
    localStorage.setItem('isogam-cart', JSON.stringify(cart));
    updateCartCount(cart);
    showNotification(`✅ ${product.name} به سبد خرید اضافه شد!`);
    
    // انیمیشن دکمه
    const button = event.target;
    button.classList.add('animate-pulse');
    setTimeout(() => button.classList.remove('animate-pulse'), 500);
}

function updateCartCount(cart) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if(cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function showCart() {
    const modal = document.getElementById('cartModal');
    if(modal) {
        modal.style.display = 'flex';
        updateCartModal();
    }
}

function updateCartModal() {
    const cart = JSON.parse(localStorage.getItem('isogam-cart') || '[]');
    const modalContent = document.querySelector('.modal-content');
    
    if(!modalContent) return;
    
    if(cart.length === 0) {
        modalContent.innerHTML = `
            <h3>🛒 سبد خرید</h3>
            <p style="text-align: center; padding: 40px;">سبد خرید شما خالی است</p>
            <button onclick="closeCart()" class="btn btn-primary">بستن</button>
        `;
    } else {
        let html = `<h3>🛒 سبد خرید شما</h3>`;
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            html += `
                <div class="cart-item">
                    <div>
                        <strong>${item.name}</strong>
                        <div>${item.quantity} × ${item.price.toLocaleString()} تومان</div>
                    </div>
                    <div>
                        <strong>${itemTotal.toLocaleString()} تومان</strong>
                    </div>
                </div>
            `;
        });
        
        html += `
            <div class="cart-total">
                <strong>مجموع:</strong>
                <strong>${total.toLocaleString()} تومان</strong>
            </div>
            <button onclick="checkout()" class="btn btn-primary">تکمیل خرید</button>
            <button onclick="closeCart()" class="btn btn-secondary">بستن</button>
        `;
        
        modalContent.innerHTML = html;
    }
}

function closeCart() {
    const modal = document.getElementById('cartModal');
    if(modal) modal.style.display = 'none';
}

function checkout() {
    showNotification('🚀 در حال انتقال به درگاه پرداخت...', 'info');
    setTimeout(() => {
        // شبیه‌سازی پرداخت
        showNotification('✅ پرداخت با موفقیت انجام شد!', 'success');
        localStorage.removeItem('isogam-cart');
        updateCartCount([]);
        closeCart();
    }, 2000);
}

// منوی موبایل
function initMobileMenu() {
    const menuBtn = document.querySelector('.btn-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if(menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // بستن منو با کلیک خارج
        document.addEventListener('click', function(e) {
            if(!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.style.display = 'none';
            }
        });
    }
}

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
            padding: 15px;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            color: white;
            margin: 20px 5% 40px;
            border-radius: 15px;
            font-weight: bold;
            font-size: 1.1rem;
            box-shadow: 0 10px 30px rgba(37, 99, 235, 0.2);
        `;
        
        const footer = document.querySelector('.footer .container');
        if(footer) {
            footer.prepend(dateElement);
        }
    } catch(e) {
        console.log('تاریخ فارسی نمایش داده نشد');
    }
}

// نمایش نوتیفیکیشن
function showNotification(message, type = 'success') {
    // حذف نوتیفیکیشن قبلی
    const oldNotif = document.querySelector('.notification');
    if(oldNotif) oldNotif.remove();
    
    // ایجاد نوتیفیکیشن جدید
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notif.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${colors[type] || colors.success};
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideInRight 0.4s, slideOutRight 0.4s 2.6s forwards;
        font-weight: 600;
        max-width: 400px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
    `;
    
    // اضافه کردن انیمیشن‌ها
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notif);
    
    // حذف خودکار
    setTimeout(() => {
        if(notif.parentNode) {
            notif.parentNode.removeChild(notif);
        }
    }, 3000);
}

// آنالیتیکس
function initAnalytics() {
    // ردیابی رویدادها
    document.addEventListener('click', function(e) {
        if(e.target.matches('.btn-buy, .btn-primary, .btn-secondary')) {
            console.log('کلیک روی دکمه:', e.target.textContent);
            // اینجا می‌تونی به Google Analytics وصل شی
        }
    });
    
    // ردیابی اسکرول
    let scrollPosition = 0;
    window.addEventListener('scroll', function() {
        const newPosition = window.scrollY;
        if(Math.abs(newPosition - scrollPosition) > 100) {
            console.log('کاربر در حال اسکرول است');
            scrollPosition = newPosition;
        }
    });
}

// ریپل افکت
document.addEventListener('click', function(e) {
    if(e.target.matches('.btn, .nav-link, .product-card')) {
        createRipple(e);
    }
});

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if(ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// فرم‌ها
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if(!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#10b981';
        }
    });
    
    return isValid;
}

function submitForm(formId) {
    const form = document.getElementById(formId);
    if(!form) return false;
    
    if(validateForm(form)) {
        showNotification('✅ فرم با موفقیت ارسال شد!', 'success');
        form.reset();
        return true;
    } else {
        showNotification('⚠️ لطفا تمام فیلدهای ضروری را پر کنید', 'warning');
        return false;
    }
}

// مدیریت تم (تاریک/روشن)
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    
    const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    showNotification(`تم ${theme === 'dark' ? 'تاریک' : 'روشن'} فعال شد`);
}

// بارگذاری تم ذخیره شده
const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

// تابع کمکی برای محصولات
const products = [
    {
        id: 1,
        name: 'ایزوگام سراپوش دلیجان کد ۱۴۳',
        price: 140500,
        features: ['ضد آب', 'مقاوم UV', 'عمر ۱۵ ساله'],
        badge: 'پرفروش'
    },
    {
        id: 2,
        name: 'ایزوگام شرق مشهد صادراتی',
        price: 154000,
        features: ['گرید صادراتی', 'ضد حریق', 'نصب آسان'],
        badge: 'صادراتی'
    },
    {
        id: 3,
        name: 'ایزوگام پشم شیشه دلیجان درجه ۱',
        price: 117000,
        features: ['عایق حرارتی', 'سبک وزن', 'قابلیت برش'],
        badge: 'جدید'
    },
    {
        id: 4,
        name: 'ایزوگام بام گستر دلیجان ثبت ۱۷',
        price: 135000,
        features: ['گارانتی ۱۰ ساله', 'مقاوم در برابر باد', 'ضد جلبک'],
        badge: 'گارانتی'
    }
];

// تولید محصولات
function generateProducts() {
    const container = document.querySelector('.products-grid');
    if(!container) return;
    
    let html = '';
    products.forEach((product, index) => {
        html += `
            <div class="product-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="product-icon">${getProductIcon(product.id)}</div>
                <span class="product-badge">${product.badge}</span>
                <h3>${product.name}</h3>
                <div class="product-features">
                    ${product.features.map(f => `<span>${f}</span>`).join('')}
                </div>
                <div class="product-price">
                    <span class="old-price">${(product.price * 1.1).toLocaleString()}</span>
                    <span class="current-price">${product.price.toLocaleString()} تومان</span>
                </div>
                <button class="btn btn-buy" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                    🛒 افزودن به سبد
                </button>
                <div class="feature-hover"></div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function getProductIcon(id) {
    const icons = ['🛡️', '🔥', '🧱', '🏠'];
    return icons[id - 1] || '📦';
}

// اجرای تابع تولید محصولات
generateProducts();

// بستن مدال با کلیک خارج
document.addEventListener('click', function(e) {
    const modal = document.getElementById('cartModal');
    if(modal && e.target === modal) {
        closeCart();
    }
});

// بستن مدال با کلید ESC
document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape') {
        closeCart();
    }
});

// اسموث اسکرول
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// آپدیت خودکار تاریخ
setInterval(showPersianDate, 60000); // هر دقیقه آپدیت کن
