import React, { Component } from 'react'
import { Col, Row, Typography, Form, Input, Tabs, Select, DatePicker, Upload, message, Button, Space } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import AddNV from '../action/AddNV'

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const Test = () => {

    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
        console.log('asdfasdf')
    };

        return (
            <div>
                <div className="ContentHome">
                    <div className="BoxContent">
                        <Typography style={{color: 'white'}}>
                            Thêm mới nhân viên
                        </Typography>
                    </div>
                    <div className="BoxContentBottom">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Thông tin chung" key="1">
                            <Form
                            form={form}
                                // onFinish={this.onFinish}
                                // onFinishFailed={this.onFinishFailed}
                            >
                                <Row>
                                    <Col span={8}>
                                        <Form.Item key={Math.random()} name="MaNhanvien" label="Mã nhân viên" rules={[{ required: true, message: 'Ô này không được để trống !!!' }]}>
                                            <Input values="kait" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} offset={3}>
                                        <Form.Item key={Math.random()} name="TenNhanvien" label="Tên nhân viên" rules={[{ required: true, message: 'Ô này không được để trống !!!' }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Form.Item>
          <Button onClick={onReset} >Clear</Button>
        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </TabPane>
                    </Tabs>
                    </div>
                </div>
            </div>
        )
    }
// }

export default Test