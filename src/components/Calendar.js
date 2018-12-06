import React, { Component } from "react";
// import "react-table/react-table.css";
// import ReactTable from "react-table";
import "../App.css";
import Moment from "moment";
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = BigCalendar.momentLocalizer(Moment);

class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cal_events: [
                //State is updated via componentDidMount
            ],
            appointments: []
        }
    }

    convertDate = (date) => {
        return Moment.utc(date).toDate();
    }
    componentDidMount() {
        
    }
    componentWillReceiveProps(){
        this.getTrainings();
    }
    getTrainings = () => {
    let calendar = [];
    this.setState({
        appointments: this.props.appointments
    })
    console.log(this.state.appointments);
    for (let i = 0; i < this.state.appointments.length; i++) {
        let schedule = {
            title: '',
            start: 0,
            end: 0
        }
            schedule.title = this.state.appointments[i].activity;
            schedule.start = this.convertDate(this.state.appointments[i].date);
            schedule.end = this.convertDate(this.state.appointments[i].date);
            let duration = this.state.appointments[i].duration;
            console.log(duration);
            calendar.push(schedule);
    }
    this.setState({
        cal_events: calendar
    })
}   


    render() {

        const { cal_events } = this.state

        return (
            <div className="container"><br />
                <div style={{ height: 700 }}>
                    <BigCalendar
                        localizer={localizer}
                        events={cal_events}
                        step={30}
                        defaultView='month'
                        views={['month', 'week', 'day']}
                        defaultDate={new Date()}
                    />
                </div>
            </div>
        );
    }
}
export default Calendar;