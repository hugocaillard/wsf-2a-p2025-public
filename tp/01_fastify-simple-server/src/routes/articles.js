const articles = [
  { id: 1, title: 'Fake article 1' },
  { id: 2, title: 'Fake article 2' },
]

let nextId = 3

/**
 * @type { @import("fastify").FastifySchema }
 */
const messageSchema = {
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
    },
    required: ['title'],
    additionalProperties: false,
  },
}

/**
 * @type { import("fastify").FastifySchema }
 */
const articleIdSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
}

/**
 * @type { import("fastify").FastifyPluginCallback }
 */
export async function articlesRoutes(app) {
  app.get('/articles', (request, reply) => {
    reply.send(articles)
  })

  app.get('/articles/:id', { schema: articleIdSchema }, (request, reply) => {
    const id = request.params.id
    const article = articles.find((a) => a.id === id)

    if (!article) {
      reply.status(404).send({ error: `Article ${id} not found` })
      return
    }

    reply.send(article)
  })

  app.post('/articles', { schema: messageSchema }, (request, reply) => {
    articles.push({ id: nextId, title: request.body.title })
    reply.status(201).send({ message: 'Article created' })
  })

  app.delete('/articles/:id', { schema: articleIdSchema }, (request, reply) => {
    const id = request.params.id
    const article = articles.find((a) => a.id === id)

    if (!article) {
      reply.status(404).send({ error: `Article ${id} not found` })
      return
    }
    const index = articles.findIndex((a) => a.id === id)
    articles.splice(index, 1)

    reply.send({ message: `Article deleted` })
  })
}
