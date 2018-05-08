import React, { Component } from 'react';
import axios from 'axios';

//Assets
import './css/Content.css';

class Content extends Component {
  //////// Controller
  constructor(){
    super();

    this.handleCountClick = this.handleCountClick.bind(this);
    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.handleResultClick = this.handleResultClick.bind(this);

    this.state = {
        count: 0,
        number1: 0,
        number2: 0,
        number3: 0,
        resultState: 0,
        objectId: '',
        createdAt: '',
        updatedAt: '',
        codigo: '',
        nombres: '',
        apellidos: '',
        tarifa_plena: 0,
        tarifa_reducida_7_5: 0,
        tarifa_reducida_15: 0,
        descuento_exalumno: 0,
        descuento_2do_hno: 0,
        descuento_3er_hno: 0,
        empleado: 0,
        santa_barbara: 0,
        convenio: 0
    }
  }

  componentDidMount(){
    this.setState({
      count : 1
    });

    let axiosConfig = {
      headers: {
          'X-Parse-Application-Id': 'U8jcs4wAuoOvBeCUCy4tAQTApcfUjiGmso98wM9h',
          'X-Parse-Master-Key': 'vN7hMK7QknCPf2xeazTaILtaskHFAveqnh6NDwi6',
          'Content-Type': 'application/json;charset=UTF-8'
      }
    };

    axios.get('https://parseapi.back4app.com/classes/Enrollment', axiosConfig)
      .then(res => {
        console.log("Full object:");
        console.log(res.data);
        console.log("Node object:");
        console.log(res.data.results);
        console.log("Item object:");
        let item = res.data.results[0];
        console.log(item);

        //Setting Parse Data to states
        this.setState({
            objectId:            item.objectId, 
            createdAt:           item.createdAt,
            updatedAt:           item.updatedAt,
            codigo:              item.CODIGO,
            nombres:             item.NOMBRES,
            apellidos:           item.APELLIDOS,
            tarifa_plena:        Number(item.TARIFA_PLENA),
            tarifa_reducida_7_5: Number(item.TARIFA_REDUCIDA_7_5),
            tarifa_reducida_15:  Number(item.TARIFA_REDUCIDA_15),
            descuento_2do_hno:   Number(item.DESCUENTO_2HNO),
            descuento_3er_hno:   Number(item.DESCUENTO_3HNO),
            empleado:            Number(item.EMPLEADO),
            santa_barbara:       Number(item.SANTA_BARBARA),
            convenio:            Number(item.CONVENIO)
        });
      }
    )
  }

  handleCountClick(e){
    //console.log(e);
    if(e.target.id === 'add'){
      this.setState({
        count: this.state.count + 1
      })
      console.log("Added + : " + this.state.count);
    }
    if(e.target.id === 'remove' && this.state.count > 0){
      this.setState({
        count: this.state.count - 1
      })
      console.log("Removed - : " + this.state.count);
    }
    if(e.target.id === 'reset'){
      this.setState({
        count: 0
      })
      console.log("Counter reset to " + 0);
    }
  }

  handleOnInputChange(e){
    if(e.target.id === 'num1'){
      this.setState({
        number1: Number(e.target.value)
      });
    }
    if(e.target.id === 'num2'){
      this.setState({
        number2: Number(e.target.value)
      });
    }
    if(e.target.id === 'num3'){
      this.setState({
        number3: Number(e.target.value)
      });
    }
  }

  handleResultClick(e){
    console.log("Result value: " + this.state.resultState);
    this.setState({
      resultState: this.state.number1 + this.state.number2 + this.state.number3
    })
  }

  //////// Rendering UI
  render() {
    return (
      <div className="Content">
        <h2>Counter: {this.state.count}</h2>
        <button id="add" onClick={this.handleCountClick}>[+]Add</button>
        <button id="remove" onClick={this.handleCountClick}>[-]Remove</button>
        <button id="reset" onClick={this.handleCountClick}>[//]Reset</button>
        
        <hr/>

        {/* <input type="text" id="num1" onChange={this.handleOnInputChange} value={this.state.number1} /><br/>
        <input type="text" id="num2" onChange={this.handleOnInputChange} value={this.state.number2} /><br/>
        <input type="text" id="num3" onChange={this.handleOnInputChange} value={this.state.number3} /><br/>
        
        <button id="result" onClick={this.handleResultClick}>[=]Result</button>
        {this.state.resultState}<br/><br/><br/> 
        <hr/>*/}
        <p>Parse Object Id: {this.state.objectId}</p>
        <p>Código estudiante: {this.state.codigo}</p>
        <p>Nombres: {this.state.nombres}</p>
        <p>Apellidos: {this.state.apellidos}</p>
        
        <div className="tableContainer">
          <table className="tg">
              <tbody>
                  <tr>
                    <th className="tg-dx8v">Conceptos</th>
                    <th className="tg-dx8v">Valor ($)</th>
                  </tr>
                  <tr>
                    <td className="tg-dx8v">Tarifa plena</td>
                    <td className="tg-dx8v">{this.state.tarifa_plena}</td>
                  </tr>
                  <tr>
                    <td className="tg-dx8v">Tarifa reducida 7.5%</td>
                    <td className="tg-dx8v">{this.state.tarifa_reducida_7_5}</td>
                  </tr>
                  <tr>
                    <td className="tg-dx8v">Tarifa reducida 15%</td>
                    <td className="tg-dx8v">{this.state.tarifa_reducida_15}</td>
                  </tr>
                  <tr>
                    <td className="tg-dx8v">Descuento ex-alumno</td>
                    <td className="tg-dx8v">{this.state.descuento_exalumno}</td>
                  </tr>
                  <tr>
                    <td className="tg-dx8v">Descuento 2do hermano</td>
                    <td className="tg-dx8v">{this.state.descuento_2do_hno}</td>
                  </tr>
                  <tr>
                    <td className="tg-dx8v">Descuento 3er hermano</td>
                    <td className="tg-dx8v">{this.state.descuento_3er_hno}</td>
                  </tr>
                  <tr>
                    <td className="tg-dx8v">Descuento padre empleado</td>
                    <td className="tg-dx8v">{this.state.empleado}</td>
                  </tr>
                  <tr>
                    <td className="tg-dx8v">Descuento Santa Barbara</td>
                    <td className="tg-dx8v">{this.state.santa_barbara}</td>
                  </tr>
                  <tr>
                    <td className="tg-dx8v">Descuento convenio</td>
                    <td className="tg-dx8v">{this.state.convenio}</td>
                  </tr>
              </tbody>
          </table>
        </div>
        
      </div>
    );
  }
}

export default Content;