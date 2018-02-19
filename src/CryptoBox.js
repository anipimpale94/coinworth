import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FAdown from 'react-icons/lib/fa/chevron-down';
import FAup from 'react-icons/lib/fa/chevron-up';

class CryptoBox extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            coinValue: 0.00,
            change24hr: props.coinWorthInfo[1].USD.CHANGE24HOUR,
            status: 'blue',
        };
    }
    
    componentDidMount(){
        this.setState({ coinValue : parseFloat(this.props.coinWorthInfo[1].USD.PRICE)})
        if(this.state.change24hr > 0.00) {
            this.setState({status : 'green'})
        }
        else {
            this.setState({status : 'red'})
        }
    }

    componentDidUpdate() {
        var lastValue = this.state.coinValue;
        var newValue =  parseFloat(this.props.coinWorthInfo[1].USD.PRICE);

        if(lastValue !== newValue) {
            if(lastValue > newValue) {
                this.setState({ coinValue: newValue });
            }
            else {
                this.setState({ coinValue: newValue });
            }
        }
    }

    render() {
        const baseURL = "https://www.cryptocompare.com";

        var statusStyle ={
            color: this.state.status
        }
        var FASymbol = <FAup style={statusStyle}/>
        if(this.state.status === 'red'){
            FASymbol = <FAdown style={statusStyle}/>
        }
        return (
            <div className="mainBox">
                <div className="Box">
                    <img className="coinImages" alt={this.props.coinWorthInfo[0] + "image"} src={baseURL + this.props.coinTypeInfo.ImageUrl} />
                    <div className="coinName">{this.props.coinTypeInfo.CoinName}</div>
                    <div className="btn btn-info disabled">${this.state.coinValue}</div>
                    <div className="coinName" style={statusStyle}>Chg. 24H  {FASymbol}</div>
                </div>
            </div>
        );
    }
}

export default CryptoBox;