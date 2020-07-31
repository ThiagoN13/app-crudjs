const transfromObjectInQueryString = (object) => {
  let queryString = '?'

  for (let key in object) {
    if (object[key]) {
      let separator = queryString == '?' ? '' : '&'

      queryString += `${separator}${key}=${object[key]}`
    }
  }

  return queryString
}

export {
  transfromObjectInQueryString
}