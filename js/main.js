let slides = document.querySelectorAll('.slide'),
    current = document.querySelector('.current'),
    total = document.querySelector('.total'),
    currentSlide = 0;

const initSlider = () => {
    let sliderMain = document.querySelector('.slider-main');

    slides.forEach(slide => {
        slide.style.width = sliderMain.offsetWidth + 'px';
        document.querySelector('.slider-wrapper').style.width = sliderMain.offsetWidth * slides.length + 'px';
    });

    current.textContent = `0${currentSlide + 1}`;
}

slides.length < 10 ? total.textContent = `0${slides.length}` : total.textContent = slides.length;

initSlider();

const flipSlide = () => {
    if (currentSlide === slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    slides.forEach(slide => slide.style.transform = `translate(-${currentSlide * slide.offsetWidth}px)`);
    currentSlide < 9 ? current.textContent = `0${currentSlide + 1}` : current.textContent = currentSlide + 1;
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