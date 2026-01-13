const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// Helper function to parse API URL and extract hostname/port for image config
function getImageRemotePatterns() {
  const patterns = [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
    {
      protocol: 'https',
      hostname: 'source.unsplash.com',
    },
    {
      protocol: 'https',
      hostname: 'www.inlandandalucia.com',
    },
    {
      protocol: 'https',
      hostname: 'inlandandalucia.com',
    },
  ];

  // Get API URL from environment
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE || '';
  
  if (apiUrl) {
    try {
      const url = new URL(apiUrl.replace('/api/v1', '').replace(/\/$/, ''));
      const protocol = url.protocol.replace(':', '');
      const hostname = url.hostname;
      const port = url.port || (protocol === 'https' ? '443' : '80');

      // Add the backend hostname to remote patterns
      patterns.push({
        protocol: protocol,
        hostname: hostname,
        ...(port && port !== '80' && port !== '443' && { port: port }),
      });

      // Also add localhost variants if it's a local development URL
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        patterns.push({
          protocol: 'http',
          hostname: 'localhost',
          ...(port && port !== '80' && { port: port }),
        });
        patterns.push({
          protocol: 'http',
          hostname: '127.0.0.1',
          ...(port && port !== '80' && { port: port }),
        });
      }
    } catch (e) {
      console.warn('Failed to parse API URL for image config:', e);
    }
  }

  // Add production backend if not already added
  if (!patterns.some(p => p.hostname === 'inlandandalucia.onrender.com')) {
    patterns.push({
      protocol: 'https',
      hostname: 'inlandandalucia.onrender.com',
    });
  }

  return patterns;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir: 'build',
  images: {
    remotePatterns: getImageRemotePatterns(),
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Performance: Enable compression for smaller response sizes
  compress: true,
  // Performance: Use SWC minification for faster builds and smaller bundles
  swcMinify: true,
  // Performance: Enable React strict mode for better performance and error detection
  reactStrictMode: true,
  // Performance: Optimize fonts to reduce layout shift
  optimizeFonts: true,
  // Performance: Enable experimental features for better code splitting
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'framer-motion', 'keen-slider'],
  },
  // Performance: Configure webpack for better code splitting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Performance: Optimize chunk splitting for better caching
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Performance: Separate vendor chunks for better caching
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test(module) {
                return module.size() > 160000 && /node_modules[/\\]/.test(module.identifier());
              },
              name(module) {
                const hash = require('crypto').createHash('sha1');
                hash.update(module.identifier());
                return hash.digest('hex').substring(0, 8);
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
            },
            shared: {
              name(module, chunks) {
                return require('crypto')
                  .createHash('sha1')
                  .update(chunks.reduce((acc, chunk) => acc + chunk.name, ''))
                  .digest('hex')
                  .substring(0, 8);
              },
              priority: 10,
              minChunks: 2,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
};

module.exports = withNextIntl(nextConfig); 