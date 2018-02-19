import React, { Component } from 'react';
import './App.css';
import CryptoBox from './CryptoBox';
import axios from 'axios';

class AppMain extends Component {

    constructor() {
        super();

    
        this.state = {
            coins: null,
            coinList: null,
        };
    }
    
    componentDidMount() {
        axios.get(`https://min-api.cryptocompare.com/data/all/coinlist`)
        .then(res => {
            var coinList = res.data.Data;
            this.setState({coinList: coinList});
        });


        const baseURL = 'https://min-api.cryptocompare.com/data/pricemultifull?';
        const coin = ['BTC', 'ETH', 'XRP', 'LTC', 'BCH', 'ETC', 'XVG', 'EOS', 'TRX', 'NEO'];
        axios.get(`${baseURL}fsyms=${coin}&tsyms=USD`)
        .then(res => {
            var coinData = res.data.RAW;
            this.setState({ coins: coinData });
        })
        .catch(function (error) {
            console.log(error);
        });
        this.refreshCall = this.refreshCall.bind(this);
        this.interval = setInterval(this.refreshCall, 500);
    }    

    refreshCall() {
        const baseURL = 'https://min-api.cryptocompare.com/data/pricemultifull?';
        const coin = ['BTC', 'ETH', 'XRP', 'LTC', 'BCH', 'ETC', 'XVG', 'EOS', 'TRX', 'NEO'];
        axios.get(`${baseURL}fsyms=${coin}&tsyms=USD`)
        .then(res => {
            var coinData = res.data.RAW;
            //console.log(this.state.coins.BTC.USD.PRICE, coinData.BTC.USD.PRICE);
            this.setState({ coins: coinData });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        var coinWorthInfo = this.state.coins;
        var coinTypeInfo = this.state.coinList;
        //console.log(coinWorthInfo);
        var list = [];
        if(coinWorthInfo !== null && coinTypeInfo !== null) {
            Object.entries(coinWorthInfo).map((element, index)=> {
                list.push(<CryptoBox key={element[0]} coinWorthInfo={element} coinTypeInfo={coinTypeInfo[element[0]]} />);
            }, {});
        }


        return (
            <div className="main-container">
                <br/ >
                <div className="grid-container">
                    {list}
                </div> 
            </div>
        );
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
}

export default AppMain;