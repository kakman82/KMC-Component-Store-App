import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

export function formatNumber(value, digits) {
  const niceFormat = Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)
  return niceFormat
}

export function formatWithCurrencyAndDecimals(price, curr, digits) {
  const currFormat = Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: curr,
    // birim fiyatların ondalık kısmı 4 hane olduğundan bu tanım kalmalı
    // hem max hem de min
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(price)
  return currFormat
}

export function formatDate(date) {
  const niceDate = format(new Date(date), 'dd MMMM yyyy, EEEE ', {
    locale: tr,
  })
  return niceDate
}

export function formatDateWithoutDay(date) {
  const niceDate = format(new Date(date), 'dd.MM.yyyy ', {
    locale: tr,
  })
  return niceDate
}

export function capitalizeEachWord(str) {
  const splitStr = str.toLowerCase().split(' ')
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join(' ')
}
