import modelExtend from 'dva-model-extend';

const model = {
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

const pageModel = modelExtend(model, {
  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `Total ${total} Items`,
      current: 1,
      total: 0,
    },
  },
  reducers: {
    querySuccess(state, { payload }) {
      const { list, page } = payload;
      return {
        ...state,
        list,
        pagination: {
          ...page,
        },
      };
    },
  },
});

const pageSizeModel = modelExtend(model, {
  namespace: 'common',
  state: {
    list: [],
    pagination: {
      current: 0,
      total: 0,
      pageSize: 10,
      totalCount: 0,
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { list, page } = payload;
      return {
        ...state,
        list,
        pagination: page && {
          current: page.pageNum,
          total: page.total,
          pageSize: page.pageSize,
          showSizeChanger: true,
        },
      };
    },
  },
});

export { model, pageModel, pageSizeModel };
