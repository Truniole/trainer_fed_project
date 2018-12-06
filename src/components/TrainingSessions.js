import React, { Component } from "react";
import Button from "@material-ui/core/Button";
// import "react-table/react-table.css";
// import ReactTable from "react-table";
import SkyLight from "react-skylight";
import "../App.css";
import ListIcon from "@material-ui/icons/List";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Calendar from './Calendar'

class TrainingSessions extends Component {
    constructor(props){
        super(props);
        this.state = {
            trainings: []
        };
        this.addModal = React.createRef();
    }

    getTrainings = (link) => {
        fetch(link)
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    trainings: responseData.content
                })
            });
        console.log(this.state.trainings);
        this.addModal.current.show();
    };
    
    render() {
        const addDialog = {
            marginTop: "-500px"
          };
        return(
        <div>
        <Button style={{ margin: "10px" }} variant="outlined" color="primary" 
            onClick={() => this.getTrainings(this.props.trainingID)}>
            <ListIcon size="small"/>
        </Button>
            <SkyLight dialogStyles={addDialog} hideOnOverlayClicked ref={this.addModal} title="Training sessions">
                <Calendar appointments={this.state.trainings}/>
            </SkyLight>
        </div>
        )
    }
}
export default TrainingSessions;

