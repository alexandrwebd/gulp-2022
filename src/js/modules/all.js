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

     // *** accordeon изменение цвета фона ==================

    // Поручаю все элементы li
    const spollerItems = document.querySelectorAll('.questions__item')

    // если кликнул по кнопке
    if (targetElement.classList.contains('questions__btn')) {
      //  и у нее нету активного класса
      if (
        !targetElement.parentElement.classList.contains(
          'questions__item--active'
        )
      ) {
        // удаляю класс у всех активных элементов li
        flsForms.removeClassest(spollerItems, 'questions__item--active')
        // добавляю класс у родителя кнопки по которой кликнул
        targetElement.parentElement.classList.add('questions__item--active')
      } else if (
        targetElement.parentElement.classList.contains(
          'questions__item--active'
        )
      ) {
        // если при клике у элемента уже есть активный класс то удаляю активный класс
        targetElement.parentElement.classList.remove('questions__item--active')
      }
    }
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
}

// Тренировка accordion ===================================================================

//Универсальная FETCH функция для работы с API используя промисы(resolve, reject)
//resolve вызываеться когда успех
//reject вызываеться когда есть ошибка

function sendRequest(method, url, body = null) {
  const headers = {
    'Content-Type': 'application/json',
  }

  // метод принимает 2 параметра url и обьект настроек при GET
  return fetch(url, {
    method: method,
    //  body: JSON.stringify(body),
    headers: headers,
  }).then((response) => {
    if (response.ok) {
      return response.json()
    }

    return response.json().then((error) => {
      const e = new Error('Что-то пошло не так')
      e.data = error
      throw e
    })
  })
}

const requestURL = 'https://jsonplaceholder.typicode.com/users'

//тренировочный обьект
const contentData = [
  {
    id: 1,
    title: 'Title 1',
    content: 'Content 1',
  },
  {
    id: 2,
    title: 'Title 2',
    content: 'Content 2',
  },
  {
    id: 3,
    title: 'Title 3',
    content: 'Content 3',
  },
  {
    id: 4,
    title: 'Title 3',
    content: 'Content 3',
  },
  {
    id: 5,
    title: 'Title 4',
    content: 'Content 4',
  },
]


const accordionWrapper = document.querySelector('.accordeons-wrapper')
let accordionsItems

accordionWrapper.addEventListener('click', wrapperActions)


function fillHtmlList (data) {
    data.forEach(item => {
        if (accordionWrapper) {
            accordionWrapper.innerHTML += printHtml(item)
        }
    })
    accordionsItems = document.querySelectorAll('.accordeons-item')
}

function printHtml(data) {
    return `
        <div class="accordeons-item">
        <div class="accordeons-item-title">${data.name}</div>
        <div class="accordeon-items-content">${data.username}</div>
      </div>
    `
}
function wrapperActions (e) {
    const targetElement = e.target
    if(targetElement.classList.contains('accordeons-item-title')) {
        if (targetElement.parentElement.classList.contains('active')){
            targetElement.parentElement.classList.remove('active')
        } else {
            if (accordionsItems.length > 0) {
                accordionsItems.forEach(item => {
                    item.classList.remove('active')
                })
            }

            targetElement.parentElement.classList.add('active')
        }

    }
}


// делаю запрос по API
const request = sendRequest('GET', requestURL)
    .then((accordeonsData) => {
        if (accordeonsData) {
            // запускаю функцию распечатывания
            fillHtmlList(accordeonsData)
        }
    })
    .catch((err) => console.log(err))


// закрывает аккордеон при клике на документ
    document.addEventListener('click', function (e) {
      if (!e.target.classList.contains('accordeons-item-title')) {
        for (let el of accordionsItems) {
                el.classList.remove('active')
        }
      }
    })

// fillHtmlList()

// *** Изменнение теммы сайта ===========================================================
  if (localStorage.getItem('theme') === 'dark') {
    document.querySelector('html').classList.add('dark')
  }
  document.querySelector('.theme-toggle').addEventListener('click', (e) => {
    e.preventDefault()
    if (localStorage.getItem('theme') === 'dark') {
      localStorage.removeItem('theme')
    } else {
      localStorage.setItem('theme', 'dark')
    }
    addDarkClassToHTML()
  })

  function addDarkClassToHTML() {
    try {
      if (localStorage.getItem('theme') === 'dark') {
        document.querySelector('html').classList.add('dark')
        // меняю цвет кнопки или можно менять класс иконочного шрифта
        document.querySelector('.theme-toggle').classList.add('active')
      } else {
        document.querySelector('html').classList.remove('dark')
        document.querySelector('.theme-toggle').classList.remove('active')
      }
    } catch (err) {}
  }

  addDarkClassToHTML()
}
