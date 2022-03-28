/** @type { import("fastify").FastifySchema } */
const helloSchema = {
  querystring: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: [], // nothing's required
    additionalProperties: false, // remove other propertiers
  },
}

/** @type { import('fastify').FastifySchema } */
const messageSchema = {
  body: {
    type: 'object',
    properties: {
      message: { type: 'string' },
      random: { type: 'string' },
    },
    required: ['message'],
    additionalProperties: false,
  },
}

/** @type { import("fastify").FastifyPluginCallback } */
export async function routes(app) {
  app.get('/', (request, reply) => {
    reply.send({ message: 'Server is running' })
  })

  app.get('/hello', { schema: helloSchema }, (request, reply) => {
    const name = request.query.name

    reply.send({ message: `Hello ${name ? name : 'world'}` })
  })

  app.post('/message', { schema: messageSchema }, (request, reply) => {
    reply.status(201).send({ message: 'Message received', data: request.body })
  })
}
