const DESKTOP_MQ = '(min-width: 1024px)';

const slider = document.querySelector('.reviews-slider');

if (slider) {
  const track = slider.querySelector('.reviews-slider__track');
  const slides = [...slider.querySelectorAll('.reviews-slider__slide')];
  const prevBtn = slider.querySelector('.reviews-slider__btn--prev');
  const nextBtn = slider.querySelector('.reviews-slider__btn--next');
  const status = slider.querySelector('.reviews-slider__status');
  const desktopMq = window.matchMedia(DESKTOP_MQ);

  let index = 0;
  let ready = false;

  const isRu = () => document.documentElement.getAttribute('lang') !== 'en';

  const getVisibleCount = () => (desktopMq.matches ? 2 : 1);

  const getMaxIndex = () => Math.max(0, slides.length - getVisibleCount());

  const getStep = () => {
    if (!slides.length) {
      return 0;
    }

    const slideWidth = slides[0].getBoundingClientRect().width;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;

    return slideWidth + gap;
  };

  const collapseCard = (card) => {
    const toggle = card.querySelector('.review-card__toggle');

    card.classList.remove('review-card--expanded');

    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = toggle.dataset.labelExpand;
    }
  };

  const announce = () => {
    if (!status || !ready) {
      return;
    }

    const visibleCount = getVisibleCount();
    const start = index + 1;
    const end = Math.min(index + visibleCount, slides.length);
    const total = slides.length;

    if (isRu()) {
      status.textContent =
        visibleCount === 1
          ? `Отзыв ${start} из ${total}`
          : `Отзывы ${start}–${end} из ${total}`;
    } else {
      status.textContent =
        visibleCount === 1
          ? `Review ${start} of ${total}`
          : `Reviews ${start}–${end} of ${total}`;
    }
  };

  const updateSlideLabels = () => {
    const total = slides.length;

    slides.forEach((slide, slideIndex) => {
      const n = slideIndex + 1;

      slide.setAttribute(
        'aria-label',
        isRu() ? `${n} из ${total}` : `${n} of ${total}`,
      );
    });
  };

  const update = () => {
    const maxIndex = getMaxIndex();
    const visibleCount = getVisibleCount();

    index = Math.min(Math.max(0, index), maxIndex);

    slides.forEach((slide, slideIndex) => {
      if (slideIndex < index || slideIndex >= index + visibleCount) {
        const card = slide.querySelector('.review-card--expanded');

        if (card) {
          collapseCard(card);
        }
      }
    });

    track.style.transform = `translateX(-${index * getStep()}px)`;
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= maxIndex;
    announce();
  };

  prevBtn.addEventListener('click', () => {
    index -= 1;
    update();
  });

  nextBtn.addEventListener('click', () => {
    index += 1;
    update();
  });

  slider.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prevBtn.click();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextBtn.click();
    }
  });

  window.addEventListener('resize', update);

  window.addEventListener('att:languagechange', () => {
    updateSlideLabels();
    announce();
  });

  slider.querySelectorAll('.review-card__toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const card = toggle.closest('.review-card');

      if (!card) {
        return;
      }

      const isExpanded = card.classList.toggle('review-card--expanded');

      toggle.setAttribute('aria-expanded', String(isExpanded));
      toggle.textContent = isExpanded
        ? toggle.dataset.labelCollapse
        : toggle.dataset.labelExpand;
    });
  });

  updateSlideLabels();
  update();
  ready = true;
}
