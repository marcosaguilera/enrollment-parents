import React, { Component } from 'react';
import { DatePicker, Steps, Icon, Layout, Menu, Breadcrumb, Input, Row, Col } from 'antd';
import axios from 'axios';

import 'antd/lib/date-picker/style/css';        // for css
import './Search.css';

// Components
import EnrolmentServices from '../StepsComponents/Enrolment/EnrolmentServices';

const Step = Steps.Step;
const Search = Input.Search;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class SearchUI extends Component{
    
    constructor(){
        super();
        
        this.getOpenApplyUuid = this.getOpenApplyUuid.bind(this);

        this.state = {
            // Global States
            studentCode: '', openApplyId: 0, customId: '',
            enrollment_year: '', first_name: '', last_name: '', gender: '', grade: '', name_full: '',
            serial_number: 0, student_id: ''

            // UI/UX states
        }
    }
    
    componentDidMount(){

    }
    
    handleOnChange = (e) => {
        if(e.target.id === 'search-student-input'){
            this.setState({
                studentCode: String(e.target.value)
            }, () => {
                //console.log(this.state.studentCode);
            })
        }
    }
    
    getOpenApplyUuid(){
        console.log(this.state.studentCode);
        const url = "https://rcis-backend.herokuapp.com/openapply/student/getopenapplybystudentcode/" + this.state.studentCode;
        console.log(url);
        axios.get(url)
            .then( res => {
                console.log(res.data)
                this.setState({
                    openApplyId: res.data.id,
                    customId: res.data.custom_id,
                    enrollment_year: res.data.enrollment_year,
                    gender: res.data.gender,
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    name_full: res.data.name,
                    serial_number: res.data.serial_number,
                    student_id: res.data.student_id
                }, () => {
                    console.log("=>" + this.state.openApplyId)
                })
            })
    }

    render(){

        return(
            <div className="SearchUI">
                <Layout>
                    <Header className="header" style={{ background: '#ffffff' }}>
                        <div className="logo" />
                    <Menu
                        theme=""
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                    </Header>
                    <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }} >
                            <Menu.Item key="1">
                                <Icon type="solution" />
                                <span>Matrículas</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="rocket" />
                                <span>Eco</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <br />
                        <Row>
                            <Col span={12}>
                            <Search
                                placeholder="Código del estudiante"
                                enterButton="Buscar"
                                size="large"
                                allowClear
                                maxLength={5}
                                id="search-student-input"
                                onChange={this.handleOnChange}
                                onSearch={this.getOpenApplyUuid}
                            />
                            </Col>
                            <Col span={12}></Col>
                        </Row>
                         <br />
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Rochester</Breadcrumb.Item>
                            <Breadcrumb.Item>Enrollment</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            <Steps size="small" current={1}>
                                <Step status="process" title="Matrícula" icon={<Icon type="bars" />} />
                                <Step status="wait" title="Mensualidades" icon={<Icon type="bars" />} />
                                <Step status="wait" title="Confirmación" icon={<Icon type="like-o" />} />
                                <Step status="wait" title="Impresión y pago" icon={<Icon type="credit-card" />} />
                                <Step status="wait" title="Finalizar" icon={<Icon type="smile-o" />} />
                            </Steps>
                            <hr/>
                            <EnrolmentServices />
                        </Content>
                    </Layout>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default SearchUI;