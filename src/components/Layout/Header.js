import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import intl from 'react-intl-universal';
import { Menu, Select } from 'antd';
import { Icon as JXRSIcon } from '../JXRS';
import styles from './Header.less';
import UpdatePasswordModal from '../../components/UpdatePasswordModal';
import imgLogo from '../../public/logo.png';
import imgAppname from '../../public/app-name.png';
import tuichu from '../../public/tuichu.png';
import changePassword from '../../public/changePassword.png';

const { SubMenu } = Menu;
const { Option } = Select;

const Header = (props) => {
  const {
    logout,
    showUpdatePasswordModal,
    hideUpdatePasswordModal,
    updatePassword,
    updatePasswordVisible,
    app: {
      user,
    },
  } = props;
  let handleClickMenu = (e) => {
    switch (e.key) {
      case 'logout':
        logout();
        break;
      case 'updatePassword':
        showUpdatePasswordModal();
        break;
      default:
        break;
    }
  };

  const updatePasswordModalProps = {
    visible: updatePasswordVisible,
    onOk: updatePassword,
    onCancel: hideUpdatePasswordModal,
  };
  return (
    <div className={styles.header}>
      <div className={styles.leftWarpper}>
        <img style={{ width: 200 }} alt="logo" src={imgLogo} />
        <img
          style={{
            width: 208,
            marginLeft: 35,
            marginRight: 16,
          }}
          alt="app-name"
          src={imgAppname}
        />
      </div>
      <div className={styles.rightWarpper}>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu
            style={{ float: 'right' }}
            title={
              <div className={styles.me}>
                <JXRSIcon
                  type="me"
                  style={{ marginRight: 8, fontSize: 13, color: '#595959' }}
                />
                <span style={{ fontSize: 15 }}>
                  <i className="icon-header-user" />
                  {/* {window.localStorage.getItem('zhihuishouji')} */}
                  {user && user.xingming}
                </span>
                <JXRSIcon
                  type="down"
                  style={{ marginLeft: 12, fontSize: 9, color: '#595959' }}
                />
              </div>
            }
          >
            <Menu.Item className={styles.world_middle} key="updatePassword">
              <JXRSIcon className={styles.icon_middle} type="modify" />
              <span style={{ fontSize: 14 }}>
                {intl.get('Profile.updatePassword')}
              </span>
            </Menu.Item>
            <Menu.Item className={styles.world_middle} key="logout">
              <JXRSIcon type="logout" className={styles.icon_middle} />
              <span style={{ fontSize: 14 }}>
                {intl.get('Logout.logout')}
              </span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
      {updatePasswordVisible && (
        <UpdatePasswordModal {...updatePasswordModalProps} />
      )}
    </div>
  );
};

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  updatePasswordVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  showUpdatePasswordModal: PropTypes.func,
  hideUpdatePasswordModal: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
  updatePassword: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(Header));
