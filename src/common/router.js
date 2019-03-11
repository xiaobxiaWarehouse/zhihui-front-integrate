import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models
        .filter(model => modelNotExisted(app, model))
        .map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

export const getRouterData = (app) => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/app')),
    },
    '/login': {
      component: dynamicWrapper(app, ['login'], () =>
        import('../routes/login')),
    },
    '/index': {
      component: dynamicWrapper(app, ['index'], () =>
        import('../routes/index')),
    },
    '/user/list': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/user')),
    },
    '/user/add': {
      component: dynamicWrapper(app, ['user'], () =>
        import('../routes/user/add')),
    },
    '/user/detail': {
      component: dynamicWrapper(app, ['user'], () =>
        import('../routes/user/detail')),
    },
    '/user/edit': {
      component: dynamicWrapper(app, ['user'], () =>
        import('../routes/user/edit')),
    },
    '/role/list': {
      component: dynamicWrapper(app, ['role'], () => import('../routes/role')),
    },
    '/role/detail': {
      component: dynamicWrapper(app, ['role'], () =>
        import('../routes/role/detail')),
    },
    '/role/edit': {
      component: dynamicWrapper(app, ['role'], () =>
        import('../routes/role/edit')),
    },
    '/role/add': {
      component: dynamicWrapper(app, ['role'], () =>
        import('../routes/role/add')),
    },
    '/group/list': {
      component: dynamicWrapper(app, ['group'], () =>
        import('../routes/group')),
    },
    '/group/addjigou': {
      component: dynamicWrapper(app, ['group'], () =>
        import('../routes/group/addjigou')),
    },
    '/group/edit': {
      component: dynamicWrapper(app, ['group'], () =>
        import('../routes/group/edit')),
    },
    '/group/details': {
      component: dynamicWrapper(app, ['group'], () =>
        import('../routes/group/detail')),
    },
    '/abnormal/list': {
      component: dynamicWrapper(app, ['abnormal'], () =>
        import('../routes/abnormal')),
    },
    '/monitorZnc/list': {
      component: dynamicWrapper(app, ['monitorZnc'], () =>
        import('../routes/monitorZnc')),
    },
    '/monitorZncd/list': {
      component: dynamicWrapper(app, ['monitorZncd'], () =>
        import('../routes/monitorZncd')),
    },
    '/monitorDtz/list': {
      component: dynamicWrapper(app, ['monitorDtz'], () =>
        import('../routes/monitorDtz')),
    },
    '/monitorZhx/list': {
      component: dynamicWrapper(app, ['monitorZhx'], () =>
        import('../routes/monitorZhx')),
    },
    '/caijiSb/list': {
      component: dynamicWrapper(app, ['caijiSb'], () =>
        import('../routes/caijiSb')),
    },
    '/caijiJg/list': {
      component: dynamicWrapper(app, ['caijiJg'], () =>
        import('../routes/caijiJg')),
    },
    '/dangan/list': {
      component: dynamicWrapper(app, ['dangan'], () =>
        import('../routes/dangan')),
    },
    '/dangan/detail': {
      component: dynamicWrapper(app, ['dangan'], () =>
        import('../routes/dangan/detail')),
    },
    '/dangan/dataDetail': {
      component: dynamicWrapper(app, ['dangan'], () =>
        import('../routes/dangan/dataDetail')),
    },
    '/dangan/jiankang': {
      component: dynamicWrapper(app, ['dangan'], () =>
        import('../routes/dangan/jiankang')),
    },
    '/shebei/list': {
      component: dynamicWrapper(app, ['shebei'], () =>
        import('../routes/shebei')),
    },
    '/shebei/bangding': {
      component: dynamicWrapper(app, ['shebei'], () =>
        import('../routes/shebei/bangding')),
    },
    '/shebei/realtime': {
      component: dynamicWrapper(app, ['shebei'], () =>
        import('../routes/shebei/realTime')),
    },
    '/tixing/list': {
      component: dynamicWrapper(app, ['tixing'], () =>
        import('../routes/tixing')),
    },
    '*': {
      component: dynamicWrapper(app, [], () => import('../routes/error')),
    },
  };

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach((path) => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name,
    };
    routerData[path] = router;
  });
  return routerData;
};
