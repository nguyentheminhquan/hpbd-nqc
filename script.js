// --- 1. XỬ LÝ LOADING & LANDING ---
window.addEventListener('load', () => {
    // Đợi 2 giây rồi ẩn màn hình loading
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const landingPage = document.getElementById('landing-page');
        
        if (loadingScreen) loadingScreen.classList.add('hidden');
        if (landingPage) landingPage.classList.remove('hidden');
    }, 2000);
});

// --- 2. KHAI BÁO CÁC BIẾN CHUNG (Chỉ khai báo 1 lần duy nhất) ---
const bgMusic = document.getElementById('bg-music');
const btnOpen = document.getElementById('btn-open');
const musicBtn = document.getElementById('music-control');
const flame = document.getElementById('flame');
const popup = document.getElementById('final-wish-popup');
const closeBtn = document.getElementById('btn-close-popup');
const finalContainer = document.getElementById('final-wish-container');

// --- 3. SỰ KIỆN MỞ QUÀ ---
btnOpen.addEventListener('click', () => {
    // Ẩn trang chào mừng, hiện nội dung chính
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    
    // Phát nhạc (xử lý lỗi tự động phát của trình duyệt)
    bgMusic.play().catch(error => console.log("Music error:", error));
    
    // Pháo hoa tưng bừng
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
});

// --- 4. ĐẾM XUÔI THỜI GIAN ---
// Ngày sinh: 18/01/2007 (Lưu ý: Tháng trong JS bắt đầu từ 0, nên tháng 1 là số 0)
const birthDate = new Date(2007, 0, 18, 0, 0, 0); 

function updateTimer() {
    const now = new Date();
    const diff = now - birthDate;
    if (isNaN(diff)) return; 

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    
    document.getElementById('timer').innerText = `${days} ngày ${hours} giờ ${mins} phút ${secs} giây`;
}
// Cập nhật đồng hồ mỗi giây
setInterval(updateTimer, 1000);

// --- 5. SLIDER ẢNH ---
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    if (slides.length === 0) return;
    slides.forEach(s => s.style.display = "none");
    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].style.display = "block";
}

document.querySelector('.next').onclick = () => showSlide(slideIndex + 1);
document.querySelector('.prev').onclick = () => showSlide(slideIndex - 1);
showSlide(0);

// --- 6. HỘP QUÀ & LỜI CHÚC ---
document.querySelectorAll('.gift-box').forEach(box => {
    box.onclick = function() {
        const wishText = this.getAttribute('data-wish');
        const container = document.getElementById('wish-container');
        
        const newCard = document.createElement('div');
        newCard.className = 'wish-card';
        newCard.innerHTML = `${wishText} ❤️`; 
        
        container.appendChild(newCard);
        this.classList.add('opened');
        
        confetti({ particleCount: 50, spread: 40, origin: { y: 0.8 } });
    };
});

// --- 7. THỔI NẾN & HIỆN POPUP SPOTLIGHT ---
flame.onclick = function() {
    this.style.display = 'none';
    confetti({ particleCount: 300, spread: 120, startVelocity: 40, origin: { y: 0.7 } });

    setTimeout(() => {
        popup.classList.remove('hidden');
    }, 500);
};

// --- 8. ĐÓNG POPUP & LƯU LỜI CHÚC XUỐNG DƯỚI ---
closeBtn.onclick = function() {
    popup.classList.add('hidden');
    
    // Lấy nội dung từ trong popup
    const wishTextContent = document.getElementById('final-wish-text').innerHTML;
    
    const wishCard = document.createElement('div');
    wishCard.className = 'final-wish-card'; 
    wishCard.innerHTML = `
        <h2 style="font-family: 'Dancing Script'; color: #d81b60;">Lời nhắn nhủ cuối cùng ❤️</h2>
        ${wishTextContent}
    `;
    
    finalContainer.innerHTML = ""; // Xóa trắng trước khi thêm để tránh bị lặp
    finalContainer.appendChild(wishCard);
    
    finalContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

// --- 9. ĐIỀU KHIỂN NHẠC ---
musicBtn.onclick = () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.innerText = "🎵"; 
    } else {
        bgMusic.pause();
        musicBtn.innerText = "🔇";
    }
};