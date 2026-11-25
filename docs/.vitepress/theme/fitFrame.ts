// Sizes a same-origin demo iframe to its content, so the demo never scrolls inside the page.
export function fitFrame(event: Event) {
  const frame = event.target as HTMLIFrameElement
  const doc = frame.contentDocument
  if (!doc) return
  const fit = () => (frame.style.height = `${Math.ceil(doc.body.getBoundingClientRect().height)}px`)
  fit()
  new ResizeObserver(fit).observe(doc.body)
}
