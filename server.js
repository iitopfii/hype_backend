const fastify = require('fastify')()

const routes = require('./routes')

const path = require('path')

fastify.register(require('@fastify/formbody'))
fastify.register(require('@fastify/cors'), {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
})

fastify.register(require("fastify-socket.io"), {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

fastify.decorate('authenticate', async function (request, reply) {
    try {
        await request.jwtVerify()
    } catch (err) {
        reply.send(err)
    }
})

fastify.decorate('profile', async function (request, reply) {
    try {
        console.log('profile')
    } catch (err) {
        reply.send(err)
    }
})

fastify.register(require('@fastify/jwt'), {
    secret: 'ewFh6wZkvFtUYE'
})

fastify.register( routes , { prefix: '/api' })

fastify.listen({
    port: 3000,
    host: '0.0.0.0'
}, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})