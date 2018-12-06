import React, { Component } from "react";

import Button from "@material-ui/core/Button";

import "react-table/react-table.css";
import SkyLight from "react-skylight";

import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";

import "../App.css";

class AddTraining extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: "",
            activity: "",
            duration: "",
            customer: ""
        };
        this.addModal = React.createRef();
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const newTraining = {
            date: this.state.date,
            activity: this.state.activity,
            duration: this.state.duration,
            customer: this.props.customer
        }
        this.props.addTraining(newTraining)
        this.addModal.current.hide();
    }
    
    render() {
        const addDialog = {
            marginTop: "-300px"
          };
        return(
        <div>
            <SkyLight dialogStyles={addDialog} hideOnOverlayClicked ref={this.addModal} title="Add new training">
            <TextField placeholder="Date" name="date" type="date" onChange={this.handleChange} value={this.state.date}/>
            <br />
            <TextField placeholder="Activity" name="activity" onChange={this.handleChange} value={this.state.activity}/>
            <br />
            <TextField placeholder="Duration" name="duration" onChange={this.handleChange} value={this.state.duration}/>
            <br />
            <Button style={{ margin: 10 }} variant="outlined" color="primary" onClick={this.handleSubmit}>
                <SaveIcon /> Save
            </Button>
            </SkyLight>
            <Button style={{ margin: "10px" }} variant="outlined" color="primary" onClick={() => this.addModal.current.show()}>
                <AddIcon/>
              </Button>
        </div>
        )
    }
}
export default AddTraining;