import React, { useState, useEffect } from 'react';
import { Col, Row, Typography, Form, Input, Tabs, Select, DatePicker, Upload, message, Button, Space } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/vi_VN';
import moment from 'moment';
import { connect } from 'react-redux'
import AddNV from '../action/AddNV'
import EditNV from '../action/EditNV'

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



const AddModal = (props) => {

    const [form] = Form.useForm();

    const [loading, setloading] = useState(null);
    const [reset, setreset] = useState(0);
    const [TenNhanvien, setTennhanvien] = useState(null);
    const [Manhanvien, setManhanvien] = useState(null);
    const [Chinhanh, setChinhanh] = useState(null);
    const [Chucvu, setChucvu] = useState(null);
    const [Gioitinh, setGioitinh] = useState(null);
    const [Email, setEmail] = useState(null);
    const [SDT, setSDT] = useState(null);
    const [CMND, setCMND] = useState(null);
    const [Ngaycap, setNgaycap] = useState(null);
    const [Noicap, setNoicap] = useState(null);
    const [Diachi, setDiachi] = useState(null);
    const [Phuongxa, setPhuongxa] = useState(null);
    const [Khuvuc, setKhuvuc] = useState(null);
    const [Trangthai, setTrangthai] = useState(null);
    const [Ghichu, setGhichu] = useState(null);
    const [Anhdaidien, setAnhdaidien] = useState(null);
    const [disabledOnOrOff, setdisabledOnOrOff] = useState(false)

    // const [Ma, setAnhdaidien] = useState(null);
    // const [Anhdaidien, setAnhdaidien] = useState(null);
    // const [Anhdaidien, setAnhdaidien] = useState(null);
    // const [Anhdaidien, setAnhdaidien] = useState(null);

    const callback = (key) => {
        console.log(key);
    }

    const onFinish = values => {
        console.log('Success:', values);
       
        try {
            switch (props.info[1].action) {
                case 'edit':
                    props.EditNV(values)
                    break;
            
                default:
                    props.AddNV(values)
                    break;
            }
        } catch (error) {
            props.AddNV(values)
        }
        props.handleClickBack()
    };

    const onReset = (e) => {
        setreset(1)

        form.resetFields();

        setManhanvien(null)
        setTennhanvien(null)
        setChinhanh(null)
        setChucvu(null)
        setGioitinh(null)
        setEmail(null)
        setSDT(null)
        setCMND(null)
        setNgaycap(null)
        setNoicap(null)
        setDiachi(null)
        setPhuongxa(null)
        setKhuvuc(null)
        setTrangthai(null)
        setGhichu(null)
        setAnhdaidien(null)
        
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if(props.info[0] && reset == 0){
            setChinhanh(props.info[0].Chinhanh)
            setChucvu(props.info[0].Chucvu)
            setEmail(props.info[0].Email)
            setSDT(props.info[0].SDT)
            setDiachi(props.info[0].Diachi)
            setPhuongxa(props.info[0].Phuongxa)
            setKhuvuc(props.info[0].Khuvuc)
            setTrangthai(props.info[0].Trangthai)
            setGhichu(props.info[0].Ghichu)
            setGioitinh(props.info[0].Gioitinh)
            setAnhdaidien(props.info[0].Anhdaidien)
            setManhanvien('')
            setTennhanvien('')
        }

        try {
            if(props.info[1].action == 'edit'){
                setManhanvien(props.info[0].MaNhanvien)
                setTennhanvien(props.info[0].TenNhanvien)  
                setCMND(props.info[0].CMND)  
                setNoicap(props.info[0].Noicap)

                // const NgayCap = props.info[0].Ngaycap.replace('/', '-')
                // const NgayCap2 = NgayCap.replace('/', '-')

                // setNgaycap(moment(`${NgayCap2}, DD-MM-YYYY`))
                setdisabledOnOrOff(true)  
            }else{
                setManhanvien('')
                setTennhanvien('')  
                setCMND('')  
                setNoicap('')  
            }
        } catch (error) {
            setManhanvien('')
            setTennhanvien('')  
            setCMND('')  
            setNoicap('')  
        }

    })

        const uploadButton = (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div>
                <div className="ContentHome">
                    <div className="BoxContent">
                        <Typography style={{color: 'white'}}>
                            Thêm mới nhân viên
                        </Typography>
                    </div>
                    <div className="BoxContentBottom">
                    <Tabs defaultActiveKey="1" onChange={() => callback()}>
                        <TabPane tab="Thông tin chung" key="1">
                            <Form
                                form={form}
                                onFinish={(submit) => onFinish(submit)}
                                onFinishFailed={() => onFinishFailed()}
                            >
                                <Row>
                                    <Col span={8}>
                                        <Form.Item key={Math.random()} name="MaNhanvien" label="Mã nhân viên" rules={[{ required: true, message: 'Ô này không được để trống !!!' }]}>
                                            <Input disabled={disabledOnOrOff} defaultValue={Manhanvien} />
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
                                            <DatePicker defaultValue={Ngaycap} style={{width: '100%'}} />
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
                                                // beforeUpload={beforeUpload}
                                                // onChange={this.handleChange}
                                            >
                                                <img src={uploadButton} alt="avatar" style={{ width: '100%' }} />
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
                                            <Button className="ButtonModal" onClick={() => onReset()}>Làm mới</Button>
                                            <Button className="ButtonModal" onClick={props.handleClickBack}>Đóng</Button>
                                        </Space>
                                    </div>
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

const mapStateToProps = (state) => {
    return{
        nhanvien: state.nhanvien
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        AddNV: (info) => dispatch(AddNV(info)),
        EditNV: (id) => dispatch(EditNV(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddModal)