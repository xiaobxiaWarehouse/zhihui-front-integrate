import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import moment from 'moment';
import { Table, Form } from 'antd';
import { getBeforeDay } from 'utils';
import List from './List';
import Filter from './Filter';
import Modal from './Modal';

const Index = (props) => {
  const { monitorZhx, dispatch, location } = props;

  const {
    list,
    pagination,
    jigouList,
    modalVisible,
    currItem,
    detaiData,
    prev,
    modalsignType,
  } = monitorZhx;
  const { pathname, search } = location;
  const query = queryString.parse(search);

  const getDetail = (params, callback) => {
    dispatch({
      type: 'monitorZhx/getDetail',
      payload: {
        ...params,
      },
      callback: () => {
        if (callback) {
          callback();
        }
      },
    });
  };

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
        type: 'monitorZhx/changePrev',
        payload: [],
      });
      getDetail(
        {
          bianhao: item.bianhao,
          kaishiSj: moment(getBeforeDay()).format('YYYYMMDD'),
          jieshuSj: moment().format('YYYYMMDD'),
          signType: '-1',
        },
        () => {
          dispatch({
            type: 'monitorZhx/showModalVisible',
            payload: {
              currItem: item,
            },
          });
        },
      );
    },
  };

  const filterProps = {
    list,
    jigouList,
    filter: query,
    onFilterChange(value) {
      dispatch(routerRedux.push({
        pathname,
        search: queryString.stringify({
          ...value,
          page: 1,
        }),
      }));
    },
  };

  const modalProps = {
    modalsignType,
    prev,
    detaiData,
    item: currItem,
    width: 800,
    visible: modalVisible,
    maskClosable: false,
    title: '数据详情',
    wrapClassName: 'vertical-center-modal',
    onCancel() {
      dispatch({
        type: 'monitorZhx/hideModalVisible',
      });
    },
    onChange(params) {
      getDetail({ ...params });
    },
  };

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    monitorZhx: state.monitorZhx,
  };
}

export default connect(mapStateToProps)(Form.create()(Index));
