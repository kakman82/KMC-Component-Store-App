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