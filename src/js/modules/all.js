// *** Js решения с других проэктов ***

// @@include('functions.js',{})
// @@include('popups.js',{})
// @@include('forms.js',{})
// @@include('sliders.js',{})
// @@include('dynamic_adapt.js',{})
window.onload = function () {
  //  если нужно подключить другой js использовать include
  // JS-функция определения поддержки WebP
  // function testWebP(callback) {
  // var webP = new Image();
  // webP.onload = webP.onerror = function () {
  // callback(webP.height == 2);
  // };
  // webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  // }
  // testWebP(function (support) {
  // if (support == true) {
  // document.querySelector('body').classList.add('webp');
  // }else{
  // document.querySelector('body').classList.add('no-webp');
  // }
  // });

  // Делегирование
  document.addEventListener('click', documentActions)

  // Actions (делегирование события click)

  function documentActions(e) {
    // получаю элемент на который кликнул
    const targetElement = e.target
    if (window.innerWidth > 768 && isMobileOrTablet()) {
      // если этот элемент с таким классом

      if (targetElement.classList.contains('.menu__arrow')) {
        // получаю ближайшего родителя с данным классом и добавляю класс

        targetElement.closest('.menu__item').classList.toggle('hover')
      }
      if (
        // если клик не по открытом меню и открытых меню больше 1, удаляю у всех класс hover
        !targetElement.closest('.menu__item') &&
        document.querySelectorAll('.menu__item.hover').length > 0
      ) {
        removeClassest(document.querySelectorAll('.menu__item.hover'), 'hover')
      }
    }
    //открытие-закрытие формы поиска
    // Если кликнули по иконке формы то форме поиска добавить класс ектив
    if (targetElement.classList.contains('search-form__icon')) {
      document.querySelector('.search-form').classList.toggle('active')
    } else if (
      // если кликнули на документе при окрытой форме то удаляем класс ектив
      !targetElement.classList.contains('.search-form') &&
      document.querySelector('.search-form.active')
    ) {
      document.querySelector('.search-form').classList.remove('active')
    }

    // mobile menu
    if (targetElement.classList.contains('icon-menu')) {
      document.querySelector('.icon-menu').classList.toggle('active')
      document.querySelector('.menu__body').classList.toggle('active')
    }

    // add json data products card
    if (targetElement.classList.contains('products__more')) {
      e.preventDefault()
      getProducts(targetElement)
      // e.preventDefault()
    }

    // Добавление товара в корзину
    if (targetElement.classList.contains('actions-product__button')) {
      const productId = targetElement.closest('.item-product').dataset.pid
      addToCart(targetElement, productId)
      e.preventDefault()
    }

    // Добавляет клас active при клике на корзину (открывает список покупок)
    if (
      targetElement.classList.contains('cart-header__icon') ||
      targetElement.closest('.cart-header__icon')
    ) {
      if (document.querySelector('.cart-list').children.length > 0) {
        e.preventDefault()
        document.querySelector('.cart-header').classList.toggle('active')
      }
      // e.preventDefault()
    } else if (
      !targetElement.closest('.cart-header') &&
      !targetElement.classList.contains('actions-product__button')
    ) {
      // закрываю при клике на другую область
      document.querySelector('.cart-header').classList.remove('active')
    }
    // Удаляем элемент с корзины при клике
    if (targetElement.classList.contains('cart-list__delete')) {
      const productId =
        targetElement.closest('.cart-list__item').dataset.cartPid
      updateCart(targetElement, productId, false)
      e.preventDefault()
    }
  }

  // dynamic adapt
  const da = new DynamicAdapt('max')
  da.init()

  // header - при скроле добавляет класс _scroll к шапке уменьшает шапку меняяет фон
  const headerElement = document.querySelector('.header')

  // добавляет к хедеру класс _scroll когда прокручиваем на высоту шапки и наоборот
  const callback = function (entries, observer) {
    if (entries[0].isIntersecting) {
      headerElement.classList.remove('_scroll')
    } else {
      headerElement.classList.add('_scroll')
    }
  }

  const headerObserver = new IntersectionObserver(callback)
  headerObserver.observe(headerElement) // IntersectionObserver начинает следить над хедером

  // Load more products JSON
  function getProducts(button) {
    if (!button.classList.contains('_hold')) {
      // кдас _hold делает кнопку временно не активной
      button.classList.add('_hold')
      const file = 'json/products.json'

      // возвращает fetch
      sendRequest('GET', file)
        .then((data) => {
          if (data) {
            loadProducts(data)
            button.classList.remove('_hold')
            button.remove() // Удаляю кнопку чтоб не было повторных нажатий (в реальных проэктах не нужно)
          } else {
            alert('Ошибка')
          }
        })
        .catch((err) => console.log(err))
    }
  }

  // Вывод карточек товаров с JSON
  function loadProducts(data) {
    const productsItems = document.querySelector('.products__items') // контейнер для карточек товара

    data.products.forEach((item) => {
      const productId = item.id
      const productUrl = item.url
      const productImage = item.image
      const productTitle = item.title
      const productText = item.text
      const productPrice = item.price
      const productOldPrice = item.priceOld
      const productShareUrl = item.shareUrl
      const productLikeUrl = item.likeUrl
      const productLabels = item.labels

      let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`
      let productTemplateEnd = `</article>`

      let productTemplateLabels = ''
      if (productLabels) {
        let productTemplateLabelsStart = `<div class="item-product__labels">`
        let productTemplateLabelsEnd = `</div>`
        let productTemplateLabelsContent = ''

        productLabels.forEach((labelItem) => {
          productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`
        })

        productTemplateLabels += productTemplateLabelsStart
        productTemplateLabels += productTemplateLabelsContent
        productTemplateLabels += productTemplateLabelsEnd
      }

      let productTemplateImage = `
		<a href="${productUrl}" class="item-product__image _ibg">
			<img src="images/products/${productImage}" alt="${productTitle}">
		</a>
	`

      let productTemplateBodyStart = `<div class="item-product__body">`
      let productTemplateBodyEnd = `</div>`

      let productTemplateContent = `
		<div class="item-product__content">
			<h3 class="item-product__title">${productTitle}</h3>
			<div class="item-product__text">${productText}</div>
		</div>
	`

      let productTemplatePrices = ''
      let productTemplatePricesStart = `<div class="item-product__prices">`
      let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`
      let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`
      let productTemplatePricesEnd = `</div>`

      productTemplatePrices = productTemplatePricesStart
      productTemplatePrices += productTemplatePricesCurrent
      if (productOldPrice) {
        productTemplatePrices += productTemplatePricesOld
      }
      productTemplatePrices += productTemplatePricesEnd

      let productTemplateActions = `
		<div class="item-product__actions actions-product">
			<div class="actions-product__body">
				<a href="" class="actions-product__button btn btn_white">Add to cart</a>
				<a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
				<a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
			</div>
		</div>
	`

      let productTemplateBody = ''
      productTemplateBody += productTemplateBodyStart
      productTemplateBody += productTemplateContent
      productTemplateBody += productTemplatePrices
      productTemplateBody += productTemplateActions
      productTemplateBody += productTemplateBodyEnd

      let productTemplate = ''
      productTemplate += productTemplateStart
      productTemplate += productTemplateLabels
      productTemplate += productTemplateImage
      productTemplate += productTemplateBody
      productTemplate += productTemplateEnd

      productsItems.insertAdjacentHTML('beforeend', productTemplate)
    })
  }

  // AddToCart (создает эмитацию анимированого добавления товара в корзину путем создания клона и изменения его стилей)
  function addToCart(productButton, productId) {
    if (!productButton.classList.contains('_hold')) {
      productButton.classList.add('_hold')
      productButton.classList.add('_fly')

      const cart = document.querySelector('.cart-header__icon')
      const product = document.querySelector(`[data-pid="${productId}"]`)
      const productImage = product.querySelector('.item-product__image')

      const productImageFly = productImage.cloneNode(true)

      const productImageFlyWidth = productImage.offsetWidth
      const productImageFlyHeight = productImage.offsetHeight
      const productImageFlyTop = productImage.getBoundingClientRect().top
      const productImageFlyLeft = productImage.getBoundingClientRect().left

      productImageFly.setAttribute('class', '_flyImage _ibg')
      productImageFly.style.cssText = `
        left: ${productImageFlyLeft}px;
        top: ${productImageFlyTop}px;
        width: ${productImageFlyWidth}px;
        height: ${productImageFlyHeight}px;
      `

      document.body.append(productImageFly)

      const cartFlyLeft = cart.getBoundingClientRect().left
      const cartFlyTop = cart.getBoundingClientRect().top

      productImageFly.style.cssText = `
        left: ${cartFlyLeft}px;
        top: ${cartFlyTop}px;
        width: 0px;
        height: 0px;
        opacity: 0
      `

      productImageFly.addEventListener('transitionend', function () {
        if (productButton.classList.contains('_fly')) {
          productImageFly.remove()
          updateCart(productButton, productId)
          productButton.classList.remove('_fly')
        }
      })
    }
  }

  // Добавляет товары в корзину и удаляет с нее
  function updateCart(productButton, productId, productAdd = true) {
    const cart = document.querySelector('.cart-header')
    const cartIcon = document.querySelector('.cart-header__icon')
    const cartQuantity = cartIcon.querySelector('span')
    const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`)
    const cartList = document.querySelector('.cart-list')

    // Добавляем
    if (productAdd) {
      if (cartQuantity) {
        cartQuantity.innerHTML = ++cartQuantity.innerHTML // если спан уже есть добавляю 1
      } else {
        cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`)
      }

      //добавляю список товаров
      if (!cartProduct) {
        const product = document.querySelector(`[data-pid="${productId}"]`)
        const cartProductImage = product.querySelector(
          '.item-product__image'
        ).innerHTML
        const cartProductTitle = product.querySelector(
          '.item-product__title'
        ).innerHTML
        const cartProductContent = `
        <a href="#" class="cart-list__image _ibg">${cartProductImage}</a>
        <div class="cart-list__body">
          <a href="#" class="cart-list__title">${cartProductTitle}</a>
          <div class="cart-list__quantity">Quantity: <span>1</span></div>
          <a href="#" class="cart-list__delete">Delete</a>
        </div>
        `
        cartList.insertAdjacentHTML(
          'beforeend',
          `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`
        )
      } else {
        const cartProductQuantity = cartProduct.querySelector(
          '.cart-list__quantity span'
        )
        cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML
      }

      // После всех действий
      productButton.classList.remove('_hold')
    } else {
      // сначала уменьшает количество товаров, потом удаляет
      const cartProductQuantity = cartProduct.querySelector(
        '.cart-list__quantity span'
      )
      cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML
      if (!parseInt(cartProductQuantity.innerHTML)) {
        cartProduct.remove()
      }

      const cartQuantityValue = --cartQuantity.innerHTML

      if (cartQuantityValue) {
        cartQuantity.innerHTML = cartQuantityValue
      } else {
        cartQuantity.remove()
        cart.classList.remove('active')
      }
    }
  }

  // Галлерея
  const furniture = document.querySelector('.furniture__body')

  if (furniture && !isMobileOrTablet()) {
    const furnitureItems = document.querySelector('.furniture__items')
    const furnitureColumn = document.querySelectorAll('.furniture__column')

    // Скорость анимации
    const speed = furniture.dataset.speed

    // Обновление переменных
    let positionX = 0
    let coordXprocent = 0

    function setMouseGalleryStyle() {
      let furnitureItemsWidth = 0
      furnitureColumn.forEach((element) => {
        furnitureItemsWidth += element.offsetWidth
      })

      const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth
      const distX = Math.floor(coordXprocent - positionX)

      positionX = positionX + distX * speed
      let position = (furnitureDifferent / 200) * positionX

      furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`

      if (Math.abs(distX) > 0) {
        requestAnimationFrame(setMouseGalleryStyle)
      } else {
        furniture.classList.remove('_init')
      }
    }
    furniture.addEventListener('mousemove', function (e) {
      // Получение ширины
      const furnitureWidth = furniture.offsetWidth

      // Ноль по середине
      const coordX = e.pageX - furnitureWidth / 2

      // Получаем проценты
      coordXprocent = (coordX / furnitureWidth) * 200

      if (!furniture.classList.contains('_init')) {
        requestAnimationFrame(setMouseGalleryStyle)
        furniture.classList.add('_init')
      }
    })
  }
  // ==================================================================
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
  const block = document.querySelector('.how__image')

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
  const item = document.querySelector('.how__image')

  // Получаем конкретную координату относительно окна браузера
  const getItemTopCoord = item.getBoundingClientRect().top

  // Получаем конкретную координату относительно документа
  const getItemTopDocumentCoord = getItemTopCoord + window.pageYOffset

  // *** Получение объекта по координатам
  // document.elementFromPoint(x, y);

  const elem = document.elementFromPoint(100, 100)
}
