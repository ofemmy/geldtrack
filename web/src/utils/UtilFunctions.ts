export const cx = (...classes) => classes.filter(Boolean).join(' ')
export const extractCategories = (userProfile) => {
  return Object.values(userProfile.categories).map((user: any) => user.name)
}
