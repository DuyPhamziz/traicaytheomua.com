window.addEventListener("load", function () {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const adminExists = users.some(user => user.userName === "admin");

    if (!adminExists) {
        const adminUser = {
            userID: Date.now(),
            userName: "admin",
            userPassword: CryptoJS.SHA256("admin123").toString(),
            userFullName: "Quản trị viên",
            userPhone: "0900000000",
            userAddress: {
                city: "01",
                district: "001",
                ward: "00001"
            },
            role: "admin"
        };

        users.push(adminUser);
        localStorage.setItem("users", JSON.stringify(users));
        console.log("Admin user added.");
    }
});
