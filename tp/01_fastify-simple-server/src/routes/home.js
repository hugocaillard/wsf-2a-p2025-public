/**
 * @type { import("fastify").RouteHandlerMethod }
 */
export function home(request, reply) {
  reply.send({ message: 'Server is running' })
}
