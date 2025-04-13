// Lấy dữ liệu đăng nhập của User
const frmdangnhap = document.getElementById("frmdangnhap");
const username = document.getElementById("username");
const userpass = document.getElementById("userpass");
const signInError = document.getElementById("signInError");


frmdangnhap.addEventListener("submit", function (e) {

    e.preventDefault();
    const userLocal = JSON.parse(localStorage.getItem("users")) || [];
    const passHash = CryptoJS.SHA256(userpass.value).toString();
    const findUser = userLocal.find(user => user.userName === username.value && user.userPassword === passHash);

    if (!findUser) {
        signInError.style.display = "block";

    } else {
        localStorage.setItem("currentUser", JSON.stringify(findUser));
        if (findUser.role?.toLowerCase() === "admin") {
            setTimeout(function () {
                window.location.href = "/admin/quantri.html";
            }, 1000);
        } else {
            setTimeout(function () {
                window.location.href = "/user/index.html";
            }, 1000);
        }


    }


});
