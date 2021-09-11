'use strict';

let count = 0;

function initSlider(slider, wrapper, slide) {
    let sliderMain = document.querySelector(slider),
        sliderWrapper = document.querySelector(wrapper),
        slides = document.querySelectorAll(slide);

    slides.forEach(slide => {
        slide.style.width = sliderMain.offsetWidth + 'px';
        sliderWrapper.style.width = slide.style.width.slice(0, -2) * slides.length + 'px';
    });
}

initSlider('.slider-main', '.slider-wrapper', '.slide');
window.addEventListener('resize', () => initSlider('.slider-main', '.slider-wrapper', '.slide'));

function createIndicators(slider, slide) {
    let sliderMain = document.querySelector(slider),
        slides = document.querySelectorAll(slide);

    let indicatorList = document.createElement('ul');
    indicatorList.classList.add('indicator-list');

    for (let i = 0; i < slides.length; i++) {
        const indicatorItem = document.createElement('li');
        indicatorItem.classList.add('indicator-item');
        indicatorList.appendChild(indicatorItem);
    }

    sliderMain.append(indicatorList);
    indicatorList.firstElementChild.classList.add('active-item');
}

function showSlideNumber(current, total, slides) {
    let currentSlide = document.querySelector(current),
        totalSlides = document.querySelector(total),
        allSlides = document.querySelectorAll(slides);

    currentSlide.textContent = count + 1;
    totalSlides.textContent = allSlides.length;
}

createIndicators('.slider-main', '.slide');
showSlideNumber('.current', '.total', '.slide');

function flipSlides(slide, items) {
    let slides = document.querySelectorAll(slide),
        indicators = document.querySelectorAll(items);

    if (count == slides.length) count = 0;
    if (count < 0) count = slides.length - 1;

    indicators.forEach(indicator => indicator.classList.remove('active-item'));
    indicators[count].classList.add('active-item');
    slides.forEach(slide => slide.style.transform = `translateX(-${count * slide.style.width.slice(0, -2)}px)`);

    showSlideNumber('.current', '.total', slide);
}

function changeIndicators(e, items) {
    let indicators = document.querySelectorAll(items);

    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active-item');

        if (e.target === indicator) {
            count = index;
            flipSlides('.slide', '.indicator-item');
        }
    });
}

document.querySelector('.prev').addEventListener('click', () => {
    count--;
    flipSlides('.slide', '.indicator-item');
});
document.querySelector('.next').addEventListener('click', () => {
    count++;
    flipSlides('.slide', '.indicator-item');
});
document.querySelector('.indicator-list').addEventListener('click', (e) => changeIndicators(e, '.indicator-item'));
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
        count++;
        flipSlides('.slide', '.indicator-item');
    } else if (e.key === 'ArrowLeft') {
        count--;
        flipSlides('.slide', '.indicator-item');
    }
});