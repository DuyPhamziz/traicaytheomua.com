// Lấy ra Element của trang 
const formRegister = document.getElementById("register-form");
const user = document.getElementById("name");
const fname = document.getElementById("fullname");
const phone = document.getElementById("phone");
// Địa chỉ
const city = document.getElementById("city");
const district = document.getElementById("district");
const ward = document.getElementById("ward");


const password = document.getElementById("pass");
const repassword = document.getElementById("re_pass");

// Lổi
const userError = document.getElementById("userError");
const fnameError = document.getElementById("fnameError");
const phoneError = document.getElementById("phoneError");
const addError = document.getElementById("addError");
const passError = document.getElementById("passError");
const repassError = document.getElementById("repassError");
const repassError2 = document.getElementById("repassError2");

// Lấy dữ diệu từ localStorage

const userLocal = JSON.parse(localStorage.getItem("users")) || [];

// Lắng nghe sự kiện submit form đăng ký tài khoản
formRegister.addEventListener("submit", async function (e) {
    // Ngăn chặn sự kiện relaod trang
    e.preventDefault();
    let isValid = true;
    // Validate dữ liệu
    const username = user.value.trim();
    if (!username || username.length <= 3 || username.length >= 12) {
        userError.style.display = "block";
        isValid = false;
    } else userError.style.display = "none";
    const nameValue = fname.value.trim();
    const nameRegex = /^[A-Za-zÀ-ỹ\s]{3,}$/;
    if (!nameValue || !nameRegex.test(nameValue)) {
        fnameError.style.display = "block";
    } else {
        fnameError.style.display = "none";
    }

    const phoneValue = phone.value.trim();
    const phoneRegex = /^(0|\+84)[0-9]{9}$/;

    if (!phoneValue || !phoneRegex.test(phoneValue)) {
        phoneError.style.display = "block";
        isValid = false;
    } else {
        phoneError.style.display = "none";
    }

    if (!city.value || !district.value || !ward.value) {
        addError.style.display = "block";
        isValid = false;
    } else {
        addError.style.display = "none";
    }
    const passwordValue = password.value.trim();
    if (!passwordValue || passwordValue.length < 8) {
        passError.style.display = "block";
        isValid = false;
    } else {
        passError.style.display = "none";
    }
    const rePasswordValue = repassword.value.trim();
    if (!rePasswordValue) {
        repassError.style.display = "block";
        isValid = false;
    } else if (passwordValue != rePasswordValue) {
        repassError2.style.display = "block";
        isValid = false;
    } else {
        repassError.style.display = "none";
    }



    if (isValid) {
        // Hàm băm mật khẩu sử dụng SHA-256
        async function hashPassword(password) {
            const encoder = new TextEncoder();
            const data = encoder.encode(password);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            return hashHex;
        }
        const hashedPassword = await hashPassword(passwordValue);
        const userRegister = {
            userID: Math.floor(Math.random() * 1000000000) + 1,
            userName: user.value,
            userPhone: phone.value,
            userFullName: fname.value,
            userAddress: {
                city: city.value,
                district: district.value,
                ward: ward.value
            },
            userPassword: hashedPassword
        };

        // Push user vào mảng userLocal
        userLocal.push(userRegister);

        // Lưu trữ lên LocalStorage
        localStorage.setItem("users", JSON.stringify(userLocal));

        setTimeout(function () {
            window.location.href = "dangnhap.html";
            alert("Đăng ký thành công!");
        }, 1000);


    }
});