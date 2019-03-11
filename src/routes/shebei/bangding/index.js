import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import { Form } from 'antd';
import List from './List';
import Filter from './Filter';
import Modal from './Modal';

const Index = (props) => {
  const { shebei, dispatch, location } = props;
  const {
    pagination,
    list,
    yuzhi,
    tixing,
    modalType,
    modalVisible,
  } = shebei;
  const { pathname, search } = location;
  const query = queryString.parse(search);

  const listProps = {
    pagination: {
      ...pagination,
    },
    dataSource: list,
    onChange(page) {
      dispatch(routerRedux.push({
        pathname,
        search: queryString.stringify({
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        }),
      }));
    },
    onView(item) {
      dispatch({
        type: 'shebei/showModal',
        payload: {
          yuzhi: item.yuzhi,
          modalType: Number(query.leixing),
        },
      });
      dispatch({
        type: 'shebei/updateTixing',
        payload: item.tixing,
      });
    },
  };

  const filterProps = {
    Back() {
      dispatch(routerRedux.goBack());
    },
  };

  const modalProps = {
    width: 800,
    modalType,
    yuzhi,
    list,
    tixing,
    visible: modalVisible,
    maskClosable: false,
    title: '阈值详情',
    wrapClassName: 'vertical-center-modal',
    onCancel () {
      dispatch({
        type: 'shebei/hideModal',
      });
    },
  };

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {
        modalVisible && <Modal {...modalProps} />
      }
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    shebei: state.shebei,
  };
}

export default connect(mapStateToProps)(Form.create()(Index));
