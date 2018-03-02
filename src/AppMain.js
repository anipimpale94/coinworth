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
            searchCoin: "Search Coin",
        };
    }
    
    componentDidMount() {
        axios.get(`https://min-api.cryptocompare.com/data/all/coinlist`)
        .then(res => {
            var coinList = res.data.Data;
            this.setState({coinList: coinList});
        });


        const baseURL = 'https://min-api.cryptocompare.com/data/pricemultifull?';
        const coin = ['BTC', 'ETH', 'XRP', 'LTC', 'BCH', 'ETC', 'XVG', 'EOS', 'TRX', 'NEO',
                      'ELA', 'ZEC', 'DASH', 'VEN', 'XMR', 'BCPT', 'LSK', 'XVG', 'ADA', 'BNB',
                      'IOST'];
        axios.get(`${baseURL}fsyms=${coin}&tsyms=USD`)
        .then(res => {
            var coinData = res.data.RAW;
            this.setState({ coins: coinData });
        })
        .catch(function (error) {
            console.log(error);
        });
        this.refreshCall = this.refreshCall.bind(this);
        this.interval = setInterval(this.refreshCall, 1000);
    }    

    refreshCall() {
        const baseURL = 'https://min-api.cryptocompare.com/data/pricemultifull?';
        const coin = ['BTC', 'ETH', 'XRP', 'LTC', 'BCH', 'ETC', 'XVG', 'EOS', 'TRX', 'NEO',
                      'ELA', 'ZEC', 'DASH', 'VEN', 'XMR', 'BCPT', 'LSK', 'XVG', 'ADA', 'BNB',
                      'IOST'];
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

    updateSearch(event) {
        if(this.state.searchCoin === "Search Coin") {
            this.setState({searchCoin: ""});
        }
        else
            this.setState({searchCoin: event.target.value});
    }



    createCoinDisplay() {
        var coinWorthInfo = this.state.coins;
        var coinTypeInfo = this.state.coinList;
        var searchCoin = this.state.searchCoin;
        var list = [];
        if(coinWorthInfo !== null && coinTypeInfo !== null) {
            Object.entries(coinWorthInfo).map((element, index)=> {

                if(searchCoin === "Search Coin") {
                    //console.log(element);
                    list.push(<CryptoBox key={element[0]} coinWorthInfo={element} coinTypeInfo={coinTypeInfo[element[0]]} />);
                }
                else if(coinTypeInfo[element[0]].FullName.toUpperCase().includes(searchCoin.toUpperCase())) {
                    list.push(<CryptoBox key={element[0]} coinWorthInfo={element} coinTypeInfo={coinTypeInfo[element[0]]} />);
                }
            }, {});
        }
        return list;
    }

    render() {
        return (
            <div className="main-container">
                <div className="grid-container">
                    <div className="search">
                        <input type="text"
                            onChange={this.updateSearch.bind(this)}
                            className="search-input"
                            onClick={this.updateSearch.bind(this)}
                            placeholder={this.state.searchCoin}
                        />
                    </div>
                    <div className="coin-container">
                        {this.createCoinDisplay()}
                    </div>
                </div> 
            </div>
        );
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
}

export default AppMain;