const DESKTOP_MQ = '(min-width: 1024px)';

const slider = document.querySelector('.reviews-slider');

if (slider) {
  const track = slider.querySelector('.reviews-slider__track');
  const slides = [...slider.querySelectorAll('.reviews-slider__slide')];
  const prevBtn = slider.querySelector('.reviews-slider__btn--prev');
  const nextBtn = slider.querySelector('.reviews-slider__btn--next');
  const desktopMq = window.matchMedia(DESKTOP_MQ);

  let index = 0;

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

  const update = () => {
    const maxIndex = getMaxIndex();
    const visibleCount = getVisibleCount();

    if (index > maxIndex) {
      index = maxIndex;
    }

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
  };

  prevBtn.addEventListener('click', () => {
    if (index <= 0) {
      return;
    }

    index -= 1;
    update();
  });

  nextBtn.addEventListener('click', () => {
    if (index >= getMaxIndex()) {
      return;
    }

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

  const handleDesktopChange = () => {
    update();
  };

  if (typeof desktopMq.addEventListener === 'function') {
    desktopMq.addEventListener('change', handleDesktopChange);
  } else {
    desktopMq.addListener(handleDesktopChange);
  }

  window.addEventListener('resize', update);

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

  update();
}
