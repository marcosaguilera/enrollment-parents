import React, { Component } from 'react';
import { DatePicker, Steps, Icon, Layout, Menu, Breadcrumb, Input, Row, Col } from 'antd';

import 'antd/lib/date-picker/style/css';        // for css
import './Search.css';

const Step = Steps.Step;
const Search = Input.Search;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class SearchUI extends Component{

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
                                onSearch={value => console.log(value)}
                            />
                            </Col>
                            <Col span={12}></Col>
                        </Row>
                         <br />
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            <Steps size="small" current={1}>
                                <Step status="process" title="Matrícula" description="Resumen de matrícula" icon={<Icon type="bars" />} />
                                <Step status="wait" title="Mensualidades"  description="Selección de servicion mensuales" icon={<Icon type="bars" />} />
                                <Step status="wait" title="Confirmación" description="Confirmar selección" icon={<Icon type="like-o" />} />
                                <Step status="wait" title="Impresión y pago" description="Imprime o paga" icon={<Icon type="credit-card" />} />
                                <Step status="wait" title="Finalizar" description="Hemos terminado" icon={<Icon type="smile-o" />} />
                            </Steps>
                        </Content>
                    </Layout>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default SearchUI;