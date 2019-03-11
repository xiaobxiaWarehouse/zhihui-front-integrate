import React from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';
import queryString from 'query-string';
import { Button, Col, Form, Input, Row, Checkbox} from 'antd';
import {config} from 'utils';
import styles from './index.less';

const FormItem = Form.Item;
const {jgPrefixPath} = config;

const detail = (props) => {
  const {
    dispatch,
    group,
    location,
    app,
  } = props;

  const { config: appConfig } = app;
  const { detaiData } = group;
  const { search } = location;
  const query = queryString.parse(search);
  const formItemLayout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 8,
    },
    style: {
    },
  };

  const formItemLayout1 = {
    labelCol: {
      span: 0,
    },
    wrapperCol: {
      span: 24,
    },
    style: {
    },
  };

  let jchlUrl;
  if (appConfig && appConfig.jchl && appConfig.jchl.url && detaiData) {
    if (detaiData.domain) {
      jchlUrl = `${detaiData.domain}/jchl/`;
    } else {
      jchlUrl = `${appConfig.jchl.url}/${jgPrefixPath}/${detaiData.bianhao}/`;
    }
  }

  let ylzhUrl;
  if (appConfig && appConfig.ylzh && appConfig.ylzh.url && detaiData) {
    if (detaiData.domain) {
      ylzhUrl = `${detaiData.domain}/ylzh/`;
    } else {
      ylzhUrl = `${appConfig.ylzh.url}/${jgPrefixPath}/${detaiData.bianhao}/`;
    }
  }

  const bindSys = [
    {id: 1, name: '智汇设备监测系统', url: jchlUrl},
    {id: 2, name: '智汇养老照护系统', url: ylzhUrl},
  ];

  const bianji = () => {
    dispatch(routerRedux.push({
      pathname: '/group/edit',
      search: queryString.stringify({
        leixing: detaiData.leixing,
        ...query,
      }),
    }));
  };

  const getSysName = (sys) => {
    let list = [];
    if (sys) {
      let sysList = sys.split(';');
      list = bindSys.filter((item) => {
        return sysList.indexOf(String(item.id)) > -1;
      });
    }
    return list;
  };

  let sysArray = [];
  if (detaiData && detaiData.sys) {
    sysArray = detaiData.sys.split(';');
  }

  return (
    <div className="content-inner">
      <Row>
        <Col span={12}>
          <Button onClick={() => { dispatch(routerRedux.goBack()); }}>返回</Button>
        </Col>
        <Col span={12} style={{textAlign: 'right'}}>
          <Button type="primary" onClick={() => { bianji(); }}>编辑</Button>
        </Col>
      </Row>
      <div className="ant-form-item-borderLeft"><span className="ant-form-item-borderLefthight">{Number(detaiData.leixing) === 1 ? '机构信息' : '集团信息'}</span></div>
      <Form>
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label={Number(detaiData.leixing) === 1 ? '机构名称' : '集团名称'}>
              {detaiData && detaiData.mingcheng}
            </FormItem>
          </Col>
        </Row>
        <Row style={{padding: '0 20px'}}>
          <Col className={detaiData.dizhi && detaiData.dizhi.length > 0 ? 'group-dizhi' : ''} span={24}>
            <FormItem {...formItemLayout} label={Number(detaiData.leixing) === 1 ? '机构地址' : '集团地址'} style={{margin: 'auto'}}>
              {detaiData.sheng} {detaiData.shi} {detaiData.qu}
            </FormItem>
          </Col>
        </Row>
        {
          detaiData.dizhi && detaiData.dizhi.length > 0 ? <Row style={{padding: '0 20px'}} >
            <Col span={24}>
              <Col span={9} />
              <Col span={8}>
                <FormItem {...formItemLayout1}>
                  {detaiData && detaiData.dizhi}
                </FormItem>
              </Col>
            </Col>
          </Row> : null
        }
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="联系人">
              {detaiData && detaiData.lianxirenXm}
            </FormItem>
          </Col>
        </Row>
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="联系人电话">
              {detaiData && detaiData.lianxirenDh}
            </FormItem>
          </Col>
        </Row>
        { detaiData.leixing === 2 && <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="下属机构">
              {detaiData && detaiData.xiashuJg && detaiData.xiashuJg.map((item, itemIndex) => {
                return (
                  <span key={item.id}>
                    {
                      (detaiData.xiashuJg.length - 1) === itemIndex ? item.mingcheng : `${item.mingcheng}，`}
                  </span>
                );
              })}
            </FormItem>
          </Col>
        </Row>}
        { detaiData.leixing === 1 && <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="所属集团">
              {detaiData && detaiData.suoshuJt && detaiData.suoshuJt.map((item, itemIndex) => {
                return (
                  <span key={item.id}>
                    {
                      (detaiData.suoshuJt.length - 1) === itemIndex ? item.mingcheng : `${item.mingcheng}，`}
                  </span>
                );
              })}
            </FormItem>
          </Col>
        </Row>}
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="软件版本">
              <Checkbox.Group className={styles.lineHeightInherit} value={sysArray}>
                <Row>{bindSys.map((item) => {
                    return (
                      <Col span={24} key={`col_${item.id}`}>
                        <Checkbox
                          className={styles.disabled}
                          style={{ fontSize: 16 }}
                          key={item.id}
                          value={String(item.id)}
                        >
                          {item.name}
                        </Checkbox>
                        <a className={styles.a} rel="noopener noreferrer" href={item.url} target="_blank">{item.url}</a>
                      </Col>
                    );
                  })}
                </Row>
              </Checkbox.Group>
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
    group: state.group,
  };
}

export default (connect(mapStateToProps)(Form.create()(detail)));
