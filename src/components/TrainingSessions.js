import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "react-table/react-table.css";
import ReactTable from "react-table";
import SkyLight from "react-skylight";
import "../App.css";
import ListIcon from "@material-ui/icons/List";
import Moment from "moment";

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
        this.addModal.current.show();
    };

    render() {
        const trainingColumns = [
        {
            Header: "Date and time",
            accessor: "date"
          },
          {
            Header: "Duration",
            accessor: "duration"
          },
          {
            Header: "Activity",
            accessor: "activity"
          }];
          
        const addDialog = {
            marginTop: "-300px"
          };
        return(
        <div>
        <Button style={{ margin: "10px" }} variant="outlined" color="primary" 
            onClick={() => this.getTrainings(this.props.trainingID)}>
            <ListIcon size="small"/>
        </Button>
            <SkyLight dialogStyles={addDialog} hideOnOverlayClicked ref={this.addModal} title="Show sessions">
            <h3>All trainings</h3>
            <ReactTable filterable={true} defaultPageSize={10} className="-striped -highlight" data={this.state.trainings} columns={trainingColumns}/>
            </SkyLight>
        </div>
        )
    }
}
export default TrainingSessions;