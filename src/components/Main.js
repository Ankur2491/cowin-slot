import React from "react";
import DatePicker from "react-datepicker";
import "./Main.css";
import Card from './Card';
import axios from 'axios'
// import stateData from '../states';
export class Main extends React.Component {
    constructor() {
        super()
        this.state = { pinCode: '', startDate: new Date(), results: [], showNoResults: false, age: 'all' }
        // console.log(stateData);
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
                    <br/>
                    <input type="radio" id="eighteenPlus" name="age" value="18" onChange={(e) => this.handleAge(e)}/>
                    <label for="eighteenPlus">18+</label><br/>
                    </div>
                    <div class="col-md-1">
                    <br/>
                    <input type="radio" id="fortyFivePlus" name="age" value="45" onChange={(e) => this.handleAge(e)}/>
                    <label for="fortyFivePlus">45+</label><br/>
                    </div>
                    <div class="col-md-1">
                        <br />
                        <button type="button" class="btn btn-info" onClick={this.searchSlots}>Search</button>
                    </div>
                </div>
                <hr />
                {this.state.showNoResults === true ? <div align="center"><h3>No Results Found!</h3></div> : null}
                {this.state.results.length > 0 ? <Card results={this.state} />
                    : null}
            </div>)

    }

    searchSlots = () => {
        this.setState({showNoResults: false})
        let da = this.state.startDate.getDate()
        let mn = this.state.startDate.getMonth()+1
        if(da < 10)
            da = "0"+da
        if(mn < 10)
            mn = "0"+mn
        let d = da+"-"+mn+"-"+this.state.startDate.getFullYear()
        let p = this.state.pinCode
        axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${p}&date=${d}`)
            .then((result) => {
                if (result.data){
                    if(result.data.centers.length < 1){
                        this.setState({showNoResults: true})
                    }
                    this.setState({ results: result.data.centers });
                }
            })
    }

    handleChange = (event) => {
        this.setState({ pinCode: event.target.value })
    }
    setStartDate = (date) => {
        this.setState({ startDate: date })
    }

    handleAge = (event) =>{
        this.setState({age: event.target.value})
    }
}
export default Main