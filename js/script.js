
let galleryImages = [
    'assets/product.png',
    'assets/line-item1.jpg',
    'assets/line-item2.jpg',
    'assets/line-item3.jpg',
    'assets/line-item4.jpg',
];

let thumbnailImages = [
    'assets/line-item1.jpg',
    'assets/line-item2.jpg',
    'assets/line-item3.jpg',
    'assets/line-item4.jpg',
    'assets/line-item1.jpg',
    'assets/line-item2.jpg',
    'assets/line-item3.jpg',
    'assets/line-item4.jpg',
];

let currentImageIndex = 0;
let mainImage, prevBtn, nextBtn, galleryDots, galleryThumbnails;

function initGallery() {
    mainImage = document.getElementById('mainImage');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    galleryDots = document.getElementById('galleryDots');
    galleryThumbnails = document.getElementById('galleryThumbnails');

    if (!mainImage || !galleryDots || !galleryThumbnails) return;

    mainImage.src = galleryImages[currentImageIndex];
    mainImage.style.opacity = '1';

    galleryDots.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const dot = document.createElement('button');
        dot.className = `gallery-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to image ${i + 1}`);
        dot.addEventListener('click', () => {
            currentImageIndex = i;
            changeImage(currentImageIndex);
        });
        galleryDots.appendChild(dot);
    }

    galleryThumbnails.innerHTML = '';
    thumbnailImages.forEach((img, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `gallery-thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${img}" alt="Thumbnail ${index + 1}" loading="lazy" onerror="this.src='assets/product.png'">`;
        thumbnail.addEventListener('click', () => {
            changeImageByThumbnail(index);
        });
        galleryThumbnails.appendChild(thumbnail);
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            changeImage(currentImageIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            changeImage(currentImageIndex);
        });
    }
}

function changeImage(index) {
    if (index < 0 || index >= galleryImages.length) return;
    currentImageIndex = index;

    if (mainImage) {
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = galleryImages[index];
            mainImage.style.opacity = '1';
        }, 150);
    }

    const dots = document.querySelectorAll('.gallery-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    thumbnails.forEach((thumb, i) => {
        const thumbImg = thumbnailImages[i];
        const currentMainImg = galleryImages[index];
        if (thumbImg === currentMainImg) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

function changeImageByThumbnail(thumbnailIndex) {
    if (thumbnailIndex < 0 || thumbnailIndex >= thumbnailImages.length) return;
    const thumbnailImage = thumbnailImages[thumbnailIndex];
    const imageIndex = galleryImages.findIndex(img => img === thumbnailImage);

    if (imageIndex !== -1) {
        changeImage(imageIndex);
    } else {
        if (mainImage) {
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.src = thumbnailImage;
                mainImage.style.opacity = '1';
            }, 150);
        }
        const dots = document.querySelectorAll('.gallery-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === 0);
        });
    }

    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    thumbnails.forEach((thumb, i) => {
        if (i === thumbnailIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

const purchaseTypeRadios = document.querySelectorAll('input[name="purchaseType"]');

function updatePurchaseType() {
    const selectedType = document.querySelector('input[name="purchaseType"]:checked')?.value;
    const allWrappers = document.querySelectorAll('.subscription-content-wrapper');
    allWrappers.forEach(wrapper => {
        wrapper.classList.remove('active');
    });

    if (selectedType) {
        const selectedWrapper = document.querySelector(`.subscription-content-wrapper[data-type="${selectedType}"]`);
        if (selectedWrapper) {
            selectedWrapper.classList.add('active');
        }
    }
}

purchaseTypeRadios.forEach(radio => {
    radio.addEventListener('change', updatePurchaseType);
});

document.addEventListener('click', function (e) {
    if (e.target.closest('.included-box')) {
        const box = e.target.closest('.included-box');
        const boxType = box.dataset.box;
        const subscriptionWrapper = box.closest('.subscription-content-wrapper');

        if (subscriptionWrapper) {
            subscriptionWrapper.querySelectorAll('.included-box').forEach(b => b.classList.remove('active'));
            box.classList.add('active');
            subscriptionWrapper.querySelectorAll('.included-tab-content').forEach(c => c.classList.remove('active'));
            const targetContent = subscriptionWrapper.querySelector(`[data-content="${boxType}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    initGallery();
    updatePurchaseType();
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        initGallery();
        updatePurchaseType();
    }, 1);
}

document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.innerHTML = target + '<span class="stats-percent">%</span>';
            clearInterval(timer);
        } else {
            element.innerHTML = Math.floor(current) + '<span class="stats-percent">%</span>';
        }
    }, 16);
}

const statsSection = document.getElementById('statsSection');
const statsNumbers = document.querySelectorAll('.stats-number');

let hasAnimated = false;

if (statsSection && statsNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statsNumbers.forEach(num => {
                    const target = parseInt(num.dataset.target);
                    animateCounter(num, target);
                });
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(statsSection);
}


// Add to Cart Dynamic Link
function updateAddToCartLink() {
    const purchaseType = document.querySelector('input[name="purchaseType"]:checked')?.value || 'single';
    const addToCartBtn = document.getElementById('addToCartLink');

    let fragrance = 'original';

    if (purchaseType === 'single') {
        fragrance = document.querySelector('input[name="fragrance-single"]:checked')?.value || 'original';
    } else if (purchaseType === 'double') {
        const frag1 = document.querySelector('input[name="fragrance-double-1"]:checked')?.value || 'original';
        const frag2 = document.querySelector('input[name="fragrance-double-2"]:checked')?.value || 'original';
        fragrance = `${frag1}-${frag2}`;
    }

    // 9 variations for single, more for double
    const cartLinks = {
        'single-original': 'https://example.com/cart/single-original',
        'single-lily': 'https://example.com/cart/single-lily',
        'single-rose': 'https://example.com/cart/single-rose',
        'double-original-original': 'https://example.com/cart/double-original-original',
        'double-original-lily': 'https://example.com/cart/double-original-lily',
        'double-original-rose': 'https://example.com/cart/double-original-rose',
        'double-lily-original': 'https://example.com/cart/double-lily-original',
        'double-lily-lily': 'https://example.com/cart/double-lily-lily',
        'double-lily-rose': 'https://example.com/cart/double-lily-rose',
        'double-rose-original': 'https://example.com/cart/double-rose-original',
        'double-rose-lily': 'https://example.com/cart/double-rose-lily',
        'double-rose-rose': 'https://example.com/cart/double-rose-rose'
    };

    const linkKey = `${purchaseType}-${fragrance}`;
    if (addToCartBtn && cartLinks[linkKey]) {
        addToCartBtn.href = cartLinks[linkKey];
    }
}

document.querySelectorAll('input[name="purchaseType"], input[name="fragrance-single"], input[name="fragrance-double-1"], input[name="fragrance-double-2"]').forEach(radio => {
    radio.addEventListener('change', updateAddToCartLink);
});

document.addEventListener('DOMContentLoaded', updateAddToCartLink);
function updateAddToCartLink() {
    const purchaseType = document.querySelector('input[name="purchaseType"]:checked')?.value || 'single';
    const addToCartBtn = document.getElementById('addToCartLink');

    let fragrance = 'original';

    if (purchaseType === 'single') {
        fragrance = document.querySelector('input[name="fragrance-single"]:checked')?.value || 'original';
    } else if (purchaseType === 'double') {
        const frag1 = document.querySelector('input[name="fragrance-double-1"]:checked')?.value || 'original';
        const frag2 = document.querySelector('input[name="fragrance-double-2"]:checked')?.value || 'original';
        fragrance = `${frag1}-${frag2}`;
    }

    const cartLinks = {
        'single-original': 'https://example.com/cart/single-original',
        'single-lily': 'https://example.com/cart/single-lily',
        'single-rose': 'https://example.com/cart/single-rose',
        'double-original-original': 'https://example.com/cart/double-original-original',
        'double-original-lily': 'https://example.com/cart/double-original-lily',
        'double-original-rose': 'https://example.com/cart/double-original-rose',
        'double-lily-original': 'https://example.com/cart/double-lily-original',
        'double-lily-lily': 'https://example.com/cart/double-lily-lily',
        'double-lily-rose': 'https://example.com/cart/double-lily-rose',
        'double-rose-original': 'https://example.com/cart/double-rose-original',
        'double-rose-lily': 'https://example.com/cart/double-rose-lily',
        'double-rose-rose': 'https://example.com/cart/double-rose-rose'
    };

    const linkKey = `${purchaseType}-${fragrance}`;
    if (addToCartBtn && cartLinks[linkKey]) {
        addToCartBtn.href = cartLinks[linkKey];
    }
}

document.querySelectorAll('input[name="purchaseType"], input[name="fragrance-single"], input[name="fragrance-double-1"], input[name="fragrance-double-2"]').forEach(radio => {
    radio.addEventListener('change', updateAddToCartLink);
});

document.addEventListener('DOMContentLoaded', updateAddToCartLink);

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}