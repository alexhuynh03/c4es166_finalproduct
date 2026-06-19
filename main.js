// --- 1. TÍNH NĂNG CUỘN MƯỢT BÙ TRỪ KHOẢNG CÁCH NAVBAR ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Bỏ qua nếu là dấu # trống mặc định
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Tự động đo độ cao thực tế của thanh điều hướng (navbar) tại thời điểm click
            const navbar = document.querySelector('nav');
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            
            // Tính toán vị trí đích chính xác sau khi đã trừ đi độ cao của navbar
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

            // Thực hiện cuộn mượt mà đến vị trí đã tính toán
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// --- 2. HIỆU ỨNG XUẤT HIỆN KHI CUỘN TRANG (INTERSECTION OBSERVER) ---
const observerOptions = {
    threshold: 0.1 // Kích hoạt hiệu ứng ngay khi phần tử lộ diện 10% trên màn hình
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Thêm các class hiệu ứng động của Tailwind CSS
            entry.target.classList.add(
                'animate-in', 
                'fade-in', 
                'slide-in-from-bottom-8', 
                'duration-700'
            );
            // Hủy theo dõi phần tử này sau khi hiệu ứng đã chạy xong một lần
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Theo dõi và tạo hiệu ứng cho tất cả các khối bao ngoài trực thuộc thẻ <section>
document.querySelectorAll('section > div').forEach(el => observer.observe(el));