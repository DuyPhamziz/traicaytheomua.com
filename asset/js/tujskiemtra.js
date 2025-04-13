const overlay = document.getElementById('tuoverlay');
    const closeBtn = document.getElementById('tucloseOverlayBtn');
    const closeBtnX = document.getElementById('tucloseOverlayBtnX');

    function showOverlay() {
      overlay.style.display = 'flex';
    }

    // Đóng overlay khi bấm "Đóng" hoặc "X"
    closeBtn.addEventListener('click', () => {
      overlay.style.display = 'none';
    });

    closeBtnX.addEventListener('click', () => {
      overlay.style.display = 'none';
    });
