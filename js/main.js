let slides = document.querySelectorAll('.slide'),
    currentSlide = 0;

const initSlider = () => {
    let sliderMain = document.querySelector('.slider-main');

    slides.forEach(slide => {
        slide.style.width = sliderMain.offsetWidth + 'px';
        document.querySelector('.slider-wrapper').style.width = sliderMain.offsetWidth * slides.length + 'px';
    });
}

initSlider();

const flipSlide = () => {
    if (currentSlide === slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    slides.forEach(slide => slide.style.transform = `translate(-${currentSlide * slide.offsetWidth}px)`);
}

document.addEventListener('click', e => {
    if (e.target.classList.contains('next')) {
        currentSlide++;
        flipSlide();
    } else if (e.target.classList.contains('prev')) {
        currentSlide--;
        flipSlide();
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
        currentSlide++;
        flipSlide();
    } else if (e.key === 'ArrowLeft') {
        currentSlide--;
        flipSlide();
    }
});

window.addEventListener('resize', initSlider);