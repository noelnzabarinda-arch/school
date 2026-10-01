import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { DEFAULT_DESC, origin, PAGE_SEO, SITE_NAME } from '../seo'

export default function Seo() {
  const { pathname } = useLocation()
  const page = PAGE_SEO[pathname] ?? {
    title: SITE_NAME,
    description: DEFAULT_DESC,
  }

  useEffect(() => {
    const base = origin()
    const url = `${base}${pathname}`
    const image = `${base}/og.jpg`
    const logo = `${base}/logo.jpg`

    document.title = page.title

    const meta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name'
      let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.content = content
    }

    const link = (rel: string, href: string) => {
      let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
      if (!el) {
        el = document.createElement('link')
        el.rel = rel
        document.head.appendChild(el)
      }
      el.href = href
    }

    meta('description', page.description)
    meta('og:title', page.title, true)
    meta('og:description', page.description, true)
    meta('og:type', 'website', true)
    meta('og:url', url, true)
    meta('og:image', image, true)
    meta('og:site_name', SITE_NAME, true)
    meta('twitter:card', 'summary_large_image')
    meta('twitter:title', page.title)
    meta('twitter:description', page.description)
    meta('twitter:image', image)
    link('canonical', url)

    let json = document.getElementById('ld-org')
    if (!json) {
      json = document.createElement('script')
      json.id = 'ld-org'
      ;(json as HTMLScriptElement).type = 'application/ld+json'
      document.head.appendChild(json)
    }
    json.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: SITE_NAME,
      url: base || undefined,
      logo,
      image,
      description: DEFAULT_DESC,
    })
  }, [pathname, page.title, page.description])

  return null
}
