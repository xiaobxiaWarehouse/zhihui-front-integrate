import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import { Button, Col, Form, Row } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
  style: {},
};

const getXingbie = (type) => {
  if (type === 'M') {
    return '男';
  } else if (type === 'F') {
    return '女';
  } else if (type === 3) {
    return '其他';
  } else {
    return '-';
  }
};

const getZhuangtai = (type) => {
  if (type === 4) {
    return '在院';
  } else if (type === 5) {
    return '离院';
  } else {
    return '-';
  }
};

const Detail = (props) => {
  const { dangan, dispatch } = props;

  const { detaiData } = dangan;

  const onDetail = (pathname, params) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...params,
      }),
    }));
  };

  return (
    <div className="content-inner">
      <Row>
        <Col span={12}>
          <Button
            onClick={() => {
              dispatch(routerRedux.goBack());
            }}
          >
            返回
          </Button>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            onClick={() => {
              onDetail('/dangan/dataDetail', {
                jigou: detaiData.jigou,
                id: detaiData.suoyin,
              });
            }}
          >
            数据详情
          </Button>
          <Button
            type="primary"
            onClick={() => {
              onDetail('/dangan/jiankang', {
                jigou: detaiData.jigou,
                id: detaiData.suoyin,
              });
            }}
            style={{ marginLeft: 10 }}
          >
            健康档案
          </Button>
        </Col>
      </Row>
      <div className="ant-form-item-borderLeft">
        <span className="ant-form-item-borderLefthight">入院信息</span>
      </div>
      <Form className="role-detail-formitem">
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="姓名">
              {detaiData && detaiData.xingming}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="身份证">
              {(detaiData && detaiData.shenfenzheng) || '-'}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="年龄">
              {(detaiData && detaiData.nianling) || '-'}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="性别">
              {detaiData && detaiData.xingbie && getXingbie(detaiData.xingbie)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="入住床位">
              {(detaiData && detaiData.chuangwei) || '-'}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="在/离院状态">
              {detaiData && detaiData.zhuangtai
                ? getZhuangtai(detaiData.zhuangtai)
                : '-'}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="所属机构">
              {(detaiData && detaiData.jigouMc) || '-'}
            </FormItem>
          </Col>
        </Row>

        <div
          style={{
            width: '100%',
            borderBottom: '1px solid #D8D8D8',
            margin: '20px 0',
          }}
        />
        <div className="ant-form-item-borderLeft">
          <span className="ant-form-item-borderLefthight">其他信息</span>
        </div>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="监护人姓名">
              {(detaiData && detaiData.jianhurenXm) || '-'}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="监护人手机号">
              {(detaiData && detaiData.jianhurenDh) || '-'}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="医保情况">
              {(detaiData && detaiData.yibaoQk) || '-'}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="病史情况">
              {(detaiData && detaiData.bingshiQk) || '-'}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="其他情况">
              {(detaiData && detaiData.qitaQk) || '-'}
            </FormItem>
          </Col>
        </Row>

        <div
          style={{
            width: '100%',
            borderBottom: '1px solid #D8D8D8',
            margin: '20px 0',
          }}
        />
        <div className="ant-form-item-borderLeft">
          <span className="ant-form-item-borderLefthight">绑定设备信息</span>
        </div>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="智能床">
              {(detaiData && detaiData.chuang) || '-'}
              {detaiData &&
                detaiData.chuang && (
                  <a
                    style={{
                      display: 'inline-block',
                      marginLeft: 30,
                      color: '#009EFF',
                    }}
                    onClick={() => {
                      onDetail('/shebei/bangding', {
                        leixing: 1,
                        bianhao: detaiData.chuang,
                      });
                    }}
                  >
                    绑定记录
                  </a>
                )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="智能床垫">
              {(detaiData && detaiData.chuangdian) || '-'}
              {detaiData &&
              detaiData.chuangdian && (
                <a
                  style={{
                    display: 'inline-block',
                    marginLeft: 30,
                    color: '#009EFF',
                  }}
                  onClick={() => {
                    onDetail('/shebei/bangding', {
                      leixing: 2,
                      bianhao: detaiData.chuangdian,
                    });
                  }}
                >
                  绑定记录
                </a>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="多体征设备">
              {(detaiData && detaiData.duotizheng) || '-'}
              {detaiData &&
                detaiData.duotizheng && (
                  <a
                    style={{
                      display: 'inline-block',
                      marginLeft: 30,
                      color: '#009EFF',
                    }}
                    onClick={() => {
                      onDetail('/shebei/bangding', {
                        leixing: 3,
                        bianhao: detaiData.duotizheng,
                      });
                    }}
                  >
                    绑定记录
                  </a>
                )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="智汇鞋">
              {(detaiData && detaiData.xie) || '-'}
              {detaiData &&
              detaiData.xie && (
                <a
                  style={{
                    display: 'inline-block',
                    marginLeft: 30,
                    color: '#009EFF',
                  }}
                  onClick={() => {
                    onDetail('/shebei/bangding', {
                      leixing: 4,
                      bianhao: detaiData.xie,
                    });
                  }}
                >
                  绑定记录
                </a>
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    dangan: state.dangan,
  };
}

export default connect(mapStateToProps)(Form.create()(Detail));
