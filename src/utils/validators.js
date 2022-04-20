export const mustBeInPast = (value) => !value || new Date() > new Date(value) // показывать, только если пользователь ввел дату
export const isStartsWithSeven = (value) => value[0] === '7'