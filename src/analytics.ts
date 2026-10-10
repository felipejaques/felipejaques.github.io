type GoatCounter = { count: (vars: { path: string; title?: string; event?: boolean }) => void }

declare global {
  interface Window { goatcounter?: Partial<GoatCounter> }
}

/** "Finanças pessoais" -> "financas-pessoais", so event names stay readable in the GoatCounter dashboard. */
export const slugify = (text: string) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/**
 * Counts a custom event in GoatCounter (cookieless; loaded from index.html).
 * A no-op when the script is blocked, still loading or running on localhost.
 * Plain link clicks are tracked declaratively with the `data-goatcounter-click` attribute instead.
 */
export function trackEvent(path: string, title?: string) {
  window.goatcounter?.count?.({ path, title, event: true })
}
