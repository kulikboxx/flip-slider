let slides = document.querySelectorAll('.slide'),
    current = document.querySelector('.current'),
    total = document.querySelector('.total'),
    indicatorsList,
    currentSlide = 0;

const initSlider = () => {
    let sliderMain = document.querySelector('.slider-main');

    slides.forEach(slide => {
        slide.style.width = sliderMain.offsetWidth + 'px';
        document.querySelector('.slider-wrapper').style.width = sliderMain.offsetWidth * slides.length + 'px';
    });
    current.textContent = `0${currentSlide + 1}`;

    indicatorsList = document.createElement('ol');
    indicatorsList.classList.add('indicator-list');

    for (let i = 0; i < slides.length; i++) {
        let indicatorItem = document.createElement('li');
        indicatorItem.classList.add('indicator-item');
        indicatorsList.append(indicatorItem);
    }
    sliderMain.append(indicatorsList);
    document.querySelector('.indicator-item:first-child').classList.add('active-item');
}

initSlider();

slides.length < 10 ? total.textContent = `0${slides.length}` : total.textContent = slides.length;

const flipSlide = () => {
    if (currentSlide === slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    slides.forEach(slide => slide.style.transform = `translate(-${currentSlide * slide.offsetWidth}px)`);
    currentSlide < 9 ? current.textContent = `0${currentSlide + 1}` : current.textContent = currentSlide + 1;

    const liItems = document.querySelectorAll('.indicator-item');

    for (let i = 0; i < liItems.length; i++) {
        liItems[i].classList.remove('active-item');
        liItems[currentSlide].classList.add('active-item');
    }
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

const changeIndicator = e => {
    document.querySelectorAll('.indicator-item').forEach((item, i) => {
        item.classList.remove('active-item');
        if (e.target === item) {
            currentSlide = i;
            flipSlide();
            e.target.classList.add('active-item');
        }
    });
}

indicatorsList.addEventListener('click', changeIndicator);
window.addEventListener('resize', initSlider);