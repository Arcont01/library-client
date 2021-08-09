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

  router: {
    middleware: ['auth']
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/axios'},
    {src: '~/plugins/vee-validate'},
  ],

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
      login: '/',
      logout: '/',
      callback: '/',
      home: '/books',
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
            url: '/login',
            method: 'post',
          },
          logout: {
            url: '/logout',
            method: 'delete',
          },
          user: {
            url: '/me',
            method: 'get',
          },
        },
      },
    },
  },

  toast: {
    position: 'top-center',
    duration: '3000',
  },

  styleResources: {
    scss: ['@/assets/scss/_variables.scss'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
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
