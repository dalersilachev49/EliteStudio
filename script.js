// ===== 1. ЛОАДЕР =====
window.addEventListener('load', function() {
    setTimeout(function() {
        var loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 800);
});

// ===== 2. ЧАСТИЦЫ =====
(function() {
    var particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    for (var i = 0; i < 50; i++) {
        var particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        var size = (2 + Math.random() * 4) + 'px';
        particle.style.width = size;
        particle.style.height = size;
        particlesContainer.appendChild(particle);
    }
})();

// ===== 3. КАСТОМНЫЙ КУРСОР =====
(function() {
    var cursor = document.getElementById('cursor');
    var cursorFollower = document.getElementById('cursorFollower');

    if (!cursor || !cursorFollower) return;

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = (e.clientX - 10) + 'px';
        cursor.style.top = (e.clientY - 10) + 'px';
        setTimeout(function() {
            cursorFollower.style.left = (e.clientX - 20) + 'px';
            cursorFollower.style.top = (e.clientY - 20) + 'px';
        }, 100);
    });

    var hoverElements = document.querySelectorAll('a, button, .card, .gallery-item, .star');
    hoverElements.forEach(function(el) {
        el.addEventListener('mouseenter', function() { cursor.classList.add('hover'); });
        el.addEventListener('mouseleave', function() { cursor.classList.remove('hover'); });
    });
})();

// ===== 4. ПРОГРЕСС-БАР + НАВБАР =====
window.addEventListener('scroll', function() {
    var scrollProgress = document.getElementById('scrollProgress');
    var navbar = document.getElementById('navbar');

    if (scrollProgress) {
        var scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        scrollProgress.style.width = (scrolled * 100) + '%';
    }

    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ===== 5. REVEAL АНИМАЦИЯ =====
(function() {
    var revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(function(el) { revealObserver.observe(el); });
})();

// ===== 6. СЧЁТЧИКИ =====
(function() {
    var statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;

    var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var target = parseInt(entry.target.dataset.target);
                var current = 0;
                var increment = target / 60;
                var timer = setInterval(function() {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }
                }, 25);
                counterObserver.unobserve(entry.target);
            }
        });
    });

    statNumbers.forEach(function(el) { counterObserver.observe(el); });
})();

// ===== 7. ЗВЁЗДНЫЙ РЕЙТИНГ =====
(function() {
    var stars = document.querySelectorAll('.star');
    var ratingText = document.getElementById('ratingText');
    var starRating = document.getElementById('starRating');

    if (stars.length === 0 || !ratingText || !starRating) return;

    var ratingTexts = ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично!'];

    stars.forEach(function(star, index) {
        star.addEventListener('click', function() {
            stars.forEach(function(s, i) {
                if (i <= index) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
            ratingText.textContent = ratingTexts[index];
        });

        star.addEventListener('mouseenter', function() {
            stars.forEach(function(s, i) {
                if (i <= index) {
                    s.style.color = '#ffd700';
                } else {
                    s.style.color = 'rgba(255,255,255,0.2)';
                }
            });
        });
    });

    starRating.addEventListener('mouseleave', function() {
        stars.forEach(function(s) {
            if (s.classList.contains('active')) {
                s.style.color = '#ffd700';
            } else {
                s.style.color = 'rgba(255,255,255,0.2)';
            }
        });
    });
})();

// ===== 8. СЧЁТЧИК СИМВОЛОВ =====
(function() {
    var reviewTextarea = document.getElementById('reviewText');
    var charCount = document.getElementById('charCount');

    if (!reviewTextarea || !charCount) return;

    reviewTextarea.addEventListener('input', function() {
        charCount.textContent = reviewTextarea.value.length;
    });
})();

// ===== 9. УВЕДОМЛЕНИЕ =====
function showNotification(text, title) {
    title = title || 'Готово!';
    var notif = document.getElementById('notification');
    var notifTitle = document.getElementById('notifTitle');
    var notifText = document.getElementById('notifText');

    if (!notif || !notifTitle || !notifText) return;

    notifTitle.textContent = title;
    notifText.textContent = text;
    notif.classList.add('show');
    setTimeout(function() {
        notif.classList.remove('show');
    }, 3000);
}

// ===== 10. ФОРМА ОТЗЫВА =====
(function() {
    var reviewForm = document.getElementById('reviewForm');
    var charCount = document.getElementById('charCount');
    var stars = document.querySelectorAll('.star');
    var ratingText = document.getElementById('ratingText');

    if (!reviewForm) return;

    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var name = document.getElementById('reviewName');
        var text = document.getElementById('reviewText');

        if (!name || !text) return;

        var badWords = ['плохой', 'ужасный', 'говно', 'фигня'];
        var cleanText = text.value;

        badWords.forEach(function(word) {
            var regex = new RegExp(word, 'gi');
            cleanText = cleanText.replace(regex, '***');
        });

        showNotification('Спасибо за отзыв! Он появится после модерации.', 'Отправлено!');
        reviewForm.reset();
        if (charCount) charCount.textContent = '0';
        if (stars.length > 0) {
            stars.forEach(function(s) { s.classList.add('active'); });
        }
        if (ratingText) ratingText.textContent = 'Отлично!';
    });
})();

// ===== 11. ПЛАВНАЯ ПРОКРУТКА =====
(function() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();

// ===== 12. PARALLAX HERO =====
window.addEventListener('scroll', function() {
    var scrolled = window.pageYOffset;
    var hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
    }
});

// ===== 13. 3D TILT ДЛЯ КАРТОЧЕК =====
(function() {
    var cards = document.querySelectorAll('.card');

    cards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = (y - centerY) / 20;
            var rotateY = (centerX - x) / 20;
            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
})();

// ===== 14. МОБИЛЬНОЕ МЕНЮ =====
(function() {
    var mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (!mobileMenuBtn) return;

    mobileMenuBtn.addEventListener('click', function() {
        showNotification('Меню в разработке', 'Инфо');
    });
})();

// ===== 15. ПРОВЕРКА СВЯЗИ С TELEGRAM =====
(function() {
    var tgLinks = document.querySelectorAll('a[href*="t.me"]');
    tgLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            console.log('Переход в Telegram:', link.href);
        });
    });
})();
