import { DateTime } from 'luxon'
export const cx = (...classes) => classes.filter(Boolean).join(' ')
export const extractCategories = (userProfile) => {
  return Object.values(userProfile.categories).map((user: any) => user.name)
}
// export const convertToLuxonDate = (isoDate: string) =>
//   DateTime.fromISO(isoDate).setZone('utc').set({ hour: 12 })
export const numberToCurrency = ({ amount, currency, locale = 'en' }) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}
export const convertToLuxonDate = (dateString) => {
  const [day, month, year] = dateString.split('/') //format is dd/MM/yyyy
  const d = DateTime.fromObject({
    year: Number(year),
    month: Number(month),
    day: Number(day),
    hour: 12,
    zone: 'utc',
  })
  return d
}
