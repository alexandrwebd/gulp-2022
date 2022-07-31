// Модуль паррллакса иышью

// Подключение функционала

// import {isMobile, FLS, flsModules} from "./functions.js"
import { FLS } from './functions.js'

/* Предмету который будет двигаться за мышью указать атрибут data-prlx-mouse-wrapper

// ============================
Если нужны дополнительные настройки, указать

Атрибут                               Значение по умолчанию
---------------------------------------------------------------------------------------------------------------------------------------
data-prlx-cx="коэффициент_x"          100                     значение больше - меньше процентов
data-prlx-cy="коэффициент_y"          100                     значение больше - меньше процентов
data-prlx-dxr                                                 против оси X
data-prlx-dyr                                                 против оси Y
data-prlx-a="скорость_анимации"       50                      больше значение - больше скорость

// ===========================
Если нужно считывать движение мыши в блоке-родителе - тому родителю указать атрибут data-prlx-mouse

Если в параллаксе картинка - растянуть ее на больше 100%
Например:
width: 130%;
height: 130%;
top: -15%;
left: -15%;

*/

class MousePRLX {
  constructor(props, data = null) {
    let defaultConfig = {
      init: true,
      logging: true,
    }
    this.config = Object.assign(defaultConfig, props)
    if (this.config.init) {
      const paralaxMouse = document.querySelectorAll('[data-prlx-mouse]')
      if (paralaxMouse.length) {
        this.paralaxMouseInit(paralaxMouse)
        this.setLogging(
          `Проснулся, слежу за обьектами: (${paralaxMouse.length})`
        )
      } else {
        this.setLogging('Нет ни одного обьекта. Сплю...zzZZ')
      }
    }
  }

  paralaxMouseInit(paralaxMouse) {
    paralaxMouse.forEach((el) => {
      const paralaxMouseWrapper = el.closest('[data-prlx-mouse-wrapper]')

      // Коэф. X
      const paramCoefficientX = el.dataset.prlxCx ? el.dataset.prlxCx : 100
      // Коэф. Y
      const paramCoefficientY = el.dataset.prlxCy ? el.dataset.prlxCy : 100
      // Напр. X
      const directionX = el.hasAttribute('data-prlx-dxr') ? -1 : 1
      // Напр. Y
      const directionY = el.hasAttribute('data-prlx-dyr') ? -1 : 1

      // Скорость анимации
      const paramAnimation = el.dataset.prlxA ? el.dataset.prlxA : 50

      // Обьявление переменных
      let positionX = 0,
        positionY = 0
      let coordXprocent = 0,
        coordYprocen = 0

      setMouseParallaxStyle()

      // Проверяю на наличие родителя, в котором будет считываться положение мыши
      if (paralaxMouseWrapper) {
        mouseMoveParalax(paralaxMouseWrapper)
      } else {
        mouseMoveParalax()
      }

      function setMouseParallaxStyle() {
        const distX = coordXprocent - positionX
        const distY = coordYprocen - positionY
        positionX = positionX + (distX * paramAnimation) / 1000
        positionY = positionY + (distY * paramAnimation) / 1000
        el.style.cssText = `transform: translate3D(${
          (directionX * positionX) / (paramCoefficientX / 10)
        }%,${(directionY * positionY) / (paramCoefficientY / 10)}%,0)`
        requestAnimationFrame(setMouseParallaxStyle)
      }

      function mouseMoveParalax(wrapper = window) {
        wrapper.addEventListener('mousemove', function (e) {
          const offsetTop = el.getBoundingClientRect().top + window.scrollY
          if (
            offsetTop >= window.scrollY ||
            offsetTop + el.offsetHeight >= window.scrollY
          ) {
            //Получение ширины и высоты блока
            const parallaxWidth = window.innerHeight
            const parallaxHeight = window.innerHeight
            // Ноль по середине
            const coordX = e.clientX - parallaxWidth / 2
            const coordY = e.clientY - parallaxHeight / 2
            // Получаем проценты
            coordXprocent = (coordX / parallaxWidth) * 100
            coordYprocen = (coordY / parallaxHeight) * 100
          }
        })
      }
    })
  }
  // Логгин в консоль
  setLogging(message) {
    this.config.logging ? FLS(`[PRLX Mouse]: ${message}`) : null
  }
}

// Запускаем и добавляем в обьект модулей
const mousePrlx = new MousePRLX({})
