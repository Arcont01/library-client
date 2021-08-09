export const state = () => ({
  categories: [],
})

export const getters = {
  categories: state => state.categories,
}

export const mutations = {
  SET_DEFAULT: (state) => {
    state.categories = []
  },
  SET_CATEGORIES:(state, data)=>{
    state.categories = data
  }
}

export const actions = {
  async getCategories({commit}) {
    try {
      const response = (await this.$axios.$get(`categories`)).data
      commit('SET_CATEGORIES', response)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
}
