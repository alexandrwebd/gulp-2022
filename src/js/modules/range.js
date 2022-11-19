// Подключение из node_modules (или подключаем через task libsCss, libsJs)
// Если нужно изменять стили - подключть из файла range.scss раскоментировав range в style.scss
// import * as noUiSlider from 'nouislider'

// Подключение стилей из node_modules
// import 'nouslider/dist/nouslider.css'

// Код Range ползунка в html
// <div data-range class="price-filter__body">
//   <div class="price-filter__inputs">
//     <input
//       data-range-from="0"
//       value="500"
//       autocomplete="off"
//       name="form[]"
//       type="text"
//       class="price-filter__input"
//     />
//     <input
//       data-range-to="5000"
//       value="1000"
//       autocomplete="off"
//       name="form[]"
//       type="text"
//       class="price-filter__input"
//     />
//   </div>
//   <div data-range-item class="price-filter__range"></div>
// </div>

export function rangeInit() {
  // ============================
const rangeItems = document.querySelectorAll('[data-range]')
  if (rangeItems.length) {
    rangeItems.forEach((rangeItem) => {
      const fromValue = document.querySelector('[data-range-from]')
      const toValue = document.querySelector('[data-range-to]')
      const item = document.querySelector('[data-range-item]')

      noUiSlider.create(item, {
        start: [Number(fromValue.value), Number(toValue.value)], // [0,200000]
        connect: true,
        tooltips: [true, true],
        range: {
          min: [Number(fromValue.dataset.rangeFrom)],
          max: [Number(toValue.dataset.rangeTo)],
        },
      })
      //связка з инпутами (в документации)
      item.noUiSlider.on('update', function (values, handle) {
        fromValue.value = values[handle]
        toValue.value = values[handle]
      })
    })
  }
  // ============================
  // const priceSlider = document.querySelector('#range')
  // if (priceSlider) {
  //   let textFrom = priceSlider.getAttribute('data-from')
  //   let textTo = priceSlider.getAttribute('data-to')
  //   noUiSlider.create(priceSlider, {
  //     start: 0, // [0,200000]
  //     connect: [true, false],
  //     range: {
  //       min: [0],
  //       max: [200000],
  //     },
  //   })
    // const priceStart = document.getElementById('price-start')
    // const priceEnd = document.getElementById('price-end')
    // priceStart.addEventListener('change', setPriceValues)
    // priceEnd.addEventListener('change', setPriceValues)
  //   function setPriceValues() {
  //     let priceStartValue
  //     let priceEndValue
  //     if (priceStart.value != '') {
  //       priceStartValue = priceStart.value
  //     }
  //     if (priceEnd.value != '') {
  //       priceEndValue = priceEnd.value
  //     }
  //     priceSlider.noUiSlider.set([priceStartValue, priceEndValue])
  //   }
  // }
}
rangeInit()
