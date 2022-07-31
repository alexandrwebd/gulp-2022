import * as flsForms from './functions.js'

// Табы
// id табам задавать уникальные

 // Структура HTML
   //     <div class="tabs">
   //        <nav class="tabs-items">
   //          <button data-tab="#tab_1" class="tabs-item">Кнопка</button>
   //        </nav>
   //        <div class="tebs-body">
   //          <div id="tab_1" class="tabs-body__item">Контент</div>
   //        </div>
   //      </div>


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
        if (!tabItem.classList.contains('active')) {
          // кнопки
          const thisBtn = tabItem.parentElement.children
          // слайдеры
          const tabsBody = tabItem.parentElement.nextElementSibling.children
          // получаю id с дата атрибута таба
          const tabId = tabItem.dataset.tab
          // получаю id таб элемента с дата атрибута кнопки
          const tabBodyItem = document.querySelector(tabId)

          // удаляю
          flsForms.removeClassest(thisBtn, 'active')
          flsForms.removeClassest(tabsBody, 'active')
          // добавляю
          tabItem.classList.add('active')
          tabBodyItem.classList.add('active')
        }
      }
    })
  })
}
// Имитация нажатия на первую кнопку чтоб добавить класс active при загрузке

document.querySelector('.courses__tabs-item').click()
// document.querySelector('.reviews__tabs-items').click()
