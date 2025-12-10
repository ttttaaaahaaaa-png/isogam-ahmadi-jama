// وقتی صفحه لود شد
window.onload = function() {
    console.log("سایت ایزوگام احمدی جاما آماده است!");
    
    // نمایش تاریخ
    showDate();
    
    // لود سبد خرید
    loadCart();
};

// نمایش تاریخ
function showDate() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('fa-IR');
    const dateElement = document.createElement('div');
    dateElement.style.cssText = `
        text-align: center;
        padding: 10px;
        background: #f0f9ff;
        color: #0369a1;
        margin: 10px;
        border-radius: 5px;
    `;
    dateElement.innerHTML = `📅 امروز: ${dateStr}`;
    document.querySelector('footer').prepend(dateElement);
}

// سبد خرید
let cart = [];

function loadCart() {
    const saved = localStorage.getItem('isogamCart');
    if(saved) cart = JSON.parse(saved);
}

function saveCart() {
    localStorage.setItem('isogamCart', JSON.stringify(cart));
}

function addToCart(id) {
    const products = {
        1: {name: "ایزوگام دلیجان", price: 140500},
        2: {name: "ایزوگام مشهد", price: 154000},
        3: {name: "پشم شیشه", price: 117000},
        4: {name: "ایزوگام بام", price: 135000}
    };
    
    cart.push(products[id]);
    saveCart();
    
    alert(`✅ ${products[id].name} به سبد اضافه شد!`);
    
    // انیمیشن
    const btn = event.target;
    btn.style.background = '#059669';
    btn.textContent = '✓ اضافه شد';
    setTimeout(() => {
        btn.style.background = '';
        btn.textContent = 'خرید';
    }, 1500);
}

// نمایش پیام
function showMsg(text, type = 'success') {
    const msg = document.createElement('div');
    msg.textContent = text;
    msg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1000;
        animation: slideIn 0.3s;
    `;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
}

// انیمیشن CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .product {
        transition: transform 0.3s;
    }
    
    .product:hover {
        transform: translateY(-5px);
    }
`;
document.head.appendChild(style);