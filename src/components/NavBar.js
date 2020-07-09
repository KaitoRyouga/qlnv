import React, { Component } from 'react'
import './NavBar.css'
import Home from "./Home";
import AddModal from './AddModal.js'

import { Typography, Layout, Menu } from 'antd'
import { CaretDownOutlined, MinusSquareOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import DeleteNV from '../action/DeleteNV'
import SearchNV from '../action/SearchNV'
const { Header, Content, Footer, Sider } = Layout;

class NavBar extends Component {

    state = {
        Qlnv: false,
        ModalAddqlnv: false,
        infoCopy: [],
        action: null,
        headers: [],
        data: [],
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

        const { Qlnv, ModalAddqlnv } = this.state

        return (
            <Layout className="LayoutHome">
                <Header className="HeaderHome">
                    <Typography style={{color: 'white'}}>Tổng quan</Typography>
                    <CaretDownOutlined style={{fontSize: '0.7em', marginLeft: '0.5em', color: 'black', marginTop: '0.1em'}}/>
                </Header>
                <Layout>
                    <Sider className="SliderHome">
                        <div className="BoxSlider">
                            <Typography style={{color: 'white'}}>
                                Quản lý đối tác
                            </Typography>
                            <MinusSquareOutlined style={{backgroundColor: 'white'}}/>
                        </div>
                        <div>
                            <Menu
                                mode="inline"
                            >
                                <Menu.Item key="1">
                                    <Typography style={{fontSize: '0.9em'}}>
                                        Thông tin cửa hàng
                                    </Typography>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Typography style={{fontSize: '0.9em'}}>
                                        Quản lý chi nhánh
                                    </Typography>
                                </Menu.Item>
                                <Menu.Item key="3" onClick={this.handleClickQlnv}>
                                    <Typography style={{fontSize: '0.9em'}}>
                                        Quản lý nhân viên
                                    </Typography>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Typography style={{fontSize: '0.9em'}}>
                                        Quản lý người dùng
                                    </Typography>
                                </Menu.Item>
                                <Menu.Item key="5">
                                    <Typography style={{fontSize: '0.9em'}}>
                                        Quản lý thông số hệ thống
                                    </Typography>
                                </Menu.Item>
                            </Menu>
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
