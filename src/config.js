const DEV_CONFIG = {
  apiUrl: 'http://localhost:3000/api',
  server: 'http://localhost:3000',
};

const PROD_CONFIG = {
  apiUrl: 'http://localhost:3000/api',
  server: 'http://localhost:3000',
};

const isProd = process.env.NODE_ENV === 'production';

const config = isProd ? PROD_CONFIG : DEV_CONFIG;

export default config;
