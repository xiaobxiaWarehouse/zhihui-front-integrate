import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import {config} from 'utils';
import lodash from 'lodash';
import Image from './Image';
import Filter from './Filter';
import Modal from './ViewModal';

const {PROJECT} = config;

const Index = (props) => {
  const {
    dispatch,
    dangan: {
      ruzhuData,
      viewModalVisible,
      currentImg,
      qita,
      createTime,
      currentBgIndex,
    },
    query,
  } = props;

  const showImg = (img) => {
    dispatch({
      type: 'dangan/showViewModal',
      payload: {
        currentImg: img,
      },
    });
  };

  const handleRoot = (node) => {
    this.box = node;
  };

  const renderColumn = (rowIndex, col, index) => {
    let keyId = (rowIndex + 1) * (index + 1);
    return (
      <Col
        span={8}
        key={keyId}
        onClick={() => {
          showImg(col['01']);
        }}
      >
        <div
          ref={handleRoot}
          style={{
            width: '100%',
            height: 350,
            border: '1px solid #d9d9d9',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image imageUrl={`${PROJECT}/oss/${col['01']}?x-oss-process=image/resize,m_lfit,w_${(this.box && this.box.offsetWidth) || 350},h_350/auto-orient,1`} />
        </div>
      </Col>
    );
  };

  const renderRow = (row, index) => {
    let keyId = index;
    return (
      <Row gutter={24} key={keyId} style={{ marginBottom: 10 }}>
        {row.map((item, colIndex) => {
          return renderColumn(index, item, colIndex);
        })}
      </Row>
    );
  };

  const renderTable = (data) => {
    const grids = lodash.chunk(data, 3);
    return grids.map(renderRow);
  };

  const modalProps = {
    width: '70%',
    currentImg,
    visible: viewModalVisible,
    maskClosable: false,
    bodyStyle: { padding: '0'},
    title: '查看图片',
    wrapClassName: 'vertical-center-modal',
    onCancel() {
      dispatch({
        type: 'dangan/hideViewModal',
        payload: {
          currentImg: null,
        },
      });
    },
  };

  const filterProps = {
    qita,
    createTime,
    currentBgIndex,
    onFilterChange(key) {
      let index = key === 'left' ? currentBgIndex - 1 : currentBgIndex + 1;
      dispatch({
        type: 'dangan/getMubanDataId',
        payload: {
          jigou: Number(query.jigou),
          suoyin: Number(query.id),
          id: qita[index - 1],
        },
      });
    },
  };

  return (
    <div>
      {qita && qita.length > 0 && <Filter {...filterProps} />}
      <div>{renderTable(ruzhuData && ruzhuData['01'] && ruzhuData['01']['01'] ? ruzhuData['01']['01'] : [])}</div>
      {viewModalVisible && <Modal {...modalProps} />}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    dangan: state.dangan,
  };
}

export default connect(mapStateToProps)(Index);
