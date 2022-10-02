// Parallax при скролле
const parallax = document.querySelectorAll('[data-prlx-scroll-wrapper]')
const parallaxScroll = document.querySelectorAll('[data-prlx-scroll]')
const parallaxItem = document.querySelectorAll('[data-prlx-scroll-item]')

for (let prlxWrapper of parallax) {
  if (prlxWrapper) {
    // let thresholdSets = []
    // for (let i = 0; i <= 1.0; i += 0.05) {
    //   thresholdSets.push(i)
    // }

    for (let prlxScroll of parallaxScroll) {
      const callback = function (entries, observer) {
        const scrollTopProcent =
          (window.pageYOffset / prlxScroll.offsetHeight) * 100
        setParallaxItemsStyle(scrollTopProcent)
      }

      // const observer = new IntersectionObserver(callback, {
      //   threshold: thresholdSets,
      // })

      // observer.observe(document.querySelector('[data-prlx-scroll-item]'))

      function setParallaxItemsStyle(scrollTopProcent) {
        for (let prlxItem of parallaxItem) {
          let scrollHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight
          )

          let itemOffsetTop =
            prlxItem.getBoundingClientRect().top + window.pageYOffset

          if (scrollHeight >= itemOffsetTop) {
            prlxScroll.style.cssText = `transform: translate(0%, -${
              scrollTopProcent / 50
            }%);`
            prlxItem.style.cssText = `transform: translate(0%, -${
              scrollTopProcent / 45
            }%);`
          }
        }
      }

      window.addEventListener('scroll', function (e) {
        requestAnimationFrame(callback)
      })
    }
  }
}
// ===========================================================================================
// *** Размер окна браузера
// Доступная ширина и высота
const mainElement = document.documentElement
const mainElementHeight = mainElement.clientHeight
const mainElementWidth = mainElement.clientWidth

// *** Ширина и высота окна вместе с полосами прокрутки
const windowWidth = window.innerWidth
const windowHeight = window.innerHeight

// *** Ширина и высота документа включая прокурученую часть
let scrollWidth = Math.max(
  document.body.scrollWidth,
  document.documentElement.scrollWidth,
  document.body.offsetWidth,
  document.documentElement.offsetWidth,
  document.body.clientWidth,
  document.documentElement.clientWidth
)
let scrollHeight = Math.max(
  document.body.scrollHeight,
  document.documentElement.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.offsetHeight,
  document.body.clientHeight,
  document.documentElement.clientHeight
)

// *** Получить кол-во прокрученых пикселей
// Только для чтения
const windowScrollTop = window.pageYOffset
const windowScrollLeft = window.pageXOffset

// *** Управление прокруткой страницы
// Метод scrollBy(x,y) прокручивает страницу относительно ее текущего положения

function setScrollBy() {
  window.scrollBy(0, 10000)
  const windowScrollTop = window.pageYOffset
  // console.log(windowScrollTop)
}

// *** Управление прокруткой страницы
// Метод scrollTo(pageX, pageY) прокручивает страницу на абсолютные координаты(pageX, pageY)
// тоже самое что и window.scroll()
function setScrollTo() {
  window.scrollTo(0, 50)
  const windowScrollTop = window.pageYOffset
  console.log(windowScrollTop)
}

function setScrollToOptions() {
  window.scrollTo({
    top: 500,
    left: 0,
    // smooth, instant, либо auto(по умолчанию)
    behavior: 'smooth',
  })
}
// опции не работают в Safari

// *** Управление прокруткой страницы
/*
  Вызов elem.scrollIntoView(top) прокручивает страницу,
  чтобы elem оказался вверху у него есть один аргумент:

  - если top = true(по умолчанию), то страница будет прокручена, 
    чтобы elem появился в верхней части окна.
    Верхний край элемента совмещен с верхней частью окна.
  - если top = false, то страница будет прокручена, чтобы elem появился внизу. Нижний край элемента будет совмещен с нижним краем окна.
*/

function setScrollIntoView(top) {
  const lessonSelected = document.querySelector('body')
  lessonSelected.scrollIntoView(top)
}

function setScrollIntoViewOptions(top) {
  const lessonSelected = document.querySelector('body')
  lessonSelected.scrollIntoView({
    // 'start', 'center', 'end' или 'nearest'. По умолчанию 'center'.
    block: 'center',
    // 'start', 'center', 'end' или 'nearest'. По умолчанию 'nearest'.
    inline: 'nearest',
    // 'auto' или 'smooth'. По умолчанию 'smooth'
    behavior: 'smooth',
  })
}
// опции не работают в Safari

// *** Управление прокруткой страницы

// Запретить прокрутку
function setEnableDisableScroll() {
  // document.body.style.overflow = 'hidden' или:
  document.body.classList.toggle('scroll-lock')
}

// *** Метрики элементов на странице

// Получаем обьект
const block = document.querySelector('.container')

// Позиция обьекта
// Свойства offsetParent, offsetLeft и offsetTop

// Получаем родительский элемент относительно которого позиционирован наш обьект
const elementOffsetParent = block.offsetParent
// Получаем позицию обьекта относительно предка (offsetParent)
const elementOffsetLeft = block.offsetLeft
const elementOffsetTop = block.offsetTop
// Общие размеры обьекта
// OffsetWidth и offsetHeight
const elementOffsetWidth = block.offsetWidth
const elementOffsetHeight = block.offsetHeight
// Отступы внутренней части элемента от внешней.
// clientTop и clientLeft
const elementClientTop = block.clientTop
const elementClientLeft = block.clientLeft
// Положение обьекта без рамок и без полосы прокрутки
// clientWidth и clientHeight
const elementScrollWidth = block.scrollWidth
const elementScrollHeight = block.scrollHeight
// Размеры обьектов включающие в себя прокрученую (которую не видно) часть, в остальном работает как и clientWidth и clientHeight
const elementClientWidth = block.clientWidth
const elementClientHeight = block.clientHeight
// Размеры прокрученой области в нутри обьекта
// scrollLeft и scrollTop
const elementscrollLeft = block.scrollLeft
const elementscrollTop = block.scrollTop
// можно задавать
// document.querySelector(body).scrollTop = 150

// Методы управления прокруткой
// scrollBy, scrollTo и scrollIntoView
// работают и для объекта

function setElementScrollBy() {
  block.scrollBy({
    top: 20,
    left: 0,
    behavior: 'smooth',
  })
}

// *** Координаты
/*
Большинство соответствующих методов JavaScript работают в
одной из двух указанных ниже систем координат:

1. Относительно окна браузера.
	(как position: fixed, отсчёт идёт от верхнего левого угла окна.)
	Принято обозначать clientX/clientY.
2. Относительно документа.
	(как position: absolute относительно <body>, отсчёт идёт от
	верхнего левого угла документа.)
	Принято обозначать pageX/pageY.

Когда страница полностью прокручена в самое начало,
то верхний левый угол окна совпадает с левым верхним
углом документа, при этом обе этих системы координат тоже совпадают.
Но если происходит прокрутка, то координаты элементов в
контексте окна меняются, так как они двигаются,
но в то же время их координаты относительно
документа остаются такими же.

*/

// *** Координаты относительно окна браузера
// getBoundingClientRect

// Получаем объект
// const item = document.querySelector('.how__image')

// Получаем координаты относительно окна браузера
// const getItemCoords = item.getBoundingClientRect()

// Получаем конкретную координату относительно окна браузера
// const getItemTopCoord = item.getBoundingClientRect().top

// *** Координаты относительно документа
// getBoundingClientRect

// Получаем объект
const item = document.querySelector('.container')

// Получаем конкретную координату относительно окна браузера
const getItemTopCoord = item.getBoundingClientRect().top

// Получаем конкретную координату относительно документа
const getItemTopDocumentCoord = getItemTopCoord + window.pageYOffset

// *** Получение объекта по координатам
// document.elementFromPoint(x, y);

const elem = document.elementFromPoint(100, 100)
