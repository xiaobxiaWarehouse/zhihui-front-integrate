import React from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';
import queryString from 'query-string';
import {Form, message} from 'antd';
import List from './List';
import Filter from './Filter';
import Modal from './Modal';
import DeleteModal from './deleteModal';

const Index = (props) => {
  const {
    dispatch,
    group,
    location,
  } = props;

  const {
    list,
    modalVisible,
    jigouList,
    pagination,
    suoshuJt,
    deleteModalVisible,
    currItem,
  } = group;

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

    onEditItem (path, params) {
      dispatch(routerRedux.push({
        pathname: path,
        search: queryString.stringify({
          ...params,
        }),
      }));
    },

    showModalProps(record, params) {
      dispatch({
        type: 'group/jigouXq',
        payload: {
          suoshuJt,
          ...params,
        },
      });
      dispatch({
        type: 'group/showModal',
        payload: {},
      });
    },

    onDelete(data) {
      dispatch({
        type: 'group/showDeleteModal',
        payload: {
          currItem: data,
        },
      });
    },
  };

  const filterProps = {
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

    addjigou() {
      dispatch(routerRedux.push({pathname: '/group/addjigou'}));
    },
  };

  const modalProps = {
    width: 350,
    visible: modalVisible,
    wrapClassName: 'vertical-center-modal',
    title: '所属集团',
    onOk () {
      dispatch({
        type: 'group/hideModal',
      });
    },
    onCancel () {
      dispatch({
        type: 'group/hideModal',
      });
    },
  };

  const deleteModalProps = {
    width: 350,
    visible: deleteModalVisible,
    wrapClassName: 'vertical-center-modal',
    title: '操作提示',
    currItem,
    onOk() {
      dispatch({
        type: 'group/deleteList',
        payload: {
          id: currItem.id,
        },
        callback: () => {
          message.success('删除成功');
          dispatch({
            type: 'group/query',
            payload: {
              ...query,
            },
          });
        },
      });
      dispatch({
        type: 'group/hideDeleteModal',
      });
    },
    onCancel() {
      dispatch({
        type: 'group/hideDeleteModal',
      });
    },
  };
  return (
    <div className="content-inner">
      <Filter {...filterProps}/>
      <List {...listProps}/>
      {
        modalVisible && <Modal {...modalProps}/>
      }
      {deleteModalVisible && <DeleteModal {...deleteModalProps} />}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    group: state.group,
  };
}

export default (connect(mapStateToProps)(Form.create()(Index)));
