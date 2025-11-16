document.addEventListener('DOMContentLoaded', function () {
    // Fill footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile menu toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-open');
    const closeIcon = document.getElementById('menu-close');

    if (btn && menu) {
        btn.addEventListener('click', function () {
            const isHidden = menu.classList.contains('hidden');
            if (isHidden) {
                menu.classList.remove('hidden');
                openIcon && (openIcon.classList.add('hidden'));
                closeIcon && (closeIcon.classList.remove('hidden'));
            } else {
                menu.classList.add('hidden');
                openIcon && (openIcon.classList.remove('hidden'));
                closeIcon && (closeIcon.classList.add('hidden'));
            }
        });
    }
});
