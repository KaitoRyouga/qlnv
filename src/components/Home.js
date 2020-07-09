import React, { Component } from 'react'
import './Home.css'

import { Col, Row, Typography, Form, Input, Button, List, Table, Select  } from 'antd'
import { connect } from 'react-redux'
import { CSVLink } from "react-csv"
import SearchNV from '../action/SearchNV'

const { Option } = Select;

class Home extends Component {

    constructor(props) {
        super(props);
        this.exportBtn = React.createRef();
        this.SearchBtn = React.createRef();
    }
    

    state = {
        infoCopy: [],
        data: [],
        headers: [],
        active: false,
        data2: [],
        dataSource: [],
        dataSourceTemp: [],
    }

    handleExport = () => {

        const headers = []
        const data = []

        for (let index = 0; index < this.props.columns.length; index++) {
            headers.push({label: this.props.columns[index].title, key: this.props.columns[index].dataIndex}) 
        }

        for (let index = 0; index < this.state.data2.length; index++) {
            try {
                data.push({
                    index: this.state.data2[index].index,
                    MaNhanvien: this.state.data2[index].MaNhanvien,
                    TenNhanvien: this.state.data2[index].TenNhanvien,
                    Chinhanh: this.state.data2[index].Chinhanh,
                    Chucvu: this.state.data2[index].Chucvu,
                    Email: this.state.data2[index].Email,
                    SDT: this.state.data2[index].SDT,
                    CMND: this.state.data2[index].CMND,
                    NS: this.state.data2[index].Ngaycap,
                    Diachi: this.state.data2[index].Diachi,
                    Trangthai: this.state.data2[index].Trangthai,
                })
            } catch (error) {
                //
            }
        }

        this.setState({
            data: data,
            headers: headers,
            active: true
        })

        if (this.state.data != []) {
            this.setState({
              active: true
            });
            if (this.isCsvFileReady()) {
              this.exportBtn.current.link.click();
              this.setState({
                  active: false
              })
            } else {
              setTimeout(() => {
                if (this.isCsvFileReady()) {
                  this.exportBtn.current.link.click();
                  this.setState({
                    active: false
                })
                }
              }, 3000);
            }
        }
    }

    isCsvFileReady = () => {
        return this.exportBtn && 
        this.exportBtn.current &&
        this.exportBtn.current.link &&
        this.exportBtn.current.link.click &&
        typeof this.exportBtn.current.link.click === 'function';
    }

    onFinish = values => {
        console.log('Success:', values);
        this.props.SearchNV(values)
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    // componentDidUpdate

    componentDidUpdate(prevProps, prevState) {
        // console.log(this.props.activeSearch)
        console.log(prevProps)
        console.log(prevState.dataSource)
        console.log(prevProps.nhanvienSearch.length)
        console.log(this.state.dataSource.length)
        console.log(this.props.nhanvienSearch)

        if(prevState.dataSource === this.state.dataSource ){

            if(this.props.activeSearch === 1){
                this.setState({
                    dataSource: this.props.nhanvienSearch
                })
                // console.log('kaito')
            }
        }

        if(prevProps.nhanvienSearch !== this.props.nhanvienSearch){

            this.setState({
                dataSource: this.props.nhanvienSearch
            })
                console.log('kaito')
        }
    }

    componentDidMount() {
        this.setState({
            dataSource: this.props.nhanvien,
            // dataSourceTemp: this.props.nhanvienSearch,
        })

        // console.log(this.state.dataSourceTemp)
    }

    updateData = () => {
        console.log(this.props.activeSearch)
        // this.props.activeSearch
        if(this.props.activeSearch === 1){
            this.setState({
                dataSource: this.props.nhanvienSearch
            })
        }
    }

    render() {

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.props.handleClickColumn(selectedRows)
                this.setState({
                    data2: selectedRows
                })
            },
        };

        return (
            <div className="ContentHome">
                <div className="BoxContent">
                    <Typography style={{color: 'white'}}>
                        Quản lý nhân viên
                    </Typography>
                </div>
                <div className="BoxContentBottom">
                    <div className="InputNV">
                        <Form
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                        >
                            <Row>
                                <Col span={8}>
                                    <Form.Item name="Nhanvien" label="Nhân viên">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8} offset={3}>
                                    <Form.Item name="chinhanh" label="Chi nhánh">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <Form.Item name="chucvu" label="Chức vụ">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8} offset={3}>
                                    <Form.Item name="trangthai" label="Trạng thái">
                                            <Select>
                                                <Option value="Nhân viên thời vụ">Nhân viên thời vụ</Option>
                                                <Option value="Nhân viên chính thức">Nhân viên chính thức</Option>
                                                <Option value="Nhân viên thử việc">Nhân viên thử việc</Option>
                                                <Option value="Đã nghỉ việc">Đã nghỉ việc</Option>
                                            </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Button ref={this.SearchBtn} htmlType="submit"></Button>
                        </Form>
                    </div>
                    <div>
                        <List
                            grid={{
                                gutter: -10
                            }}
                            size="small"
                            dataSource={this.props.dataList}
                            renderItem={item => {

                                if(item.content == "Xuất file"){
                                    return(
                                        <List.Item key={Math.random()} style={{padding: '0', paddingRight: '0.5em'}}>
                                            <Button onClick={() => {
                                                this.handleExport()
                                            }} value={item.content} className="ButtonContent" shape="round">
                                                {item.content}
                                                {
                                                    this.state.active ? (
                                                        <CSVLink ref={this.exportBtn} data={this.state.data} headers={this.state.headers}></CSVLink>
                                                    ) : null
                                                }
                                            </Button>
                                        </List.Item>
                                    )

                                }else{
                                    return(
                                        <List.Item key={Math.random()} style={{padding: '0', paddingRight: '0.5em'}}>
                                            <Button onClick={() => {
                                                // if(item.content == "Tìm kiếm"){
                                                //     this.SearchBtn.current.click()
                                                // }
                                                
                                                if(item.content == "Tìm kiếm"){
                                                    this.SearchBtn.current.click()
                                                    // this.setState({
                                                    //     state: this.state
                                                    // })
                                                    // this.updateData()
                                                }

                                                
                                                this.props.handleClickButton(item.content)
                                            }} value={item.content} className="ButtonContent" shape="round">
                                                {item.content}
                                            </Button>
                                        </List.Item>
                                    )
                                }
                            }}
                        >

                        </List>
                    </div>
                </div>
                <div className="BoxContentBottom">
                    <Table
                        columns={this.props.columns}
                        dataSource={this.state.dataSource}
                        bordered
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        nhanvien: state.nhanvien,
        columns: state.columns,
        dataList: state.dataList,
        nhanvienSearch: state.nhanvienSearch,
        activeSearch: state.activeSearch
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        SearchNV: (id) => dispatch(SearchNV(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
