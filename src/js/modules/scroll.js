//Записываем, сколько проскроллено по вертикали
let scrollpos = window.scrollY

const header = document.querySelector('.header')

//Сколько пикселей нужно проскролить, чтобы добавить класс. Можете изменить значение
const scrollChange = 1

//Функция, которая будет добавлять класс
const add_class_on_scroll = () => header.classList.add('_header-scroll')

//Функция, которая будет удалять класс
const remove_class_on_scroll = () => header.classList.remove('_header-scroll')

export function headerScroll() {
  //Отслеживаем событие "скролл"
  window.addEventListener('scroll', function () {
    scrollpos = window.scrollY

    //Если прокрутили больше, чем мы указали в переменной scrollChange, то выполняется функция добавления класса
    if (scrollpos >= scrollChange) {
      add_class_on_scroll()
    } else {
      remove_class_on_scroll()
    }
  })
}
