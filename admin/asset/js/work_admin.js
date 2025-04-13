function logAdminAction(action) {
    const now = new Date();
    const time = now.toLocaleString('vi-VN');
    const logEntry = `${time} - ${action}`;
    let logs = JSON.parse(localStorage.getItem("adminLogs")) || [];
    logs.unshift(logEntry); // mới nhất ở đầu
    localStorage.setItem("adminLogs", JSON.stringify(logs));
}
function renderAdminLogs() {
    const logs = JSON.parse(localStorage.getItem("adminLogs")) || [];
    if (logs.length === 0) return `<h2>Thông tin Admin</h2><p>Chưa có hoạt động nào được ghi nhận.</p>`;

    let logHtml = `
        <h2>Hồ sơ hoạt động Admin</h2>
        <p><strong>Lịch sử hoạt động:</strong></p>
        <ul class="list-group">
            ${logs.map(log => `<li class="list-group-item">${log}</li>`).join('')}
        </ul>
    `;
    return logHtml;
}

function clearAdminLogs() {
    if (confirm("Bạn có chắc muốn xóa toàn bộ lịch sử hoạt động không?")) {
        localStorage.removeItem("adminLogs");
        document.querySelector(".content_admin").innerHTML = renderAdminLogs();
    }
}
