import React, { Component } from 'react'
import './NavBar.css'
import Home from "./Home";
import AddModal from './AddModal.js'

import { Typography, Layout, Divider, Row, Col } from 'antd'
import { CaretDownOutlined, MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import DeleteNV from '../action/DeleteNV'
import SearchNV from '../action/SearchNV'

import { Collapse } from 'antd';

const { Panel } = Collapse;

const { Header, Content, Footer, Sider } = Layout;

class NavBar extends Component {

    state = {
        Qlnv: false,
        ModalAddqlnv: false,
        infoCopy: [],
        action: null,
        headers: [],
        data: [],
        expand: false
    }

    handleClickButton = (name) => {

        switch (name) {
            case "Tìm kiếm":
                // this.props.SearchNV(this.state.infoCopy[0].MaNhanvien)
                // this.setState({
                //     ModalAddqlnv: !this.state.ModalAddqlnv,
                //     Qlnv: false,
                //     infoCopy: []
                // })
                break;
            case "Thêm":
                this.setState({
                    ModalAddqlnv: !this.state.ModalAddqlnv,
                    Qlnv: false,
                    infoCopy: []
                })
                break;
            case "Sao chép":
                this.setState({
                    ModalAddqlnv: true,
                    Qlnv: false,
                    action: 'copy'
                })
                break;

            case "Chỉnh sửa":
                this.setState({
                    ModalAddqlnv: true,
                    Qlnv: false,
                    action: 'edit'
                })
    
                this.handleClickEdit()
                break;

            case "Xóa":
                this.props.DeleteNV(this.state.infoCopy[0].MaNhanvien)
                break;
            
            case "Xuất file":
                this.handleExport()
                break;
        
            default:
                break;
        }
    }

    handleClickQlnv = () => {
        this.setState({
            Qlnv: !this.state.Qlnv,
            ModalAddqlnv: false
        })
    }

    handleClickBack = () => {
        this.setState({
            Qlnv: true,
            ModalAddqlnv: false
        })
    }

    handleClickEdit = () => {
        let newInfo = [].concat(this.state.infoCopy, [{action: 'edit'}])
        this.setState({
            infoCopy: newInfo
        })
    }

    handleClickColumn = (info) => {
        console.log(info)
        this.setState({
            infoCopy: info
        })
    }

    render() {

        const panel  = (
            <div className="BoxSlider">
                <Typography style={{color: 'white'}}>
                    Quản lý đối tác
                </Typography>
                {
                    this.state.expand ? <MinusSquareOutlined style={{backgroundColor: 'white'}}/> : <PlusSquareOutlined style={{backgroundColor: 'white'}} />
                }
                
            </div>
        )

        const { Qlnv, ModalAddqlnv } = this.state

        return (
            <Layout className="LayoutHome">
                <Header className="HeaderHome">
                    <Typography style={{color: 'white'}}>Tổng quan</Typography>
                    <CaretDownOutlined style={{fontSize: '0.7em', marginLeft: '0.5em', color: 'black', marginTop: '0.1em'}}/>
                </Header>
                <Layout>
                    <Sider className="SliderHome">
                        <div>
                        <Collapse onChange={() => this.setState({expand: !this.state.expand})} defaultActiveKey={['1']}>
                            <Panel showArrow={false} header={panel} key="1">
                            <Row>
                                <Col span={2}>
                                    <Divider dashed type="vertical" style={{height: '100%', backgroundColor: 'black'}}/>
                                </Col>
                                <Col span={22}>
                                    <Row justify="center" align="middle">
                                        <Col span={2}>
                                            <Divider dashed type="horizontal" style={{backgroundColor: 'black'}}/>
                                        </Col>
                                        <Col span={22}>
                                            <Typography className="TypographyPanel">
                                                Thông tin cửa hàng
                                            </Typography>
                                        </Col>
                                    </Row>
                                    <Row justify="center" align="middle">
                                        <Col span={2}>
                                            <Divider dashed type="horizontal" style={{backgroundColor: 'black'}}/>
                                        </Col>
                                        <Col span={22}>
                                            <Typography className="TypographyPanel">
                                                Quản lý chi nhánh
                                            </Typography>
                                        </Col>
                                    </Row>
                                    <Row justify="center" align="middle">
                                        <Col span={2}>
                                            <Divider dashed type="horizontal" style={{backgroundColor: 'black'}}/>
                                        </Col>
                                        <Col span={22}>
                                            <Typography onClick={this.handleClickQlnv} className="TypographyPanel">
                                                Quản lý nhân viên
                                            </Typography>
                                        </Col>
                                    </Row>
                                    <Row justify="center" align="middle">
                                        <Col span={2}>
                                            <Divider dashed type="horizontal" style={{backgroundColor: 'black'}}/>
                                        </Col>
                                        <Col span={22}>
                                            <Typography className="TypographyPanel">
                                                Quản lý người dùng
                                            </Typography>
                                        </Col>
                                    </Row>
                                    <Row justify="center" align="middle">
                                        <Col span={2}>
                                            <Divider dashed type="horizontal" style={{backgroundColor: 'black'}}/>
                                        </Col>
                                        <Col span={22}>
                                            <Typography className="TypographyPanel">
                                                Quản lý thông số hệ thống
                                            </Typography>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            </Panel>
                        </Collapse>
                        </div>
                    </Sider>
                    <Content>
                        {
                            Qlnv && (
                                <Home handleExport={this.handleExport} handleClickColumn={this.handleClickColumn} handleClickEdit={this.handleClickEdit} action={this.state.action} handleClickButton={this.handleClickButton}></Home>
                            )
                        }
                        {
                            ModalAddqlnv && (
                                <AddModal info={this.state.infoCopy} handleClickBack={this.handleClickBack}></AddModal>
                            )
                        }
                    </Content>
                </Layout>
                <Footer>
                </Footer>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        nhanvien: state.nhanvien,
        columns: state.columns,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        DeleteNV: (id) => dispatch(DeleteNV(id)),
        SearchNV: (id) => dispatch(SearchNV(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
