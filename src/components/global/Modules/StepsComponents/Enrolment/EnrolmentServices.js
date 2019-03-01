import React, { Component } from 'react';
import { List, Switch, Divider } from 'antd';
import NumberFormat from 'react-number-format';
import axios from 'axios';

// Import data and assets
import './EnrolmentServices.css'
import data from '../../../../../Datasource/EnrolmentDataSource.json';

class EnrollmentServices extends Component{
    constructor(){
        super();
        
        this.state = {
            // Data
            studentData: [],
            studentCode: '',
            studentGrade: '',
            studentName: '',
            studentLastname: ''
            // UI/UX
            
        }
    }
    
    componentDidMount(){
        
    }

    render(){
        return(
            <div className="mainCustom">
                <Divider orientation="left">Servicios de Matrículas</Divider>
                <List
                    bordered
                    dataSource={data}
                    footer={<div id="totalPayAmmount" >
                                <NumberFormat value={1230000} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </div>}
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
                                <div className="flowDiv" id="currencyAmmount">
                                    <NumberFormat value={item.value} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </div>
                            </div>
                        </List.Item>
                        )}
                />
            </div>
        );
    }
}

export default EnrollmentServices;