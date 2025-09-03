// next.config.js
const { i18n } = require("./next-i18next.config");

module.exports = {
    i18n,

   images: {
    domains: ['localhost', '127.0.0.1', 'sits.local', 'mydomain.com'],
    },
}
