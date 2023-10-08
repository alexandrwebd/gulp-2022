# Gulp

// запуск Gulp в режиме разработчика - npm run dev
// запуск Gulp в режиме продакшин - npm run build
// запуск Gulp в режиме продакшин c созданием zip архива - npm run zip
// выгрузка проэкта на удаленный FTP сервер (заполнить конфигурационный файл ftp.js в папке config и указать название папки в файле path.js) - npm run deploy
// создание svg спрайта -> помещаем нужные svg в папку svgicons - npm run svgSprive
// на windows плагин конвертации шрифтов gulp-fonter-unx переустановить на gulp-fonter
// gulp.watch(path.watch.html, gulp.series(html, ftp)) - изменяем задачи в слежении если хотим чтобы файлы автоматически обновлялись на FTP
// Перед инициализацией нового проэкта в файле package.json удалить галочку у плягина webp-converter, в остальных плагинов поменять версии на слово "latest" чтоб установилась последняя версия
// Для нового проэкта нам нужны только gulp, src, gulpfile.js, package.json и команда npm i в терминале проэкта
// Для работы с pug все html файлы переиминовать в pug, изменить пути в файле path.js в src и wach. Закоментировать .pipe(fileInclude) в html.js и разкоментировать .pipe(pug(...))
// js файлы теперь можем импортировать с других папок - import \* as flsFunctions from './modules/functions.js' вызывать flsFunctions.isWebp()
// Установить false js.js если не нужно сжимать js в продакшин
// Библиотеки сначала установить, добавить путь в обьект с путями - подключать в функцию libs, добавить путь к css и js в масив src([path.src.swiperCss]) и return src([path.src.swiperJs]) - старый вариант. Сейчас с помощью webpack их можно установить и импортировать с node_modules.
// для конвертации шрифтов поместить шрифты ttf2 в папку src/fonts
// для коректной выгрузки иконок с figma, выделяю shift + comand + O
// IcoMoon App - настройки для иконочных шрифтов Font Name: icons, Class Prefix: \_icon-
// с сгенерированых шрифтов нужен только icons.ttf(поместить в Fonts) и шрифты с файла style.css в icons.scss
// перед конвертацией шрифтов файл \_fonts.scss должен быть абсолютно пустым без пробелов, после в нем поменять font-weight и поменять в единое семейство шрифта в первом слове, можно вынести в отдельную функцию
// svgSprite создает svg sprite (собирает все svg в один файл) помещаем нужные svg в папку svgicons, вызываеться отдельно в новом терминале командой npm run svgSprive, создает html файл презентацию иконок (открываем в редакторе и смотрим как подключить svg в верстке)
// gulp otf2ttf конвертирует шрифты otf2 в ttf и перемещает в папку исходников для дальнейшей конвертации, запускаеться автоматически если еще не создан файл fonts.scss
// для исправления пути otf2ttf открываем node_module/gulp-fonter/dist/index.js находим строку newFont.path = source.dirname + '\\' меняем на '/'
// функция libs конвертирует файлы используемых библиотек в файл libs. Библиотеки устанавливать и добавлять путь в мвссив src
// стили сброшены normalize css, подключены @import в style.scss и в параметрах плагина scss
// протестировать плагины webp css оставить один, протестировать webp html
// lazysizes поюзать плагин ленивой подгрузки картинок и gulp-sharp-responsive

# Swiper slider

код в swiper.js или sliders.js(устаревший)
чтоб подключить swiper slider - в html создать блок с классом**slider -> в нем с классом**swiper -> в нем с классом\_\_slide (скрипт автоматически добавит нужные классы). Тоесть при создании слайдера должно быть 3 вложености.
Скрипт добавит классы для работы слайдера - swiper: главному блоку (обычно имеет класс slider который передаем при инициализации Swiper), swiper-wrapper: оболочке, swiper-slide: для слайдеров.
раскоментировать путь в gulpfile.js, инициализировать слайдер в swiper.js
чтоб сделать изображение адаптивным к обвертке изображения добавить класс \_ibg
Для добавления паралакса, блоку с контентом можно добавить data-swiper-parallax-opaciti="0" data-swiper-parallax-x="-100%"

# Аккардеон

Для родителя спойлера пишем атрибут data-spollers
Для заголовков слайдеров пишем атрибут data-spoller
Если нужно обеспечить работу спойлеров на всех размерах экранов пишем data-spollers без параметров
Если нужно выключить\включить работу спойлеров на разных размерах экранов пишем параметры ширины и типа брекпоинта.
Например:
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно чтобы в блоке открывалься только один спойлер добавляем к аирибуту data-spollers
Для заголовков слайдеров пишем атрибут data-spollers атрибут data-one-spoller
Структура кода:

<ul data-one-spoller data-spollers="" class="block__list">
<li class="block__item">
<button data-spoller type="submit" class="block__btn">
Вопрос 1. и длинный текст описания вопроса.
</button>
<p>
Бухгалтер с практическим 28 летним опытом, економист,
практикующий массажист, автор методики 'Копейка гривну
бережет'
</p>
</li>
</ul>

# Попап

код в popups.js
Для ссылки, кнопки или другого элемента добовляем класс .popup-link и дата атрибут data-popup="#id попапа" с айди папапа(#popup-1)
Для самого попап добавляем id c таким же именем (id="popup-1") и клас popup
const timeout = 800 - должен соответствовать транзишену с которим появляеться анимация
.lock-padding - клас добавляю для фиксированых обьектов headeru (если он фиксирован) и контенту попапа, чтоб не сдвигался на ширину ползунка прокрутки после открытия

# Форма

Форме добавляю класс .form, инпуту добавляю data атрибут data-value с текстом плейсхолдера
инпутам которые нужна валидация, добавляю класс \_reg
инпуту с валидацией на email добавляем к \_reg класс \_email
раскоментировать стили в style.css
при прохождении валидации открываеться попап, код отправки данных закоментирован
код в forms.js

# Модуль паррллакса иышью

Предмету который будет двигаться за мышью указать атрибут data-prlx-mouse-wrapper

Если нужны дополнительные настройки, указать

Атрибут ------------------------------ Значение по умолчанию

data-prlx-cx="коэффициент_x" --------- 100 значение больше - меньше процентов
data-prlx-cy="коэффициент_y" --------- 100 значение больше - меньше процентов
data-prlx-dxr ------------------------ против оси X
data-prlx-dyr ------------------------ против оси Y
data-prlx-a="скорость анимации" ------ 50 больше значение - больше скорость

Если нужно считывать движение мыши в блоке-родителе - тому родителю указать атрибут data-prlx-mouse

Если в параллаксе картинка - растянуть ее на больше 100%
Например:
width: 130%;
height: 130%;
top: -15%;
left: -15%;

# Модуль паррллакса иышью

Секции родителю [data-prlx-scroll-wrapper]
Врапперу изображения [data-prlx-scroll]
Изображению [data-prlx-scroll-item]

# Функции работы со скролом

flsScroll
Функция добавления класса \_header-scroll к хедеру
flsScroll.headerScroll()
Плавная навигация по странице
flsScroll.pageNavigation()
Функция липкого блока
flsScroll.stickyBlock()
Модуль поэкранной прокрутки

# Динамический адаптив (Dynamic Adapt)

JS функция для комфортной адаптивной верстки. Позволяет "перебрасывать" объекты DOM в зависимости от потребностей.

## Применение.

Для перещаемого объекта пишем HTML атрибут - `data-da` и указываем параметры.  
В javaScript создаем объект класса DynamicAdapt с параметором "min" или "max".  
Тип срабатывания брейкпоинта. max - Desktop First, min - Mobile First.  
Вызываем метод .init()

```js
const da = new DynamicAdapt('max')
da.init()
```

## Параметры

`data-da="куда,когда,какой"`

| Название            | Значение по-умолчанию | Описание                                                                                                                                               |
| ------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `куда (имя класса)` | _\[обязательный\]_    | Класс блока, в который нужно будет "перебросить" текущий объект. Если класс не уникален, объек перебросится в первый элемент с этим классом.           |
| `когда`             | 767                   | Брейкпоинт при котором перемещать объект.                                                                                                              |
| `какой`             | last                  | Позиция на которую нужно переместить объект внутри родителя `куда`. Кроме цифр можно указать слова `first` (в начало блока) или `last` (в конец блока) |

## Примеры

```html
<div data-da=".content__column-garden" class="content__block">Я Коля</div>
<div data-da=".content__column-garden,992" class="content__block">Я Коля</div>
<div data-da=".content__column-garden,992,2" class="content__block">Я Коля</div>
<div data-da=".content__column-garden,992,2" class="content__block">Я Коля</div>
```

# Кастомный селект

- Раскоментировать импорт js файла в app.js и импорт select.scss файла в style.scss
- В файле select.js передать параметры текст плейсхолдера, id селекта, опшенсы селекта и по надобности колбек функцию для обработки выбраного селекта
- Раскоментировать link шрифта font-awesome в head
- в index.html вставить блок
   
        <div id="select"></div>

# Checkbox, radio стили в файлах scss. Раскоментировать подключение в style.scss

# Звездный рейтинг

раскоментировать подключение в app.js
снипет: rating
для работы нужны классы: rating rating_set
для отправки данных на сервер: data-ajax="true"

<div data-ajax="true" class="rating rating_set">
    <div class="rating__body">
      <div class="rating__active"></div>
      <div class="rating__items">
        <input type="radio" class="rating__item" name="rating" value="1"/>
        <input type="radio" class="rating__item" name="rating" value="2"/>
        <input type="radio" class="rating__item" name="rating" value="3"/>
        <input type="radio" class="rating__item" name="rating" value="4"/>
        <input type="radio" class="rating__item" name="rating" value="5"/>
      </div>
    </div>
    <div class="rating__value">1.6</div>
</div>

# Range slider ползунок
Реализован с помощью плагина noUiSlider
Установить: npm install nouislider
Раскоментировать пути в файле path.js
Добавить пути в файлах libsCss, libsJs
Если нужно изменять стили - подключть из файла range.scss раскоментировав range в style.scss
 Код Range ползунка в html
 <div data-range class="price-filter__body">
   <div class="price-filter__inputs">
     <input
       data-range-from="0"
       value="500"
       autocomplete="off"
       name="form[]"
       type="text"
       class="price-filter__input"
     />
     <input
       data-range-to="5000"
       value="1000"
       autocomplete="off"
       name="form[]"
       type="text"
      class="price-filter__input"
     />
   </div>
   <div data-range-item class="price-filter__range"></div>
 </div>

#  Tabs Табы
Раскоментировать путь к файлу в app.js
Значения в дата атрибутах кнопок должно совпадать с id контента и быть уникальными
Добавляеться класс к _tab-active к активным кнопкам и контенту
Снипет tabs
<div class="$1">
  <nav class="$1__navigation tabs-items">
    <button data-tab="#$1__tab-1" type="submit" class="$1__title tabs-item _tab-active">Tab 1</button>
    <button data-tab="#$1__tab-2" type="submit" class="$1__title tabs-item">Tab 2</button>
    <button data-tab="#$1__tab-3" type="submit" class="$1__title tabs-item">Tab 3</button>
  </nav>
  <div class="$1__content">
    <div id="$1__tab-1" class="$1__body">
      1 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, modi.
    </div>
    <div id="$1__tab-2" class="$1__body">
      2 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, modi.
    </div>
    <div id="$1__tab-3" class="$1__body">
      3 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, modi.
    </div>
  </div>
</div>

# FullPage Поэкранная прокрутка

[JS] Уфайле js/app.js раскоментировать строку import './modules/fullpage.js'
[SCSS] У файле src/scss/style.scss раскоментировать строку @import 'fullpage';
[HTML] Использовать снипет fullpage або построить HTML структуру самостоятельно:

  <div data-fp class="$1">  
    <div data-fp-section class="$1__section"></div>
    ...
  </div>
НАСТРОЙКА МОДУЛЯ
Булеты
Есть возможность добавить кнопки переключения секций (булеты). Для этого к обьекту с дата атрибутом data-fp добавить атрибут 
data-fp-bullets
  <div data-fp data-fp-bullets class="$1">  
    <div data-fp-section class="$1__section"></div>
    ...
  </div>

# Переключение языка 
Код в functions.js
  // import { langArr } from '../../files/lang.js' // подключаем файл с обьектом перевода образец обьекта:
  // export const langArr = {
  //   'button-more': {
  //     ua: 'Дізнатись детальніше',
  //     ru: 'Узнать подробнее',
  //   },
  //   'menu-1': {
  //     ua: 'Про нас',
  //     ru: 'О нас',
  //   },
  // }

# Модуль анимации цифрового щетчика
Раскоментировать вызов функции в app.js
Добавить дата параметр со значением конечной цыфры елементу с цыфрами: data-digits-counter="80"

## Фичи

- чтоб нормально выгрузить иконку с фигмы, сначала выбираем и shift + command + o
- иконочный шрифт на создавать сервисе icomoon->импортиркю иконки->удаляю все цвета чтобы все было одноцветным->выделяю, конвертирую, если нужно меняю названия->в настройках Font Name - (icons), Class Prefix - (\_icon-)->качаю все в папку fonts->оставляю только icons.ttf а с файла style.css беру классы шрифтов и вставляю их в fonts/icons.scss
- адаптивное свойство (av) - миксин который позволяет уменьшать любое свойство в заданом диапазоне @include adaptiv-value('padding-bottom', 44, 30, 1);
- order меняет расположение flex элементов
- сработает на устройствах с мишью (ah) @media (any-hover: hover) {
  &:hover {
  $1
  }
  }
- сработает на устройствах с тач (ahn) @media (any-hover: none) {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  }
- стили применяються ко всем элементам кроме последнего &:not(:last-child) {
  margin: 0px 0px $1 0px;
  }
- расположение абсолютных обьектов нужно делать в % относительно основного элемента, чтоб при адаптиве они были вместе
- функция относительных величин percent($1,$2), вызываеться снипетом - pr
- просто разделить 2 числа, снипетом - del
- адаптивный отступ отступ в низ 32px относительно размера шрифта 40px margin: 0px 0px 32px/40px \* 1em 0px;
- адаптивное изображение (высота картинки должна быть 301 на ширине 285) padding: 0px 0px 301px/285px \* 100% 0px; размер задаеться паддингом
- адаптивный размер: flex: 0 0 465 / 1240 \* 100%; // ширину элемента делю на ширину ограничующего контейнера
- адаптивный line-height: 20 / 16 \* 100%; // line-height делим на размер шрифта и умножаю на 100%
- Отзывчивый line-height(lihe-height, font-size) миксин, вызываеться снипетом av

(fl) flex: 1 1 auto; позволяет элементу увеличиваться и сдвигать другие элементы в стороны
align-self: flex-start; элемент прижимаеться к началу
align-self: flex-end; элемент прижимаеться к концу
align-items: stretch; позволяет элементам резиниться
gap: 20px; задает отступы в нутри флекс контейнера
использовать вертикальные падинги безопасности в блоках и горизонтальные в элементах

- сласс \_ibg делает изображение абсолютным и адаптивным
- сласс \_ibg-contain делает изображение отзывчивым

- scss цыкл с помощью которого можно установить количество колонок в
  @for $var from 1 to 6 {
      &_#{$var} {
  grid-template-columns: repeat($var, minmax(auto, 320px));
  }
  }
- размыте фона (бекдроп фильтер)
  background: rgba(255, 255, 255, 0.9); // изначально
  /_ Если браузер потдерживает backdrop-filter _/
  @supports (
  (-webkit-backdrop-filter: blur(31px)) or (backdrop-filter: blur(31px))
  ) {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(31px);
  }
- На разрешении меньше 480px делаю слайд слайдера на ввесь экран @media (max-width: $md4+px) {
  margin: 0px -15px;
  }
- Для вставки изображения используем алиас @img/img.jpg
- Подключение иконочного шрифта с scss для класса пишем:
  @extend %ic;
  @extend .\_icon-logo;(например)
- Для подключения скрипта с файла functions используем импрорт import \* as flsFunctions from './modules/functions.js' например flsFunctions.isWebp()
- вставка svg спрайта в html:
  <svg>
  <use
        xlink:href="@img/icons/icons.svg#advantages-element">
  </use>
  </svg>
  - нумерованый список псевдоэлементом
    .list {
    list-style-type: none;
    counter-reset: item;
    &\_\_item {
    display: flex;
    &::before {
    counter-increment: item;
    content: counter(item);
  - Автоматическая сетка карточек на гридах. При уменьшении карточки до 300px она перескакивает и занимает свою ширину.
    grid-template-columns: repeat(auto-fit, minmax(rem(300), 1fr));
  - Плагин условных едениц проценты в css делим и выбираем результат
  - Как сделать два блока 1 с фоном выходит за контейнер 2 с текстом и изображение по центру:
  	делаем отступ в сторону @include adaptiv-value('padding-left', 240, 30, 1); фон делаем псевдоэлементом с относительной шириной 
  	 &::before {
      content: '';
      position: absolute;
      height: 100%;
      left: 0;
      top: 0;
      width: 37.5%; /* 720/1920 */
      background: rgba(196, 196, 196, 0.3);
    }
