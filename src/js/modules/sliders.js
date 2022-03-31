// BildSlider

let sliders = document.querySelectorAll('._swiper')

if (sliders) {
  for (let index = 0; index < sliders.length; index++) {
    let slider = sliders[index]

    if (!slider.classList.contains('swiper-bild')) {
      let slider_items = slider.children

      if (slider_items) {
        for (let index = 0; index < slider_items.length; index++) {
          let el = slider_items[index]
          el.classList.add('swiper-slide')
        }
      }

      let slider_content = slider.innerHTML

      let slider_wrapper = element('div', ['swiper-wrapper'], slider_content)
      // let slider_wrapper = document.createElement('div')
      // slider_wrapper.classList.add('swiper-wrapper')
      // slider_wrapper.innerHTML = slider_content
      slider.innerHTML = ''
      slider.appendChild(slider_wrapper)
      slider.classList.add('swiper-bild')

      if (slider.classList.contains('_swiper_scroll')) {
        let sliderScroll = element('div', ['swiper-scrollbar'])
        slider.appendChild(sliderScroll)
      }
    }
    if (slider.classList.contains('_gallery')) {
      // slider.data('ligthGallery').destroy(true)
    }
  }

  sliders_bild_callback()
}

function sliders_bild_callback(params) {}

const sliderScrollItems = document.querySelectorAll('._swiper_scroll')
if (sliderScrollItems.length > 0) {
  for (let index = 0; index < sliderScrollItems.length; index++) {
    const sliderScrollItem = sliderScrollItems[index]
    const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar')
    const sliderScroll = new Swiper(sliderScrollItem, {
      observer: true,
      observeParent: true,
      direction: 'vertical',
      slidesPerView: 'auto',
      freeMode: true,
      scrollbar: {
        el: sliderScrollBar,
        draggable: true,
        snapOnRelease: false,
      },
      mousewheel: {
        releaseOnEdges: true,
      },
    })
    sliderScroll.scrollbar.updateSize()
  }
}

function sliders_bild_callback(params) {}

//Инициализация и Настройки слайдера 1

if (document.querySelector('.slider-main__body')) {
  new Swiper('.slider-main__body', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 32,
    watchOverflow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,
    // Dots
    pagination: {
      el: '.controls-slider-main__dotts',
      clickable: true,
    },
    // Arrows
    navigation: {
      nextEl: '.slider-main .slider-arrow_next',
      prevEl: '.slider-main .slider-arrow_prev',
    },
  })
}

//Инициализация и Настройки слайдера 2

if (document.querySelector('.slider-rooms__body')) {
  new Swiper('.slider-rooms__body', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 24,
    watchOverflow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,
    // Dots
    pagination: {
      el: '.slider-rooms__dotts',
      clickable: true,
    },
    // Arrows
    navigation: {
      nextEl: '.slider-rooms .slider-arrow_next',
      prevEl: '.slider-rooms .slider-arrow_prev',
    },
  })
}

//Инициализация и Настройки слайдера 3

if (document.querySelector('.slider-tips__body')) {
  new Swiper('.slider-tips__body', {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    spaceBetween: 32,
    watchOverflow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides: 5,
    // Dots
    pagination: {
      el: '.slider-tips__dotts',
      clickable: true,
    },
    // Arrows
    navigation: {
      nextEl: '.slider-tips .slider-arrow_next',
      prevEl: '.slider-tips .slider-arrow_prev',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.1,
        spaceBetween: 15,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window width is >= 992px
      768: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
    },
  })
}

// let slider_about = new Swiper()
