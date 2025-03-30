document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для навигации
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Обновление активного пункта меню
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Анимация элементов при появлении
    const animateOnScroll = function(selector, threshold = 0.1) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold });
        
        document.querySelectorAll(selector).forEach(element => {
            observer.observe(element);
        });
    };
    
    // Применяем анимацию к разным элементам
    animateOnScroll('.skill');
    animateOnScroll('.timeline-item', 0.2);
    
    // Инициализация skill bars
    document.querySelectorAll('.skill-bar').forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.setProperty('--skill-level', level + '%');
        
        // Запускаем анимацию после небольшой задержки
        setTimeout(() => {
            bar.style.width = level + '%';
        }, 300);
    });

    // Темная тема
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Переключить тему');
    document.body.appendChild(themeToggle);

    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Таймер опыта работы
    function updateExperience() {
        const startYear = 2022; // Укажите ваш год начала работы
        const currentYear = new Date().getFullYear();
        const experience = currentYear - startYear;
        document.querySelectorAll('.experience-years').forEach(el => {
            el.textContent = experience;
        });
    }
    updateExperience();

    // Обновление года в футере
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Функция показа модального окна
    function showModal(message) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(modal);
        
        modal.style.display = 'flex';
        
        // Закрытие модального окна
        modal.querySelector('.close-modal').addEventListener('click', function() {
            modal.style.display = 'none';
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
        
        // Закрытие при клике вне модального окна
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        });
    }

    // Обновление активной ссылки в навигации
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Инициализация активной ссылки при загрузке
    updateActiveNavLink();
});