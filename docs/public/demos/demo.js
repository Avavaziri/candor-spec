// Shared demo helpers: theme from ?theme=, and disclosure buttons.
const theme = new URLSearchParams(location.search).get('theme')
if (theme === 'dark' || theme === 'light') document.documentElement.dataset.theme = theme

document.addEventListener('click', (event) => {
  const button = event.target.closest('button[aria-controls][aria-expanded]')
  if (!button) return
  const panel = document.getElementById(button.getAttribute('aria-controls'))
  const open = button.getAttribute('aria-expanded') !== 'true'
  button.setAttribute('aria-expanded', String(open))
  panel.hidden = !open
})
