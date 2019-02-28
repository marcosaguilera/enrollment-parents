import React, { Component } from 'react';
import { List, Switch } from 'antd';

// Import data and assets
import './EnrolmentServices.css'
import data from '../../../../../Datasource/EnrolmentDataSource.json';

class EnrollmentServices extends Component{
    render(){
        return(
            <div className="mainCustom">
                <h3 style={{ marginBottom: 16 }}>Servicios de Matrículas</h3>
                <List
                    bordered
                    dataSource={data}
                    renderItem={
                        item => (
                        <List.Item>
                            <div className="gridWrapper">
                                <div>
                                    <List.Item.Meta
                                    title={<span className="titleCustom">{item.name}</span>}
                                    description={item.description}
                                    />
                                </div>
                                <div className="flowDiv">
                                    <Switch checkedChildren="Si" unCheckedChildren="No" defaultChecked/>
                                </div>
                                <div className="flowDiv">{item.value}</div>
                            </div>
                        </List.Item>
                        )}
                />
            </div>
        );
    }
}

export default EnrollmentServices;