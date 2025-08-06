
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Видео в слайде 4
    const videoContainer = document.querySelector('.slide__video-container');
    if (videoContainer) {
        const video = videoContainer.querySelector('.slide__video');
        const playButton = videoContainer.querySelector('.slide__video-play');
        
        playButton.addEventListener('click', function() {
            video.play();
            playButton.style.display = 'none';
            video.setAttribute('controls', 'controls');
        });
        
        video.addEventListener('play', function() {
            playButton.style.display = 'none';
        });
    }

    



// Аккордеон в слайде 7
    const faqItems = document.querySelectorAll('.slide__faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.slide__faq-question');
        
        question.addEventListener('click', function() {
            // Закрываем все открытые элементы, кроме текущего
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключаем текущий элемент
            item.classList.toggle('active');
        });
    });





    // Валидация формы в слайде 8
    const form = document.querySelector('.slide__form');
    if (form) {
        const nameInput = form.querySelector('#name');
        const phoneInput = form.querySelector('#phone');
        const emailInput = form.querySelector('#email');
        const positionInput = form.querySelector('#position');
        const submitButton = form.querySelector('.slide__form-button--submit');
        
        // Проверка валидности для каждого поля
        function validateField(input) {
            const group = input.closest('.slide__form-group');
            if (!group) return;
            
            group.classList.remove('valid', 'invalid');
            
            if (input.value.trim() === '') {
                return;
            }
            
            let isValid = false;
            
            if (input === phoneInput) {
                // Проверка российского телефона (начинается с 8, 11 цифр)
                isValid = /^8\d{10}$/.test(input.value.replace(/\D/g, ''));
            
            } else if (input === emailInput) {
                // Простая проверка email (наличие @)
                isValid = input.value.includes('@');
            } else {
                // Для остальных полей - любое значение
                isValid = input.value.trim() !== '';
            }
            
            group.classList.add(isValid ? 'valid' : 'invalid');
            return isValid;
        }
        
        
        // События для валидации
        [nameInput, phoneInput, emailInput, positionInput].forEach(input => {
            input.addEventListener('input', function() {
                validateField(this);
            });
            
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
        
        // Отправка формы
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация всех полей
            const isNameValid = validateField(nameInput);
            const isPhoneValid = validateField(phoneInput);
            const isEmailValid = validateField(emailInput);
            const isPositionValid = validateField(positionInput);
            
            // Проверка выбора категории занятости
            const employmentSelected = form.querySelector('input[name="employment"]:checked');
            
            if (!employmentSelected) {
                alert('Пожалуйста, выберите категорию занятости');
                return;
            }
            
            if (isNameValid && isPhoneValid && isEmailValid && isPositionValid) {
                // Здесь можно отправить форму
                alert('Форма успешно отправлена!');
                form.reset();
                
                // Сброс стилей валидации
                document.querySelectorAll('.slide__form-group').forEach(group => {
                    group.classList.remove('valid', 'invalid');
                });
            } else {
                alert('Пожалуйста, заполните все поля корректно');
            }
        });
        
        // Прикрепление резюме
        const attachButton = form.querySelector('.slide__form-button--attach');
        attachButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Здесь можно реализовать загрузку файла
            alert('Функция прикрепления резюме будет реализована позже');
        });
    }

    // Адаптивное меню для мобильной версии
    const mobileMenuButton = document.querySelector('.header__mobile-menu-button');
    if (mobileMenuButton) {
        const menu = document.querySelector('.header__menu');
        
        mobileMenuButton.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }

});
