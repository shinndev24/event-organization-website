import { useEffect, useRef, useState } from 'react'
import { englishTranslations } from '@data/englishTranslations.js'

const translatableAttributes = ['alt', 'aria-label', 'placeholder', 'title']
const originalText = new WeakMap()
const originalAttributes = new WeakMap()

function translatePage(root, language) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const textNodes = []
  let node = walker.nextNode()

  while (node) {
    if (!node.parentElement?.closest('[data-language-control]')) {
      textNodes.push(node)
    }
    node = walker.nextNode()
  }

  textNodes.forEach((textNode) => {
    if (!originalText.has(textNode)) {
      originalText.set(textNode, textNode.nodeValue)
    }

    const source = originalText.get(textNode)
    const trimmed = source.trim()
    const translated = language === 'en' ? englishTranslations[trimmed] : source

    if (translated && translated !== trimmed) {
      textNode.nodeValue = source.replace(trimmed, translated)
    } else if (language === 'es') {
      textNode.nodeValue = source
    }
  })

  root.querySelectorAll('*').forEach((element) => {
    if (element.closest('[data-language-control]')) {
      return
    }

    translatableAttributes.forEach((attribute) => {
      if (!element.hasAttribute(attribute)) {
        return
      }

      let attributes = originalAttributes.get(element)
      if (!attributes) {
        attributes = {}
        originalAttributes.set(element, attributes)
      }
      if (!(attribute in attributes)) {
        attributes[attribute] = element.getAttribute(attribute)
      }

      const source = attributes[attribute]
      const translated = language === 'en' ? englishTranslations[source] : source
      if (translated) {
        element.setAttribute(attribute, translated)
      }
    })
  })
}

function LanguageToggle() {
  const [language, setLanguage] = useState('es')
  const languageRef = useRef(language)

  useEffect(() => {
    languageRef.current = language
    document.documentElement.lang = language
    translatePage(document.getElementById('root'), language)
  }, [language])

  useEffect(() => {
    const root = document.getElementById('root')
    const observer = new MutationObserver(() => {
      translatePage(root, languageRef.current)
    })
    observer.observe(root, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return (
    <button
      type="button"
      className="language-toggle"
      data-language-control
      aria-label={language === 'es' ? 'Translate page to English' : 'Cambiar página a español'}
      onClick={() => setLanguage((current) => current === 'es' ? 'en' : 'es')}
    >
      {language === 'es' ? 'English' : 'Español'}
    </button>
  )
}

export default LanguageToggle
