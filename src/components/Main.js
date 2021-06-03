import React from "react";
import DatePicker from "react-datepicker";
import "./Main.css";
import Card from './Card';
import axios from 'axios'
export class Main extends React.Component {
    constructor() {
        super()
        this.state = { pinCode: '', startDate: new Date(), results: [] }
    }

    render() {
        return (
            <div class="container-flud">
                <div class="row">
                    <div class="col-md-2 offset-md-1">
                        <h6>choose a date</h6>
                        <DatePicker selected={this.state.startDate} onChange={(date) => this.setStartDate(date)} />
                    </div>
                    <div class="col-md-2 offset-md-1">
                        <h6>enter pincode below</h6>
                        <input type="text" onChange={(e) => this.handleChange(e)}></input>
                    </div>
                    <div class="col-md-1">
                        <br />
                        <button type="button" class="btn btn-info" onClick={this.searchSlots}>Search</button>
                    </div>
                </div>
                <hr />
                {this.state.results.length > 0 ? <Card results={this.state.results} />
                    : null}
            </div>)

    }

    searchSlots = () => {
        let d = this.state.startDate.toLocaleDateString().replaceAll('/', '-')
        let p = this.state.pinCode
        axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${p}&date=${d}`)
            .then((result) => {
                if (result.data)
                    this.setState({ results: result.data.centers });
            })
    }

    handleChange = (event) => {
        this.setState({ pinCode: event.target.value })
    }
    setStartDate = (date) => {
        this.setState({ startDate: date })
    }
}
export default Main