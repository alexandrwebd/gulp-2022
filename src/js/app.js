/*
(i) Код попадает в итоговый файл, только когда вызвана функция, например flsFunction.spollers();
Или когда импортирован ввесь файл, например import "files/script.js";
Неиспользуемый (не вызваный) код в иоговый файл не попадает.

Если мне нужно добавить модуль следует его раскоментировать
*/

// Подключение основного файла стилей
// import '../scss/style.scss'

// Плагины ===================================================

/* Динамический адаптив */
// import "./modules/dynamic_adapt.js"

/* Форматирование чисел */

// Основные модули ==========================================
import * as flsFunctions from './modules/functions.js'

/* Проверка поддержки webp, добавление класа webp или no-webp
/* (i) необходимо для коректного отображения webp из css */
flsFunctions.isWebp()
/* Добавление класса touch для HTML если браузер мобильный */
/* Добавление loaded для HTML после полной загрузки страницы */
/* Модуль для работы с меню (Бургер) */
// flsFunctions.fullVHfix()

/* Модуль параллакса мишью */
// import './modules/parallax-mouse.js'

/* Модуль параллакса скроллом */
// import './modules/parallax-scroll.js'

/* Модуль анимации цифрового щетчика. Работает вместе с flsFunctions.watcher() */
// flsFunctions.digitsCounter()

/* Спостерігач за обьектами. Добавляет классы при скроле .prevision-section.next-section.active-section */
// flsFunctions.watcher()

/* 
Модуль работы со спойлерами
Документация: Снипет (HTML): spollers 
*/
// flsFunctions.spollers()
/*
Модуоь работы с табами
Документация: Снипет (HTML): tabs
*/
// import './modules/tabs.js'

/*
Модуль "показать еще"
Документация по работе в шаблоне: 
Снипет (HTML): showmore 
*/
// flsFunctions.showMore() доделать функцию

/*
Попапы
Документация по работе в шаблоне: 
Снипет (HTML): pl
Для включения ??? (подсказок в консоли) передать true
*/
// flsFunctions.initPopups(false) доделать функцию
// import './modules/popups.js'

// ======================== Функции работы со скролом
// import * as flsScroll from './modules/scroll.js'
// * Функция добавления класса _header-scroll к хедеру
// flsScroll.headerScroll()
// * Плавная навигация по странице
// flsScroll.pageNavigation()
// * Функция липкого блока
// flsScroll.stickyBlock()
// * Модуль поэкранной прокрутки
// import './modules/fullpage.js'

// Работа с формами ======================================================
import * as flsForms from './modules/forms.js'

/* Работа с полями формы: добавление классов, работа с placeholder */
// flsForms.formFieldsInit()

/* Отправка формы со встроеной валидацией полей. false - отключить валидацию */
// flsForms.formSubmit(true)

/* Модуль формы "показать пароль" */
// flsForms.formViewpass()

/* Модуль формы "количество" (Quantity) */
// flsFunctions.formQuantity()

/* Модуль звездного рейтинга */
// import './modules/rating.js'

/* Модуль работы с select. Для включения ??? (подсказок в консоли) передать true */
// flsForms.formSelect(false)

// Модуль работы с ползунком ======================================================
/*
Подключение и настройка выполняеться в файле range.js
Документация плагина: https://refreshless.com/nouislider/
*/
// import "./modules/range.js"

// Работа со слайдером (Swiper) ======================================================
// Раскоментировать файл, пути в файле path.js, и добавить пути в функциях libs.js и libs.css 

// import "./modules/swiper.js"

// Работа с Табами ======================================================
 // Описание в tabs.js
// import './modules/tabs.js'

// *** Кастомный селект *** ===================================================
// Раскоментировать импорт js файла и импорт select.scss файла в style.scss
// В файле select.js передать параметры текст плейсхолдера, id селекта, опшенсы селекта и по надобности колбек функцию для обработки выбраного селекта
// Раскоментировать link шрифта font-awesome в head
// В index.html добавить

//     <div id="select"></div>

// import './modules/select.js'

// Прочее =========================================================================

// new WOW().init()

/* Подключаем файлы со своим кодом */
import './modules/script.js'
