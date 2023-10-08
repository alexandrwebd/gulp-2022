// *** Поэкранный скрол - булеты (FullPage)
const bullets = document.querySelector('[data-fp-bullets]')
const bulletTemplte = `
<div class="fp-bullets">
  <span class="fp-bullet fp-bullet-active"></span>
  <span class="fp-bullet"></span>
</div>
`
if (bullets) {
  bullets.insertAdjacentHTML('beforebegin', bulletTemplte)
}
