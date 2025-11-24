import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // URL de tu frontend
    supportFile: 'cypress/support/e2e.js',
  },
})
