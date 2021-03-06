export function capitalise(string) {
  return string
    .split(' ')
    .map(el => el[0].toUpperCase() + el.slice(1, el.length))
    .join(' ')
}

export function prependNumber(num) {
  return num > 9 ? '' + num : '0' + num
}

export function getDateWithYear(unformattedDate) {
  return unformattedDate.toLocaleTimeString([], {
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric',
  })
}

export function getDateWithoutYear(unformattedDate) {
  return unformattedDate.toLocaleTimeString([], {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function sortByTime(object) {
  return object.sort((a, b) => a.time.seconds - b.time.seconds)
}

export function getSessionDate(session) {
  return new Date(session.time.seconds * 1000)
}

export function isThereAnyExerciseSelected(exercises) {
  return exercises.filter(exercise => exercise.selected === true).length === 0
}
