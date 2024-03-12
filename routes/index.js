const profiles = require('../controllers/profile')

async function routes(fastify, options, next) {
    const onRequest = {onRequest : [fastify.authenticate]}

    fastify.get('/', async (request, reply) => {
        reply.send({ hello: 'world' })
    })

    fastify.get('/profile',onRequest, profiles.getProfile)
    fastify.post('/profile',onRequest, profiles.createProfile)
    fastify.put('/profile',onRequest, profiles.updateProfile)
    fastify.delete('/profile',onRequest, profiles.deleteProfile)

    next()
}

module.exports = routes