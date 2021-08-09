export const state = () => ({
  books: {},
  page: 1,
})

export const getters = {
  books: state => state.books,
  page: state => state.page
}

export const mutations = {
  SET_DEFAULT: (state) => {
    state.books = {}
    state.page = 1
  },
  SET_BOOKS:(state, data)=>{
    state.books = data
  },
  SET_PAGE: (state, data) => {
    state.page = data
  }
}

export const actions = {
  async getBooks({commit, rootGetters},  data = null) {
    try {
      const response = await this.$axios.$get(`books`, {
        params: {
          search: data,
          page: rootGetters["books/page"]
        }
      })
      commit('SET_BOOKS', response)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  },
  async setPage({commit}, data) {
    await commit('SET_PAGE', data)
  },
}
