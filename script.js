// ==========================================
// 1. FITUR KERANJANG BELANJA (LocalStorage)
// ==========================================
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

const addButtons = document.querySelectorAll('.btn-add');

addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const name = e.target.getAttribute('data-name');
        const price = parseInt(e.target.getAttribute('data-price'));

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();

        alert(`${name} berhasil ditambahkan ke keranjang! 🥐`);
    });
});

function updateCartCount() {
    const cartCountSpan = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountSpan) {
        cartCountSpan.textContent = totalItems;
    }
}

// ==========================================
// 2. EFEK ANIMASI TEKS SEDERHANA (GSAP Vanilla)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Mengecek apakah GSAP tersedia
    if (typeof gsap !== 'undefined') {
        // Animasi halus untuk Judul Utama / Heading saat halaman dibuka
        gsap.from("h1, h2", {
            duration: 1.2,
            y: 30,
            opacity: 0,
            ease: "power3.out",
            stagger: 0.2
        });

        // Animasi untuk kartu produk agar muncul dengan mulus
        gsap.from(".product-card", {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out",
            stagger: 0.15,
            delay: 0.3
        });
    }
});

// ==========================================
// 3. EFEK ANIMASI SCROLL FLOAT UNTUK HALAMAN ABOUT
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap !== 'undefined') {
        // Animasi judul dan paragraf muncul dengan efek mengalir ke atas saat di-scroll
        gsap.from(".about-container h2, .subtitle-about, .about-text p", {
            scrollTrigger: {
                trigger: ".about-page-section",
                start: "top 80%", // Animasi mulai saat bagian atas section masuk 80% dari layar
                toggleActions: "play none none none"
            },
            duration: 1,
            y: 40,
            opacity: 0,
            ease: "power3.out",
            stagger: 0.15 // Memberikan jeda waktu antar paragraf agar muncul satu per satu dengan mulus
        });
    }
});

// ==========================================
// 4. FILTER KATEGORI MENU (Varian Roti)
// ==========================================
const tabButtons = document.querySelectorAll('.tab-btn');
const productCards = document.querySelectorAll('.product-grid .product-card');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Hapus class active dari semua tombol
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Tambahkan ke tombol yang sedang diklik
        button.classList.add('active');

        const selectedCategory = button.getAttribute('data-category');

        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

