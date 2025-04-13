const listImage = document.querySelector('.list-images');
const imgs = document.getElementsByTagName('img');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
const length = imgs.length;
let current = 0;
let width = imgs[0].offsetWidth; // Tính chiều rộng một lần

// Cập nhật slide
const updateSlide = () => {
    listImage.style.transform = `translateX(${width * -1 * current}px)`;
    document.querySelector('.active').classList.remove('active');
    document.querySelector(`.index-item-${current}`).classList.add('active');
}

// Chuyển slide tự động
const handleChangeSlide = () => {
    current = (current + 1) % length; // Nếu đi quá ảnh cuối, quay lại ảnh đầu
    updateSlide();
}

// Chuyển slide tự động mỗi 4 giây
let handleEventChangeSlide = setInterval(handleChangeSlide, 4000);

// Khi nhấn nút phải
btnRight.addEventListener('click', () => {
    clearInterval(handleEventChangeSlide); // Dừng tự động
    handleChangeSlide(); // Chuyển slide
    handleEventChangeSlide = setInterval(handleChangeSlide, 4000); // Khởi động lại tự động
});

// Khi nhấn nút trái
btnLeft.addEventListener('click', () => {
    clearInterval(handleEventChangeSlide); // Dừng tự động
    current = (current - 1 + length) % length; // Đảm bảo chỉ số current không âm
    updateSlide(); // Cập nhật slide
    handleEventChangeSlide = setInterval(handleChangeSlide, 4000); // Khởi động lại tự động
});
