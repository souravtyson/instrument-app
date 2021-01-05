import React, { Component } from 'react';
import DataTable from "react-data-table-component";
import {COLUMNS} from '../data/columns'

class Instrument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: {},
            data: [],
            columns: COLUMNS
        };
        
    }

    createDisplayableData(data) {
        const displayAble = []
        for (let elem in data.instruments) {
            let m = {
                "id": data.instruments[elem].id,
                "instrumentName": elem,
                "assetClass": data.instruments[elem].assetClass,
                "instrumentSymbol": data.prices[elem] ? data.prices[elem].symbol : "",
                "instrumentBid": data.prices[elem] ? data.prices[elem].bid : "",
                "instrumentAsk": data.prices[elem] ? data.prices[elem].ask : "",
            }
            displayAble.push(m)
        }
        return displayAble;
    }

    componentDidMount() {
        fetch("https://data-fix.smt-data.com/fixprof/instruments/prices")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                        data: this.createDisplayableData(result)
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleRowClick = (row, event) => {
        alert("hello")
        if (event.type === 'contextmenu') {
          console.log('right clicked!')
        }
    }

    render() {
        const { error, isLoaded, columns, data } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <DataTable title="Instrument" columns={columns} data={data} pagination onContextMenu={this.handleRowClick}
                />
            );
        }
    }
}

export default Instrument;