module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/typetype/'
    : '/',
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import '~/normalize.css/normalize.css';
          @import '@/scss/root.scss';
        `
      }
    }
  }
}
