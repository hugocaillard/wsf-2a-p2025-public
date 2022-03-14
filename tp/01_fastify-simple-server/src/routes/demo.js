const articles = [{ id: 1, title: 'Hello' }]
const messages = []

/**
 * @type { import("fastify").FastifyPluginCallback }
 */
export async function demoRoutes(app) {
  const helloSchema = {
    querystring: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
      },
      required: [], // nothing's required
      additionalProperties: false, // remove other propertiers
    },
  }

  app.get('/hello', { schema: helloSchema }, (request, reply) => {
    const name = request.query.name
    const age = request.query.age

    const message = name ? `Hello ${name}` : 'Hello world'
    if (age) console.log(age)

    reply.send({ message })
  })

  const articleSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
      required: ['id'],
      additionalProperties: false,
    },
  }

  app.get('/articles/:id', { schema: articleSchema }, (request, reply) => {
    const id = request.params.id
    const article = articles.find((a) => a.id === id)
    if (!article) {
      return reply.code(404).send({ error: 'article not found', id })
    }
    reply.send({ article })
  })

  const messageSchema = {
    body: {
      type: 'object',
      properties: {
        pseudo: { type: 'string' },
        message: { type: 'string' },
      },
      required: ['pseudo', 'message'],
      additionalProperties: false,
    },
  }

  app.post('/messages', { schema: messageSchema }, (request, reply) => {
    const message = request.body.message
    messages.push(message)

    reply.status(201).send({ message: 'message received' })
  })
}
