const getDateToUse = (month, date) => {
  const today = new Date()

  let yearUse = today.getFullYear()

  if (today.getMonth() > month
    || (today.getMonth() === month && today.getDate() > date)) yearUse++

  return new Date(yearUse, month, date)
}

const getDiffDays = (target) => {
  const today = new Date()

  if (target.getMonth() === today.getMonth()
    && target.getDate() == today.getDate()) return

  const diff = target.getTime() - today.getTime()
  const oneDay = 1000 * 60 * 60 * 24

  return Math.ceil(diff / oneDay)
}

const eventDays = {

  fromChristmas: () => {
    let nextChristmas = getDateToUse(11, 25)
    return getDiffDays(nextChristmas)
  },

  fromBirthdate: (birthdate) => {
    let nextBirtdate = getDateToUse(birthdate.getMonth(), birthdate.getDate())
    return getDiffDays(nextBirtdate)
  },

  fromHolidays: () => {
    const month = new Date().getMonth()
    if (month === 5 || month === 6) return 0

    const nextHolidays = getDateToUse(5, 1)
    return getDiffDays(nextHolidays)
  }

}

module.exports = eventDays