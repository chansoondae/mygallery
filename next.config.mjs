/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['lh3.googleusercontent.com','firebasestorage.googleapis.com'],
    },
    reactStrictMode: false,
    env: {
        GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        GOOGLE_AI_API: process.env.NEXT_PUBLIC_GOOGLE_AI_API,
    },
}; 

export default nextConfig;
