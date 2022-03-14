import fastify from 'fastify'
import { routes } from './routes/index.js'
import { demoRoutes } from './routes/demo.js'
import { articlesRoute } from './routes/articles.js'

/**
 * @param { import('fastify').FastifyServerOptions } options
 */
export function build(options = {}) {
  const app = fastify(options)

  app.register(routes)
  app.register(demoRoutes)
  app.register(articlesRoute)

  return app
}
