export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'library-client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // https://github.com/nuxt-community/community-modules/tree/master/packages/toast
    '@nuxtjs/toast',
  ],

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
  },

  axios: {
    debug: process.env.APP_DEBUG === 'true',
    baseURL: process.env.BASE_URL || 'http://localhost:3000', // Used as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    axios: {
      debug: process.env.APP_DEBUG === 'true',
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
  },

  privateRuntimeConfig: {
    axios: {
      debug: process.env.APP_DEBUG === 'true',
      baseURL: process.env.BASE_URL,
    },
  },

  auth: {
    cookie: {
      prefix: 'auth.library',
      options: {
        path: '/',
      },
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'data.token',
          required: true,
          type: 'Bearer',
          maxAge: false,
        },
        autoLogout: false,
        refreshToken: {
          required: false,
        },
        user: {
          property: 'data.user',
        },
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
          },
          logout: {
            url: '/auth/logout',
            method: 'delete',
          },
          user: {
            url: '/user/me',
            method: 'get',
          },
        },
      },
    },
  },

  toast: {
    position: 'top-center',
  },

  styleResources: {
    scss: ['@/assets/scss/_variables.scss'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      "presets": [
        [
          "@babel/preset-env",
          {
            targets: {
              esmodules: true
            },
            "loose": true,
            "shippedProposals": true
          }
        ]
      ]
    },
  }
}
