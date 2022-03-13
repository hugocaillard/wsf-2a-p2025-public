import { home } from './home.js'

/**
 * @type { import("fastify").FastifyPluginCallback }
 */
export async function routes(app) {
  app.get('/', home)
}
