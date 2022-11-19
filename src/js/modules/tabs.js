import * as flsFunctions from './functions.js'
// Табы
// id табам задавать уникальные
const tabsBtn = document.querySelectorAll('.tabs-item') // кнопки
const tabsBtns = document.querySelectorAll('.tabs-items') // блоки с кнопками для делегирования

tabsBtn.forEach((item) => {
  item.addEventListener('click', onTabClick)
})

function onTabClick() {
  tabsBtns.forEach((itemsBtn) => {
    itemsBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      const tabItem = e.target
      if (tabItem.classList.contains('tabs-item')) {
        // выполняю действия только если у таба нету класса active
        if (!tabItem.classList.contains('_tab-active')) {
          // кнопки
          const thisBtn = tabItem.parentElement.children
          // контент
          const tabsBody = tabItem.parentElement.nextElementSibling.children
          // получаю id с дата атрибута таба
          const tabId = tabItem.dataset.tab
          // получаю id таб элемента с дата атрибута кнопки
          const tabBodyItem = document.querySelector(tabId)

          // удаляю
          flsFunctions.removeClassest(thisBtn, '_tab-active')
          flsFunctions.removeClassest(tabsBody, '_tab-active')
          // добавляю
          tabItem.classList.add('_tab-active')
          tabBodyItem.classList.add('_tab-active')
        }
      }
    })
  })
}
// Имитация нажатия на первую кнопку чтоб добавить класс active при загрузке

// document.querySelector('.courses__tabs-item').click()
// document.querySelector('.reviews__tabs-items').click()
