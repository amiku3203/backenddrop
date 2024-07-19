 /** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // This is not a wildcard for all domains but matches subdomains.
            },
        ],
        domains:['localhost']
    },
}

module.exports = nextConfig
