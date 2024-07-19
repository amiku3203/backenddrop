 /** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
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
