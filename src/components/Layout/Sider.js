import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import styles from './Layout.less';
import Menus from './Menu';

const Sider = (props) => {
  const {
    siderFold,
    darkTheme,
    location,
    changeTheme,
    navOpenKeys,
    changeOpenKeys,
    menu,
  } = props;
  const menusProps = {
    menu,
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys,
  };
  return (
    <div className={styles.menu}>
      <Menus {...menusProps}/>
    </div>
  );
};

Sider.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  changeTheme: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
};

function mapStateToProps(state) {
  return {
  };
}

export default injectIntl(connect(mapStateToProps)(Sider));
