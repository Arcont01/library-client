export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 410) {
      error({ statusCode: 410, message: `Resource doesn't exist` })
    } else if (code === 500) {
      error({ statusCode: 500, message: `Server error` })
    }
    throw error
  })
}
