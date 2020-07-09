import React, { Component } from 'react'
import { Col, Row, Typography, Form, Input, Tabs, Select, DatePicker, Upload, message, Button, Space } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import AddNV from '../action/AddNV'

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
  
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class AddModal extends Component {

    state = {
        loading: false,
        Manhanvien: null,
        TenNhanvien: null,
        Chinhanh: null,
        Chucvu: null,
        Gioitinh: null,
        Email: null,
        SDT: null,
        CMND: null,
        Ngaycap: null,
        Noicap: null,
        Diachi: null,
        Phuongxa: null,
        Khuvuc: null,
        Trangthai: null,
        Ghichu: null,
        Anhdaidien: null,
    };

    callback = (key) => {
        console.log(key);
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
    };
    
    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e)
    }

    onFinish = values => {
        console.log('Success:', values);
        this.props.AddNV(values)
        this.props.handleClickBack()
    };

    onReset = (e) => {

        this.setState({
            Manhanvien: null,
            TenNhanvien: null,
            Chinhanh: null,
            Chucvu: null,
            Gioitinh: null,
            Email: null,
            SDT: null,
            CMND: null,
            Ngaycap: null,
            Noicap: null,
            Diachi: null,
            Phuongxa: null,
            Khuvuc: null,
            Trangthai: null,
            Ghichu: null,
            Anhdaidien: null,
        })

        this.forceUpdate()
        this.render()
        
    };
    
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    componentDidMount() {
        if(this.props.info[0]){
            this.setState({
                Chinhanh: this.props.info[0].Chinhanh,
                Chucvu :this.props.info[0].Chucvu,
                Email: this.props.info[0].Email,
                SDT: this.props.info[0].SDT,
                Diachi: this.props.info[0].Diachi,
                Phuongxa: this.props.info[0].Phuongxa,
                Khuvuc: this.props.info[0].Khuvuc,
                Trangthai: this.props.info[0].Trangthai,
                Ghichu: this.props.info[0].Ghichu,
                Gioitinh: this.props.info[0].Gioitinh,
                Anhdaidien: this.props.info[0].Anhdaidien,
                Manhanvien: '',
                Tennhanvien: '',
            })
        }
    }


    render() {
        

        // console.log(this.props.info[0])

        const uploadButton = (
            <div>
              {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div className="ant-upload-text">Upload</div>
            </div>
        );

        const { imageUrl, TenNhanvien, Manhanvien, Chinhanh, Chucvu, Gioitinh, Email, SDT, CMND, Ngaycap, Noicap, Diachi, Phuongxa, Khuvuc, Trangthai, Ghichu, Anhdaidien } = this.state;

        return (
            <div>
                <div className="ContentHome">
                    <div className="BoxContent">
                        <Typography style={{color: 'white'}}>
                            Thêm mới nhân viên
                        </Typography>
                    </div>
                    <div className="BoxContentBottom">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Thông tin chung" key="1">
                            <Form
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}
                            >
                                <Row>
                                    <Col span={8}>
                                        <Form.Item key={Math.random()} name="MaNhanvien" label="Mã nhân viên" rules={[{ required: true, message: 'Ô này không được để trống !!!' }]}>
                                            <Input values="kait" defaultValue={Manhanvien} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} offset={3}>
                                        <Form.Item key={Math.random()} name="TenNhanvien" label="Tên nhân viên" rules={[{ required: true, message: 'Ô này không được để trống !!!' }]}>
                                            <Input defaultValue={TenNhanvien}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <Form.Item key={Math.random()} name="Chinhanh" label="Chi nhánh">
                                            <Select defaultValue={Chinhanh}>
                                                <Option value="Chi nhánh HCM">Chi nhánh HCM</Option>
                                                <Option value="Chi nhánh HN">Chi nhánh HN</Option>
                                                <Option value="Chi nhánh XYZ">
                                                    Chi nhánh XYZ
                                                </Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} offset={3}>
                                        <Form.Item key={Math.random()} name="Chucvu" label="Chức vụ">
                                            <Select defaultValue={Chucvu}>
                                                <Option value="Nhân viên thu ngân">Nhân viên thu ngân</Option>
                                                <Option value="Nhân viên bảo vệ">Nhân viên bảo vệ</Option>
                                                <Option value="Nhân viên XYZ">
                                                    Nhân viên XYZ
                                                </Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <Form.Item key={Math.random()} name="Gioitinh" label="Giới tính">
                                            <Select defaultValue={Gioitinh}>
                                                <Option value="Nam">Nam</Option>
                                                <Option value="Nũ">Nữ</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} offset={3}>
                                        <Form.Item key={Math.random()} name="Email" label="Email">
                                            <Input defaultValue={Email}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <Form.Item key={Math.random()} name="SDT" label="Số điện thoại">
                                            <Input defaultValue={SDT}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} offset={3}>
                                        <Form.Item key={Math.random()} name="CMND" label="Số CMND" rules={[{ required: true, message: 'Ô này không được để trống !!!' }]}>
                                            <Input defaultValue={CMND}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <Form.Item key={Math.random()} name="Ngaycap" label="Ngày cấp" rules={[{ required: true, message: 'Ô này không được để trống !!!' }]}>
                                            <DatePicker style={{width: '100%'}} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} offset={3}>
                                        <Form.Item key={Math.random()} name="Noicap" label="Nơi cấp" rules={[{ required: true, message: 'Ô này không được để trống !!!' }]}>
                                            <Input defaultValue={Noicap}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <Form.Item key={Math.random()} name="Diachi" label="Địa chỉ">
                                            <Input defaultValue={Diachi}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} offset={3}>
                                        <Form.Item key={Math.random()} name="Phuongxa" label="Phường xã">
                                            <Select defaultValue={Phuongxa}>
                                                <Option value="PhuongX">Phường X</Option>
                                                <Option value="PhuongY">Phường Y</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <Form.Item key={Math.random()} name="Khuvuc" label="Khu vực">
                                            <Select defaultValue={Khuvuc}>
                                                <Option value="KhuvucX">Khu vực X</Option>
                                                <Option value="KhuvucY">Khu vực Y</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} offset={3}>
                                        <Form.Item key={Math.random()} name="Trangthai" label="Trạng thái">
                                            <Select defaultValue={Trangthai}>
                                                <Option value="Nhanvienthoivu">Nhân viên thời vụ</Option>
                                                <Option value="Nhanvienchinhthuc">Nhân viên chính thức</Option>
                                                <Option value="Nhanvienthuviec">Nhân viên thử việc</Option>
                                                <Option value="Danghiviec">Đã nghỉ việc</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <Form.Item key={Math.random()} name="Ghichu" label="Ghi chú">
                                            <TextArea rows={4} defaultValue={Ghichu} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} offset={3}>
                                        <Form.Item key={Math.random()} name="Anhdaidien" label="Ảnh đại diện">
                                            <Upload
                                                name="avatar"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                beforeUpload={beforeUpload}
                                                onChange={this.handleChange}
                                            >
                                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                            </Upload>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={15}>
                                        
                                    </Col>
                                    <Col span={6} offset={3}>
                                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                        <Space>
                                            <Button htmlType="submit" className="ButtonModal">Lưu</Button>
                                            <Button className="ButtonModal" onClick={this.onReset}>Làm mới</Button>
                                            <Button className="ButtonModal" onClick={this.props.handleClickBack}>Đóng</Button>
                                        </Space>
                                    </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Form.Item>
          <Button onClick={e => {
this.props.form.resetFields()
                          }} >Clear</Button>
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
}

const mapStateToProps = (state) => {
    return{
        nhanvien: state.nhanvien
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        AddNV: (info) => dispatch(AddNV(info))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddModal)