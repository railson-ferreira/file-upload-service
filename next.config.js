/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    async headers() {
        return [
            {
                source: '/api/file/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*'
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, DELETE, OPTIONS'
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type'
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig
