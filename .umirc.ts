import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy:{
    '/api':{
      'target':'https://pvp.qq.com',
      'changeOrigin':true,
      'pathRewrite':{'^/api':''},
    }
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
});
