import React from "react";
import "./Card.css";
export class Card extends React.Component {
    constructor(props) {
        super(props);
        this.cleanSlots(this.props.results);
    }
    formSlots = (slots) => {
        let slts;
        slts = slots.map(obj => <p>{obj}</p>)
        return slts;
    }

    cleanSlots = (res) => {
        let resultsArr = res.results;
        let samArr = [];
        for (let item of resultsArr) {

            let sessArr = item.sessions.filter((sess) => sess.available_capacity > 0);
            if (sessArr.length > 0) {
                item.sessions = sessArr;
                samArr.push(item);
            }
            this.props.results.results = samArr;
        }
    }
    formSession = (sessions) => {
        let sns;
        sns = sessions.map(obj => {
            if (this.props.results.age !== 'all' && obj.min_age_limit === parseInt(this.props.results.age) && obj.available_capacity > 0) {
                return <div><hr />
                    <p><strong>Date:</strong> {obj.date} {obj.available_capacity > 0 ? <strong><mark>(Available)</mark></strong> : <strong><mark class="noSlots">(Booked)</mark></strong>}</p>
                    <p><strong>Available Capacity: </strong>{obj.available_capacity}</p>
                    <p><strong>Min Age Limit:</strong> <mark>{obj.min_age_limit}</mark></p>
                    <p><strong>Vaccine: </strong>{obj.vaccine}</p>
                    <p><strong>Slots:</strong> {this.formSlots(obj.slots)}</p>
                    <p><strong>Available Capacity (Dose 1):</strong> <mark>{obj.available_capacity_dose1}</mark></p>
                    <p><strong>Available Capacity (Dose 2): </strong><mark>{obj.available_capacity_dose2}</mark></p>
                </div>
            }
            else if (this.props.results.age === 'all') {
                return <div><hr />
                    <p><strong>Date:</strong> {obj.date} {obj.available_capacity > 0 ? <strong><mark>(Available)</mark></strong> : <strong><mark class="noSlots">(Booked)</mark></strong>}</p>
                    <p><strong>Available Capacity: </strong>{obj.available_capacity}</p>
                    <p><strong>Min Age Limit:</strong> <mark>{obj.min_age_limit}</mark></p>
                    <p><strong>Vaccine: </strong>{obj.vaccine}</p>
                    <p><strong>Slots:</strong> {this.formSlots(obj.slots)}</p>
                    <p><strong>Available Capacity (Dose 1):</strong> <mark>{obj.available_capacity_dose1}</mark></p>
                    <p><strong>Available Capacity (Dose 2): </strong><mark>{obj.available_capacity_dose2}</mark></p>
                </div>
            }
        })
        let flag = true;
        for(let i of sns){
            if(i !== undefined)
                flag = false;
        }
        if (flag) {
            return <div><hr /><p><strong><i><mark class="noSlots">No Slots available</mark></i></strong></p></div>
        }
        return sns;
    }
    render() {
        let cards;
        this.cleanSlots(this.props.results);
        cards = this.props.results.results.map(card => {
            if (card.sessions.length > 0 && this.checkSessions(card.sessions)) {
                return <div class="col-md-3">
                    <div class="card" style={{ width: "21rem" }}>
                        <div class="card-body">
                            <h5 class="card-title">{card.name}</h5>
                            <p><strong>Address: </strong>{card.address}</p>
                            <p><strong>State: </strong>{card.state_name}</p>
                            <p><strong>District: </strong>{card.district_name}</p>
                            <p><strong>Start Time:</strong> {card.from}</p>
                            <p><strong>End Time: </strong>{card.to}</p>
                            <p><strong>Fee Type: </strong>{card.fee_type}</p>
                            <p><strong>Sessions: </strong>{this.formSession(card.sessions)}</p>
                        </div>
                    </div>
                </div>
            }
        }
        )
        return (
            <div class="container-fluid">
                <div class="row">
                    {cards.length>0 && !this.allUndefined(cards)?cards:<div align="center"><h3>No Results Found!</h3></div>}
                </div>
            </div>
        )
    }

    allUndefined = (cards)=>{
        for(let card of cards){
            if(card !== undefined){
                return false
            }
        }
        return true;
    }
    checkSessions = (sessions) => {
        let age = this.props.results.age;
        if (this.props.results.age !== 'all') {
            for (let sess of sessions) {
                if (parseInt(age) === sess.min_age_limit)
                    return true;
            }
            return false;
        }
        return true;
    }
}
    export default Card