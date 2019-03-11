/* global window */
import React from 'react';
import {connect} from 'dva';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import intl from 'react-intl-universal';
import {Spin, Modal, Button} from 'antd';
import {getRoutes, classnames, config} from 'utils';
import {Layout} from 'components';
import {Helmet} from 'react-helmet';
import '../themes/default.less';
import './app.less';

const {
  prefix,
  openPages,
  withOutContentPages,
  withOutMenuPages,
} = config;

const {
  Header,
  Bread,
  Sider,
} = Layout;

let lastHref;
let main;

const getBashRedirect = (routerData) => {
  // According to the url parameter to redirect
  // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
  const urlParams = new URL(window.location.href);

  const redirect = urlParams.searchParams.get('redirect');
  // Remove the parameters in the url
  if (redirect) {
    urlParams.searchParams.delete('redirect');
    window.history.replaceState(null, 'redirect', urlParams.href);
  } else {
    // get the first authorized route path in routerData
    const authorizedPath = Object.keys(routerData).find(item => item && item !== '/');
    return authorizedPath;
  }
  return redirect;
};

const App = (props) => {
  const {
    // children,
    app,
    location,
    routerData,
    match,
    dispatch,
  } = props;

  const {
    siderFold,
    darkTheme,
    loading,
    isNavbar,
    navOpenKeys,
    menu,
    updatePasswordVisible,
    modalVisible,
    backtype,
    queryParams,
  } = app;

  let {pathname} = location;

  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const { href } = window.location;

  if (lastHref !== href) {
    if (!loading) {
      lastHref = href;
    }
  }


  const headerProps = {
    withOutMenuPages,
    pathname,
    menu,
    logout () {
      dispatch({type: 'app/logout'});
    },
    updatePasswordVisible,
    showUpdatePasswordModal() {
      dispatch({type: 'app/showUpdatePasswordModal'});
    },
    hideUpdatePasswordModal() {
      dispatch({type: 'app/hideUpdatePasswordModal'});
    },
    updatePassword(payload) {
      dispatch({type: 'app/updatePassword', payload});
    },
    switchSider () {
      dispatch({type: 'app/switchSider'});
    },
    changeOpenKeys (openKeys) {
      dispatch({type: 'app/handleNavOpenKeys', payload: {navOpenKeys: openKeys}});
    },
    changePage(path) {
      dispatch(routerRedux.push({
        pathname: path,
      }));
    },
  };

  const siderProps = {
    menu,
    location,
    siderFold,
    darkTheme,
    navOpenKeys,
    changeTheme () {
      dispatch({type: 'app/switchTheme'});
    },
    changeOpenKeys (openKeys) {
      window.localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys));
      dispatch({type: 'app/handleNavOpenKeys', payload: {navOpenKeys: openKeys}});
    },
  };

  const breadProps = {
    menu,
    location,
  };

  const onScrollEvent = () => {
    if (pathname === '/dangan/jiankang') {
      dispatch({
        type: 'app/changeCurrScrollTop',
        payload: main.scrollTop,
      });
    }
  };


  const bashRedirect = getBashRedirect(routerData);

  const modalProps = {
    width: 430,
    visible: modalVisible,
    maskClosable: false,
    title: '温馨提示',
    wrapClassName: 'vertical-center-modal',
    onOk () {
      dispatch({
        type: 'app/changeModalVisible',
        payload: {
          modalVisible: false,
          type: null,
          queryParams: null,
        },
      });
      if (backtype === 1) {
        dispatch(routerRedux.goBack());
      } else {
        dispatch(routerRedux.push({
          pathname: backtype,
          search: queryString.stringify(queryParams),
        }));
      }
      dispatch({
        type: 'app/updataFormChange',
        payload: false,
      });
    },
    onCancel () {
      dispatch({
        type: 'app/changeModalVisible',
        payload: {
          modalVisible: false,
          type: null,
          queryParams: null,
        },
      });
    },
  };

  const isWithOutContent = withOutContentPages && withOutContentPages.includes(pathname);
  // const isWithOutHeader = withOutHeaderPages && withOutHeaderPages.includes(pathname);

  if (openPages && openPages.includes(pathname)) {
    return (
      <Spin spinning={loading}>
        <Switch>
          {getRoutes(match.path, routerData).map((item) => {
            // console.log(location, match.path, item.path, item.exact);
            return (<Route
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}
            />);
          })}
          <Redirect exact from="/" to={bashRedirect} />
        </Switch>
      </Spin>
    );
  } else {
    return (
      <Spin spinning={loading}>
        <Helmet>
          <title>{intl.get('App.name')}</title>
        </Helmet>
        <div
          className={classnames('layout', {fold: isNavbar ? false : siderFold}, {withnavbar: isNavbar})}
        >
          <div className="container">
            <Header {...headerProps} />
            <div className="content">
              {
                withOutMenuPages.indexOf(pathname) === -1 && <aside className="sider"><Sider {...siderProps} /></aside>
              }
              <div onScrollCapture={() => { onScrollEvent(); }} ref={(el) => { main = el; }} className={withOutMenuPages.indexOf(pathname) === -1 ? 'main' : 'mainRaw'}>
                {
                  withOutMenuPages.indexOf(pathname) === -1 && <Bread {...breadProps} />
                }
                <Switch>
                  {getRoutes(match.path, routerData).map((item) => {
                    return (<Route
                      key={item.key}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                    />);
                  })}
                  <Redirect exact from="/" to={bashRedirect} />
                </Switch>
              </div>
            </div>
            <Modal
              className={CSS.tipsModal}
              footer={null}
              {...modalProps}
            >
              您确认返回吗？当前页输入数据将不被保存。
              <div style={{textAlign: 'center', marginTop: '30px'}}>
                <Button style={{marginRight: '10px'}} onClick={() => { modalProps.onOk(); }} type="primary">确定</Button>
                <Button onClick={() => { modalProps.onCancel(); }}>取消</Button>
              </div>
            </Modal>
          </div>
        </div>
      </Spin>
    );
  }
};

App.propTypes = {
  // children: PropTypes.element.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: state.loading,
    app: state.app,
  };
}

export default connect(mapStateToProps)(App);
