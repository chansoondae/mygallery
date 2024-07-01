/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['lh3.googleusercontent.com','firebasestorage.googleapis.com'],
    },
    reactStrictMode: false,
    env: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_AI_API: process.env.GOOGLE_AI_API,
    },
}; 

export default nextConfig;
