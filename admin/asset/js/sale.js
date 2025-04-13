function renderSaleProductList() {
    const listContainer = document.getElementById("danhsach-sanpham");
    const searchInput = document.getElementById("search-input");
    const filterCategory = document.getElementById("filter-category");

    if (!listContainer) return;

    let products = JSON.parse(localStorage.getItem("product_fruit")) || [];  // Lấy danh sách sản phẩm từ localStorage

    // Lọc theo tìm kiếm
    let searchTerm = searchInput.value.toLowerCase();
    let filteredProducts = products.filter(p => p.tensp.toLowerCase().includes(searchTerm));

    // Lọc theo danh mục
    let selectedCategory = filterCategory.value;
    if (selectedCategory) {
        filteredProducts = filteredProducts.filter(p => p.danhmuc.includes(selectedCategory));
    }

    // Phân trang
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    // Hiển thị sản phẩm

    listContainer.innerHTML = paginatedProducts.map((p, index) => {
        // Tính phần trăm giảm
        let percentGiam = 0;
        const goc = parseFloat(p.giagoc.replace(/\./g, '').replace(/[^\d]/g, '')) / 1000;
        const giam = parseFloat(p.giadagiam.replace(/\./g, '').replace(/[^\d]/g, '')) / 1000;

        if (goc > giam) {
            percentGiam = Math.round((1 - giam / goc) * 100);
        }
        return `
        <div class="col-md-4 mb-3">
            <div class="card">
                <img src="${p.hinh}" class="card-img-top" alt="${p.tensp}">
                <div class="card-body">
                    <h5 class="card-title">${p.tensp}</h5>
                    <p class="card-text">
                        Giá gốc: ${p.giagoc}<br>
                        Giá đã giảm: ${p.giadagiam}<br>
                        ${percentGiam > 0 ? `<strong class="text-danger">Đã giảm: ${percentGiam}%</strong><br>` : ''}
                        Danh mục: ${p.danhmuc.join(', ')}
                    </p>
                    <div>
                        <input type="number" id="discount-percent" class="form-control mb-2" placeholder="Nhập % giảm giá" />
                        <button class="btn btn-success btn-sm me-2" onclick="applySale(${index}, parseFloat(document.getElementById('discount-percent').value))">Áp dụng giảm giá</button>
                        <button class="btn btn-danger btn-sm" onclick="cancelSale(${index})">Hủy giảm giá</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    }).join('');

    // Cập nhật phân trang
    renderPagination(totalPages);
}
function applySale(index, discountPercent) {
    if (isNaN(discountPercent) || discountPercent <= 0 || discountPercent > 100) {
        alert("Vui lòng nhập phần trăm giảm giá hợp lệ (từ 1 đến 100).");
        return;
    }

    let products = JSON.parse(localStorage.getItem("product_fruit")) || [];

    // Lấy sản phẩm từ mảng
    let product = products[index];

    // Tính toán giá đã giảm
    let originalPrice = parseFloat(product.giagoc.replace(/\./g, '').replace(/[^\d]/g, ''));

    let discountAmount = (discountPercent / 100) * originalPrice;
    let newPrice = originalPrice - discountAmount;

    // Cập nhật giá đã giảm
    product.giadagiam = newPrice.toLocaleString('vi-VN') + " VNĐ";

    // Lưu lại vào localStorage
    products[index] = product;
    localStorage.setItem("product_fruit", JSON.stringify(products));

    alert(`Giảm giá ${discountPercent}% đã được áp dụng. Giá mới: ${product.giadagiam}`);
    logAdminAction(`Áp dụng giảm giá ${discountPercent}% cho sản phẩm "${product.tensp}". Giá mới: ${product.giadagiam}`);
    renderProductList(); // Cập nhật lại danh sách sản phẩm
}

// Hàm phân trang
function renderPagination(totalPages) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            renderSaleProductList();
        });

        if (i === currentPage) {
            pageItem.classList.add('active');
        }

        paginationContainer.appendChild(pageItem);
    }
}
function cancelSale(index) {
    // Lấy danh sách sản phẩm từ localStorage
    let products = JSON.parse(localStorage.getItem("product_fruit")) || [];

    // Lấy sản phẩm từ mảng
    let product = products[index];

    // Đặt lại giá đã giảm về giá gốc
    product.giadagiam = product.giagoc;

    // Cập nhật lại sản phẩm trong danh sách
    products[index] = product;

    // Lưu lại vào localStorage
    localStorage.setItem("product_fruit", JSON.stringify(products));

    alert(`Giảm giá đã được hủy. Giá hiện tại: ${product.giadagiam}`);
    logAdminAction(`Hủy giảm giá cho sản phẩm "${product.tensp}". Giá quay về: ${product.giagoc}`);
    // Cập nhật lại danh sách sản phẩm sau khi hủy giảm giá
    renderSaleProductList();
}

// Lắng nghe sự kiện cho tìm kiếm và bộ lọc
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById("search-input");
    const filterCategory = document.getElementById("filter-category");

    if (searchInput) {
        searchInput.addEventListener('input', renderSaleProductList);
    }

    if (filterCategory) {
        filterCategory.addEventListener('change', renderSaleProductList);
    }

    // Gọi hàm renderSaleProductList khi mục giảm giá được chọn
    loadDanhSachSanPham();
});


// Gọi hàm renderSaleProductList khi mục giảm giá được chọn
function loadDanhSachSanPham() {
    renderSaleProductList();
}
