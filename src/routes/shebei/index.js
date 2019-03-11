import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import { Form, message } from 'antd';
import moment from 'moment';
import { config, getBeforeDay } from 'utils';
import List from './List';
import Filter from './Filter';
import ChangeModal from './changeModal';
import DeleteModal from './deleteModal';
import DaoruModal from './daoruModal';
import ZncModal from './zncModal';
import ZncdModal from './zncdModal';
import DtzModal from './dtzModal';
import ZhxModal from './zhxModal';
import CancelModal from './cancelModal';

const { api: { GET_DAORU_TEMPLATE } } = config;

const Index = (props) => {
  const { dispatch, shebei, location } = props;

  const {
    deleteModalVisible,
    changeModalVisible,
    daoruModalVisible,
    zncModalVisible,
    zncdModalVisible,
    dtzModalVisible,
    zhxModalVisible,
    cancelModalVisible,
    canceldeleteModalVisible,
    pagination,
    currItem,
    jigouList,
    list,
    fileList,
    modalshitu,
    modalsignType,
    prev,
    detaiData,
    daoruList,
    currentPage,
  } = shebei;
  const { pathname, search } = location;
  const query = queryString.parse(search);

  const getDetail = (params, callback) => {
    dispatch({
      type: 'shebei/getDetail',
      payload: {
        ...params,
      },
      callback: () => {
        if (callback) {
          callback();
        }
      },
    });
  }; // 智能床
  const zncdDetail = (params, callback) => {
    dispatch({
      type: 'shebei/zncdDetail',
      payload: {
        ...params,
      },
      callback: () => {
        if (callback) {
          callback();
        }
      },
    });
  }; // 智能床垫

  const dtzDetail = (params, callback) => {
    dispatch({
      type: 'shebei/dtzDetail',
      payload: {
        ...params,
      },
      callback: () => {
        if (callback) {
          callback();
        }
      },
    });
  }; // 多体征

  const zhxDetail = (params, callback) => {
    dispatch({
      type: 'shebei/zhxDetail',
      payload: {
        ...params,
      },
      callback: () => {
        if (callback) {
          callback();
        }
      },
    });
  }; // 智汇鞋

  const listProps = {
    pagination: {
      ...pagination,
    },
    dataSource: list,
    onEditItem(path, params) {
      dispatch(routerRedux.push({
        pathname: path,
        search: queryString.stringify({
          ...params,
        }),
      }));
    },
    shujutiaozhuan(item) {
      dispatch({
        type: 'shebei/changePrev',
        payload: [],
      });
      if (item.leixing === 1) {
        getDetail(
          {
            bianhao: item.bianhao,
            kaishiSj: moment(getBeforeDay()).format('YYYYMMDDHHmmss'),
            jieshuSj: moment().format('YYYYMMDDHHmmss'),
            shitu: 1,
          },
          () => {
            dispatch({
              type: 'shebei/showZncModal',
              payload: {
                currItem: item,
              },
            });
          },
        );
      } else if (item.leixing === 2) {
        zncdDetail(
          {
            bianhao: item.bianhao,
            kaishiSj: moment(getBeforeDay()).format('YYYYMMDDHHmmss'),
            jieshuSj: moment().format('YYYYMMDDHHmmss'),
            shitu: 1,
          },
          () => {
            dispatch({
              type: 'shebei/showZncdModal',
              payload: {
                currItem: item,
              },
            });
          },
        );
      } else if (item.leixing === 3) {
        dtzDetail(
          {
            bianhao: item.bianhao,
            kaishiSj: moment(getBeforeDay()).format('YYYYMMDD'),
            jieshuSj: moment().format('YYYYMMDD'),
            signType: '-1',
          },
          () => {
            dispatch({
              type: 'shebei/showDtzModal',
              payload: {
                currItem: item,
              },
            });
          },
        );
      } else if (item.leixing === 4) {
        zhxDetail(
          {
            bianhao: item.bianhao,
            kaishiSj: moment(getBeforeDay()).format('YYYYMMDD'),
            jieshuSj: moment().format('YYYYMMDD'),
          },
          () => {
            dispatch({
              type: 'shebei/showZhxModal',
              payload: {
                currItem: item,
              },
            });
          },
        );
      }
    },

    edit(item) {
      dispatch({
        type: 'shebei/showChangeModal',
        payload: {
          currItem: item,
        },
      });
    },

    onDelete(item) {
      dispatch({
        type: 'shebei/showDeleteModal',
        payload: {
          currItem: item,
        },
        callback: () => {
          dispatch({
            type: 'shebei/query',
            payload: {},
          });
        },
      });
    },
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
    daoru() {
      dispatch({
        type: 'shebei/showDaoruModal',
        payload: {},
      });
    },
    downLoad() {
      window.open(GET_DAORU_TEMPLATE);
    },
    recall() {
      dispatch({
        type: 'shebei/showCancelModal',
      });
      dispatch({
        type: 'shebei/getdaoruShebei',
        payload: {
          leixing: -1,
          zhuangtai: 1,
        },
      });
    },
  };

  const changeModalProps = {
    width: '550px',
    visible: changeModalVisible,
    wrapClassName: 'vertical-center-modal',
    title: '编辑设备',
    currItem,
    onOk(fields) {
      dispatch({
        type: 'shebei/hideChangeModal',
      });
      dispatch({
        type: 'shebei/xiugaiShebei',
        payload: {
          ...fields,
          leixing: currItem.leixing,
          id: currItem.bianhao,
        },
        callback: () => {
          message.success('修改成功');
          dispatch({
            type: 'shebei/query',
            payload: {
              ...query,
            },
          });
        },
      });
    },
    onCancel() {
      dispatch({
        type: 'shebei/hideChangeModal',
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
        type: 'shebei/shanchuShebei',
        payload: {
          leixing: currItem.leixing,
          id: currItem.bianhao,
        },
        callback: () => {
          message.success('删除成功');
          dispatch({
            type: 'shebei/query',
            payload: {
              ...query,
            },
          });
        },
      });
      dispatch({
        type: 'shebei/hideDeleteModal',
      });
    },
    onCancel() {
      dispatch({
        type: 'shebei/hideDeleteModal',
      });
    },
  };

  const daoruModalProps = {
    width: 550,
    fileList,
    visible: daoruModalVisible,
    wrapClassName: 'vertical-center-modal',
    title: '批量导入设备',
    onOk(fields) {
      dispatch({
        type: 'shebei/daoRushebei',
        payload: {
          ...fields,
          wenjian: fileList[0].originFileObj,
        },
        callback: (res) => {
          const { result: { total, valid } } = res;
          message.success(`共导入${total}条，其中有效导入设备共有${valid}条`);
          dispatch({
            type: 'shebei/query',
            payload: {
              ...query,
            },
          });
          dispatch({
            type: 'shebei/hideDaoruModal',
          });
        },
      });
    },
    onCancel() {
      dispatch({
        type: 'shebei/hideDaoruModal',
      });
    },
  };

  const zncModalProps = {
    modalshitu,
    prev,
    detaiData,
    item: currItem,
    width: 800,
    visible: zncModalVisible,
    maskClosable: false,
    title: '数据详情',
    wrapClassName: 'vertical-center-modal',
    onCancel() {
      dispatch({
        type: 'shebei/hideZncModal',
      });
    },
    onChange(params) {
      getDetail({ ...params });
    },
  };

  const zncdModalProps = {
    modalshitu,
    prev,
    detaiData,
    item: currItem,
    width: 800,
    visible: zncdModalVisible,
    maskClosable: false,
    title: '数据详情',
    wrapClassName: 'vertical-center-modal',
    onCancel() {
      dispatch({
        type: 'shebei/hideZncdModal',
      });
    },
    onChange(params) {
      zncdDetail({ ...params });
    },
  };

  const dtzModalProps = {
    modalsignType,
    prev,
    detaiData,
    item: currItem,
    width: 800,
    visible: dtzModalVisible,
    maskClosable: false,
    title: '数据详情',
    wrapClassName: 'vertical-center-modal',
    onCancel() {
      dispatch({
        type: 'shebei/hideDtzModal',
      });
    },
    onChange(params) {
      dtzDetail({ ...params });
    },
  };

  const zhxModalProps = {
    modalsignType,
    prev,
    detaiData,
    item: currItem,
    width: 800,
    visible: zhxModalVisible,
    maskClosable: false,
    title: '数据详情',
    wrapClassName: 'vertical-center-modal',
    onCancel() {
      dispatch({
        type: 'shebei/hideZhxModal',
      });
    },
    onChange(params) {
      zhxDetail({ ...params });
    },
  };

  const cancelModalProps = {
    daoruList,
    canceldeleteModalVisible,
    currItem,
    currentPage,
    width: 1000,
    visible: cancelModalVisible,
    maskClosable: false,
    title: '批量撤销导入设备',
    wrapClassName: 'vertical-center-modal',
    onOk() {
      dispatch({
        type: 'shebei/hideCancelModal',
      });
    },
    onCancel() {
      dispatch({
        type: 'shebei/hideCancelModal',
      });
    },
    onChange(params) {
      zncdDetail({ ...params });
    },
  };
  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {changeModalVisible && <ChangeModal {...changeModalProps} />}
      {deleteModalVisible && <DeleteModal {...deleteModalProps} />}
      {daoruModalVisible && <DaoruModal {...daoruModalProps} />}
      {zncModalVisible && <ZncModal {...zncModalProps} />}
      {zncdModalVisible && <ZncdModal {...zncdModalProps} />}
      {dtzModalVisible && <DtzModal {...dtzModalProps} />}
      {zhxModalVisible && <ZhxModal {...zhxModalProps} />}
      {cancelModalVisible && <CancelModal {...cancelModalProps} />}
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
