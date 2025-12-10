// وقتی صفحه لود شد
document.addEventListener('DOMContentLoaded', function() {
    console.log('سایت ایزوگام احمدی جاما لود شد!');
    
    // منوی همبرگری برای موبایل
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const header = document.querySelector('.header .container');
    if (window.innerWidth <= 768) {
        header.appendChild(menuToggle);
        
        menuToggle.addEventListener('click', function() {
            const nav = document.querySelector('.nav');
            nav.classList.toggle('active');
        });
    }
    
    // اسکرول نرم
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // انیمیشن اسکرول
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if(elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // اجرای اولیه
    
    // نمایش تاریخ امروز
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateElement = document.createElement('div');
    dateElement.className = 'current-date';
    dateElement.innerHTML = `📅 امروز: ${today.toLocaleDateString('fa-IR', options)}`;
    document.querySelector('.footer .container').prepend(dateElement);
    
    // بارگذاری محصولات از localStorage
    loadCartFromStorage();
});

// نمایش پیام
function showMessage(type, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.innerHTML = text;
    
    // استایل پیام
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 30px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        animation: slideDown 0.3s ease-out;
    `;
    
    if(type === 'success') {
        messageDiv.style.background = '#10b981';
    } else if(type === 'error') {
        messageDiv.style.background = '#ef4444';
    } else if(type === 'info') {
        messageDiv.style.background = '#3b82f6';
    }
    
    document.body.appendChild(messageDiv);
    
    // حذف خودکار پیام
    setTimeout(() => {
        messageDiv.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// انیمیشن‌های CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { top: -100px; opacity: 0; }
        to { top: 20px; opacity: 1; }
    }
    @keyframes slideUp {
        from { top: 20px; opacity: 1; }
        to { top: -100px; opacity: 0; }
    }
`;
document.head.appendChild(style);
