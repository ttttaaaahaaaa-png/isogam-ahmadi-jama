// وقتی صفحه لود شد
document.addEventListener('DOMContentLoaded', function() {
    console.log('سایت ایزوگام بارگذاری شد');
    
    // نمایش تاریخ
    showDate();
});

// نمایش تاریخ امروز
function showDate() {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = date.toLocaleDateString('fa-IR', options);
    
    const dateElement = document.createElement('div');
    dateElement.style.cssText = `
        text-align: center;
        background: #dbeafe;
        color: #1e40af;
        padding: 10px;
        margin: 10px 20px;
        border-radius: 8px;
        font-weight: bold;
    `;
    dateElement.textContent = '📅 ' + dateString;
    
    const footer = document.querySelector('footer');
    if(footer) {
        footer.prepend(dateElement);
    }
}

// خرید محصول
function buyProduct(id) {
    const products = {
        1: 'ایزوگام دلیجان کد ۱۴۳',
        2: 'ایزوگام مشهد صادراتی',
        3: 'پشم شیشه دلیجان',
        4: 'ایزوگام بام گستر'
    };
    
    const productName = products[id];
    
    // نمایش پیام
    showMessage(productName + ' به سبد خرید اضافه شد! ✅', 'success');
    
    // ذخیره در localStorage
    let cart = JSON.parse(localStorage.getItem('isogamCart') || '[]');
    cart.push({id: id, name: productName, time: new Date()});
    localStorage.setItem('isogamCart', JSON.stringify(cart));
    
    // انیمیشن دکمه
    const button = event.target;
    button.textContent = '✅ اضافه شد';
    button.style.background = '#059669';
    
    setTimeout(() => {
        button.textContent = 'خرید';
        button.style.background = '';
    }, 1500);
}

// نمایش پیام
function showMessage(text, type) {
    // حذف پیام قبلی
    const oldMsg = document.querySelector('.message');
    if(oldMsg) oldMsg.remove();
    
    // ایجاد پیام جدید
    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = text;
    
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: slideIn 0.3s;
    `;
    
    document.body.appendChild(message);
    
    // حذف خودکار
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s';
        setTimeout(() => message.remove(), 300);
    }, 3000);
    
    // اضافه کردن انیمیشن‌ها
    addAnimationStyles();
}

// اضافه کردن استایل انیمیشن
function addAnimationStyles() {
    if(!document.querySelector('#animStyles')) {
        const style = document.createElement('style');
        style.id = 'animStyles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// نمایش سبد خرید
function showCart() {
    const cart = JSON.parse(localStorage.getItem('isogamCart') || '[]');
    
    if(cart.length === 0) {
        showMessage('سبد خرید خالی است!', 'info');
        return;
    }
    
    let cartText = '🛒 سبد خرید شما:\n\n';
    cart.forEach((item, index) => {
        cartText += `${index + 1}. ${item.name}\n`;
    });
    
    alert(cartText);
}
