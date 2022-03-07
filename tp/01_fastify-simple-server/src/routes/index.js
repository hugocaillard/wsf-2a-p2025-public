import { home } from './home.js'

export async function routes(app) {
  app.get('/', home)
}
