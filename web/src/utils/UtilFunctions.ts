import { DateTime } from 'luxon'
export const cx = (...classes) => classes.filter(Boolean).join(' ')
export const extractCategories = (userProfile) => {
  return Object.values(userProfile.categories).map((user: any) => user.name)
}
export const convertToLuxonDate = (isoDate: string) =>
  DateTime.fromISO(isoDate).setZone('utc').set({ hour: 12 })
export const numberToCurrency = ({ amount, currency, locale = 'en' }) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}
