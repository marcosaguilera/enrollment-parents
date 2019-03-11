import React, { Component } from 'react';
import { List, Switch, Divider } from 'antd';
import NumberFormat from 'react-number-format';
//import axios from 'axios';

// Import data and assets
import './EnrolmentServices.css'
import data from '../../../../../Datasource/EnrolmentDataSource.json';

class EnrollmentServices extends Component{
    constructor(){
        super();

        this.onChangeServiceRegistration.bind = this.onChangeServiceRegistration.bind(this);

        this.state = {
            // Data
            studentData: [],
            studentCode: '',
            studentGrade: '',
            studentName: '',
            studentLastname: '',
            serviceObject: {},
            totalPay: 0,
            serviceValueAux: 0, //This state is used for save the service value


            // UI/UX

        }
    }

    componentDidMount = () => {
        this.serializeTotalValue()
    }

    serializeTotalValue(){
        var total = 0;
        data.forEach(element => {
            if(element.serviceRegistered){
                total += element.value;
            }else{
                //console.log("something ignored!");
            }
        });
        this.setState({
           totalPay: total
        })
    }

    onChangeServiceRegistration(checked, item){
        console.log(`switch to ${checked}`);
        if(!checked){
            item.serviceRegistered = checked;
            console.log(item)
            this.setState({ totalPay :  this.state.totalPay - item.value}, () => { console.log("- New total pay: " + this.state.totalPay) } ) // When the switch is "No" -> make a substraction
        }else{
            item.serviceRegistered = checked;
            console.log(item)
            this.setState({ totalPay :  this.state.totalPay + item.value}, () => { console.log("+ New total pay: " + this.state.totalPay) } ) // When the switch is "Yes" -> make a addition
        }
    }

    render(){
        return(
            <div className="mainCustom">
                <Divider orientation="left">Servicios de Matrículas</Divider>
                <List
                    bordered
                    dataSource={data}
                    footer={<div id="totalPayAmmount" >
                                <NumberFormat value={this.state.totalPay} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </div>}
                    renderItem={
                        (item, key) => (
                        <List.Item key={key}>
                            <div className="gridWrapper">
                                <div>
                                    <List.Item.Meta
                                    title={<span className="titleCustom">{item.name}</span>}
                                    description={item.description}
                                    />
                                </div>
                                <div className="flowDiv">
                                    < Switch checkedChildren = "Si"
                                        unCheckedChildren = "No"
                                        defaultChecked = {item.serviceRegistered}
                                        disabled = {item.required}
                                        onChange = {(e) => this.onChangeServiceRegistration(e, item)}
                                    />
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