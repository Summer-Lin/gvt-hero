import lang from "../lang"
import { Lang } from "../lang"

!Lang.getLang() && Lang.setLang()

const locale = Lang.getLang()

const langs = lang[locale]

const parsePathKey = attrs => {
  let msg = null
  attrs.map(item => {
    if (msg === null) {
      msg = langs[item]
    } else {
      msg = msg[item]
    }
  })
  return msg
}

const warn = (pathKey, locale) => {
  console.warn(`[GVT-HERO] translate failed: "${pathKey}" is not in "${locale}" !`)
}

const mixin = {
  methods: {
    $heroT(pathKey) {
      const attrs = pathKey.split(".")
      let message = ""
      try {
        message = parsePathKey(attrs)
        message === undefined && warn(pathKey, locale)
      } catch (e) {
        message = pathKey
        warn(pathKey, locale)
      }
      return message
    }
  }
}

export default mixin
