<template>
  <b-row>
    <b-col cols="12" class="my-4">
      <b-card class="shadow-sm">
        <h1 class="px-2">Books</h1>
        <b-row>
          <b-col md="6" class="text-right mb-3" order="1" order-lg="0">
            <b-input v-model="search" placeholder="Search"></b-input>
          </b-col>
          <b-col md="6" class="text-right mb-3" order="0" order-md="1">
            <b-button v-b-modal.modal-create variant="primary">New</b-button>
          </b-col>
          <b-col cols="12" order="2">
            <b-table-simple small caption-top responsive>
              <b-thead head-variant="dark">
                <b-tr>
                  <b-th>Name</b-th>
                  <b-th>Author</b-th>
                  <b-th>Publication date</b-th>
                  <b-th>Categories</b-th>
                  <b-th>Borrow</b-th>
                  <b-th>Options</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="book in books.data" :key="book.id">
                  <b-th>{{ book.name }}</b-th>
                  <b-td>{{ book.author }}</b-td>
                  <b-td>{{ book.publication_date }}</b-td>
                  <b-td>
                    <b-badge v-for="category in book.categories" :key="category.id" variant="info" class="mx-1">
                      {{ category.name }}
                    </b-badge>
                  </b-td>
                  <b-td>
                    <b-button v-if="book.borrowed" variant="danger" size="sm" @click="modalBorrowBook(book.id)">Unavailable</b-button>
                    <b-button v-else variant="success" size="sm" @click="modalBorrowBook(book.id)">Available</b-button>
                  </b-td>
                  <b-td>
                    <b-button variant="warning" size="sm" @click="modalEditBook(book.id)">See/Edit</b-button>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
          <b-col cols="12" class="d-flex justify-content-end" order="3">
            <b-pagination
              :size="pagination.size"
              :limit="pagination.limit"
              :data="books"
              @pagination-change-page="getBooks"
            ></b-pagination>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
    <b-modal
      id="modal-edit"
      size="lg"
      no-body
      title="See/Edit Book"
      hide-footer
      centered
    >
      <b-container fluid>
        <b-row>
          <b-col cols="12" class="text-right p-0 mb-4">
            <b-button variant="warning" @click="enableEdit">Edit</b-button>
          </b-col>
          <b-col cols="12">
            <ValidationObserver v-slot="{ invalid }">
              <b-form @submit.prevent="editBook">
                <b-form-group>
                  <ValidationProvider
                    v-slot="{ valid, errors }"
                    name="Name"
                    rules="required"
                  >
                    <b-form-input
                      v-model="bookEdit.name"
                      :disabled="disableEdit"
                      :state="errors[0] ? false : valid ? true : null"
                      placeholder="name"
                    />
                    <b-form-invalid-feedback>
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
                <b-form-group>
                  <ValidationProvider
                    v-slot="{ valid, errors }"
                    name="Author"
                    rules="required"
                  >
                    <b-input
                      v-model="bookEdit.author"
                      :disabled="disableEdit"
                      :state="errors[0] ? false : valid ? true : null"
                      placeholder="Author"
                    />
                    <b-form-invalid-feedback>
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
                <b-form-row>
                  <b-form-group class="col-md-6">
                    <validation-provider
                      v-slot="{ valid, errors }"
                      rules="required"
                    >
                      <b-form-datepicker
                        v-model="bookEdit.publication_date"
                        :disabled="disableEdit"
                        :state="errors[0] ? false : valid ? true : null"
                        placeholder="DD-MM-YYYY"
                        :hide-header="true"
                        :locale="'en'"
                        :date-format-options="{
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              }"
                        required
                      />
                      <b-form-invalid-feedback>
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
                  <b-form-group class="col-md-6">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="categories"
                      rules="required"
                    >
                      <MultiSelect v-model="bookEdit.categories" :disabled="disableEdit" :options="categories"
                                   :multiple="true" :close-on-select="false" :clear-on-select="false"
                                   :preserve-search="true" placeholder="Categories" label="name" track-by="name">
                        <template slot="selection" slot-scope="{ values, isOpen }">
                          <span v-if="values.length &amp;&amp; !isOpen" class="multiselect__single">
                            {{ values.length }} options selected
                          </span>
                        </template>
                      </MultiSelect>
                      <p class="m-0 text-danger">
                        {{ errors[0] }}
                      </p>
                    </ValidationProvider>
                  </b-form-group>
                </b-form-row>
                <b-button
                  v-show="!disableEdit"
                  type="submit"
                  variant="primary"
                  squared
                  block
                  :disabled="invalid"
                >Edit
                </b-button
                >
              </b-form>
            </ValidationObserver>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
    <b-modal
      id="modal-create"
      size="lg"
      no-body
      title="Create Book"
      hide-footer
      centered
    >
      <b-container fluid>
        <b-row>
          <b-col cols="12">
            <ValidationObserver v-slot="{ invalid }">
              <b-form @submit.prevent="createBook">
                <b-form-group>
                  <ValidationProvider
                    v-slot="{ valid, errors }"
                    name="Name"
                    rules="required"
                  >
                    <b-form-input
                      v-model="form.name"
                      :state="errors[0] ? false : valid ? true : null"
                      placeholder="name"
                    />
                    <b-form-invalid-feedback>
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
                <b-form-group>
                  <ValidationProvider
                    v-slot="{ valid, errors }"
                    name="Author"
                    rules="required"
                  >
                    <b-input
                      v-model="form.author"
                      :state="errors[0] ? false : valid ? true : null"
                      placeholder="Author"
                    />
                    <b-form-invalid-feedback>
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
                <b-form-row>
                  <b-form-group class="col-md-6">
                    <validation-provider
                      v-slot="{ valid, errors }"
                      rules="required"
                    >
                      <b-form-datepicker
                        v-model="form.publication_date"
                        :state="errors[0] ? false : valid ? true : null"
                        placeholder="DD-MM-YYYY"
                        :hide-header="true"
                        :locale="'en'"
                        :date-format-options="{
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              }"
                        required
                      />
                      <b-form-invalid-feedback>
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
                  <b-form-group class="col-md-6">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="categories"
                      rules="required"
                    >
                      <MultiSelect v-model="form.categories" :options="categories"
                                   :multiple="true" :close-on-select="false" :clear-on-select="false"
                                   :preserve-search="true" placeholder="Categories" label="name" track-by="name">
                        <template slot="selection" slot-scope="{ values, isOpen }">
                          <span v-if="values.length &amp;&amp; !isOpen" class="multiselect__single">
                            {{ values.length }} options selected
                          </span>
                        </template>
                      </MultiSelect>
                      <p class="m-0 text-danger">
                        {{ errors[0] }}
                      </p>
                    </ValidationProvider>
                  </b-form-group>
                </b-form-row>
                <b-button
                  type="submit"
                  variant="primary"
                  squared
                  block
                  :disabled="invalid"
                >Create
                </b-button
                >
              </b-form>
            </ValidationObserver>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
    <b-modal
      id="modal-borrow"
      no-body
      title="Borrow Book"
      hide-footer
      centered
    >
      <b-container fluid>
        <b-row>
          <b-col v-if="bookEdit.borrowed && bookEdit.user.name === $auth.user.name" cols="12" class="text-center p-0 mb-4">
            <h3>Do you want left the book?</h3>
            <b-button variant="success" block @click="borrowBook">Yes</b-button>
          </b-col>
          <b-col v-else-if="bookEdit.borrowed && bookEdit.user.name !== $auth.user.name"  cols="12" else class="text-center p-0 mb-4">
            <h3>The book is unavailable</h3>
          </b-col>
          <b-col v-else cols="12" else class="text-center p-0 mb-4">
            <h3>Do you want borrow?</h3>
            <b-button variant="success" block @click="borrowBook">Yes</b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </b-row>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Books",
  async asyncData({store}) {
    await store.dispatch('books/getBooks')
    await store.dispatch('categories/getCategories')
  },
  data() {
    return {
      search: '',
      bookEdit: {},
      form: {
        name: '',
        author: '',
        publication_date: '',
        categories: [],
      },
      disableEdit: true,
      pagination: {
        size: 'default',
        limit: 1,
      },
    }
  },
  computed: {
    ...mapGetters('books', {
      books: 'books',
      page: 'page',
    }),
    ...mapGetters('categories', ['categories'])
  },
  watch: {
    search: {
      handler(newValue){
        this.$store.dispatch('books/getBooks', newValue)
      }
    }
  },
  methods: {
    async getBooks(page = 1) {
      await this.$store.dispatch('books/setPage', page)
      await this.$store.dispatch('books/getBooks')
    },
    async createBook(){
      try {
        const response = await this.$axios.$post(`books`, this.form)
        this.$toast.success(response.message)
        this.$nextTick(function () {
          this.form = {
            name: '',
            author: '',
            publication_date: '',
            categories: [],
          }
          this.$bvModal.hide('modal-create')
        })
      } catch ({response}) {
        this.$toast.error(response.data.message)
        await this.$store.dispatch('books/getBooks')
      }
    },
    async modalEditBook(book) {
      try {
        this.bookEdit = (await this.$axios.$get(`books/${book}`)).data.book
        this.disableEdit = true
        await this.$bvModal.show('modal-edit')
      } catch ({response}) {
        this.$toast.error(response.data.message)
        await this.$store.dispatch('books/getBooks')
      }
    },
    enableEdit() {
      this.disableEdit = !this.disableEdit
    },
    async editBook() {
      try {
        const response = await this.$axios.$put(`books/${this.bookEdit.id}`, this.bookEdit)
        this.$toast.success(response.message)
        this.$nextTick(function () {
          this.bookEdit = {}
          this.$store.dispatch('books/getBooks')
          this.$bvModal.hide('modal-edit')
        })
      } catch ({response}) {
        this.$toast.error(response.data.message)
      }
    },
    async modalBorrowBook(book) {
      this.bookEdit = await this.books.data.find(e => e.id === book);
      await this.$bvModal.show('modal-borrow')
    },
    async borrowBook() {
      try {
        const response = await this.$axios.$put(`books/borrow/${this.bookEdit.id}`)
        this.$toast.success(response.message)
        this.$nextTick(function () {
          this.$store.dispatch('books/getBooks')
          this.$bvModal.hide('modal-borrow')
        })
      } catch ({response}) {
        this.$toast.error(response.data.message)
      }
    }
  },
}
</script>
