/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // como o site está em https://pythonnortebrasil.github.io/site
  // é recomendável:
  basePath: '/site',
  assetPrefix: '/site/',
};

export default nextConfig;
