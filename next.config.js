/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
    reactStrictMode: true,

    serverRuntimeConfig: {
        connectionString: process.env.MONGO_URI,
        secret: process.env.JWT_SECRET_KEY,
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3001/api' // development api
            : 'http://localhost:3001/api' // production api
    }
}



module.exports = nextConfig
