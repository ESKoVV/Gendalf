document.addEventListener('DOMContentLoaded', function() {
  function initFixedCarousel() {
    const carousel = document.querySelector('.slide--5 .slide__carousel');
    if (!carousel) return;

    const wrapper = carousel.querySelector('.slide__carousel-wrapper');
    const cards = Array.from(carousel.querySelectorAll('.slide__carousel-card'));
    const prevBtn = carousel.querySelector('.slide__carousel-button--prev');
    const nextBtn = carousel.querySelector('.slide__carousel-button--next');
    const container = carousel.querySelector('.slide__carousel-container');

    // Константы
    const CARD_WIDTH = 273;
    const CARD_GAP = 30;
    let currentIndex = 0;
    let isAnimating = false;
    let visibleCardsCount = 1;

    // Проверка элементов
    if (!wrapper || !cards.length || !prevBtn || !nextBtn || !container) return;

    // Рассчитываем количество видимых карточек
    function calculateVisibleCards() {
      const containerWidth = container.offsetWidth;
      return Math.min(
        Math.floor((containerWidth + CARD_GAP) / (CARD_WIDTH + CARD_GAP)),
        cards.length
      );
    }

    // Обновляем видимость карточек
    function updateCardsVisibility() {
      visibleCardsCount = calculateVisibleCards();
      
      cards.forEach((card, index) => {
        const isVisible = index >= currentIndex && index < currentIndex + visibleCardsCount;
        card.style.opacity = isVisible ? '1' : '0';
        card.style.visibility = isVisible ? 'visible' : 'hidden';
        card.style.pointerEvents = isVisible ? 'auto' : 'none';
      });
      
      // Гарантируем, что первая карточка в текущей группе всегда видна
      if (cards[currentIndex]) {
        cards[currentIndex].style.opacity = '1';
        cards[currentIndex].style.visibility = 'visible';
      }
    }

    // Обновляем состояние кнопок
    function updateButtons() {
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= cards.length - visibleCardsCount;
      
      prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
      nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }

    // Анимация перемещения
    function scrollToCard(index, direction) {
      if (isAnimating) return;
      
      const newIndex = Math.max(0, Math.min(index, cards.length - visibleCardsCount));
      if (newIndex === currentIndex) return;
      
      currentIndex = newIndex;
      const offset = -currentIndex * (CARD_WIDTH + CARD_GAP);
      
      // Предварительно показываем карточки, которые должны стать видимыми
      if (direction === 'next') {
        const nextCardIndex = currentIndex + visibleCardsCount - 1;
        if (cards[nextCardIndex]) {
          cards[nextCardIndex].style.opacity = '1';
          cards[nextCardIndex].style.visibility = 'visible';
        }
      } else if (direction === 'prev') {
        const prevCardIndex = currentIndex;
        if (cards[prevCardIndex]) {
          cards[prevCardIndex].style.opacity = '1';
          cards[prevCardIndex].style.visibility = 'visible';
        }
      }
      
      isAnimating = true;
      wrapper.style.transition = 'transform 0.5s ease';
      wrapper.style.transform = `translateX(${offset}px)`;
      
      const onTransitionEnd = () => {
        wrapper.removeEventListener('transitionend', onTransitionEnd);
        isAnimating = false;
        updateCardsVisibility();
        updateButtons();
      };
      
      wrapper.addEventListener('transitionend', onTransitionEnd);
    }

    // Обработчики кнопок
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!isAnimating && currentIndex < cards.length - visibleCardsCount) {
        scrollToCard(currentIndex + 1, 'next');
      }
    });

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!isAnimating && currentIndex > 0) {
        scrollToCard(currentIndex - 1, 'prev');
      }
    });

    // Обработчик ресайза
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const prevVisibleCount = visibleCardsCount;
        updateCardsVisibility();
        
        if (visibleCardsCount !== prevVisibleCount) {
          scrollToCard(Math.min(currentIndex, cards.length - visibleCardsCount));
        } else {
          scrollToCard(currentIndex);
        }
      }, 100);
    });

    // Инициализация
    wrapper.style.transition = 'none';
    updateCardsVisibility();
    updateButtons();
    wrapper.style.transform = `translateX(0px)`;
    setTimeout(() => {
      wrapper.style.transition = 'transform 0.5s ease';
    }, 50);
  }

  initFixedCarousel();
});