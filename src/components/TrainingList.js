import React, { Component } from "react";
import ReactTable from "react-table";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import ListIcon from "@material-ui/icons/List";
import Moment from "moment";
import SkyLight from "react-skylight";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
class TrainingList extends Component {
  constructor(props) {
    super(props);
    this.state = { trainings: []};
    this.addModal = React.createRef();
  }

  // Get all trainings
  listTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => {
        this.setState({ trainings: responseData });
      });
    this.addModal.current.show();
  };

  // Delete a training
  deleteTraining = link => {
    this.addModal.current.hide();
    confirmAlert({
        title: "",
        message: "  Are you sure to delete?",
        buttons: [
            {
                label: "  Yes  ",
                onClick: () => {
                    fetch("https://customerrest.herokuapp.com/api/trainings/" + link, { method: "DELETE" })
                        .then(res => {
                            this.listTrainings()
                        })
                        .catch(err => console.error(err));
                }
            },
            {
                label: "  No  ",
                onClick: () => {
                    this.addModal.current.show();
                }
            }
        ]
    });
  };


  render() {
    const trainingColumns = [
      {
        Header: "Firstname",
        accessor: "customer.firstname"
      },
      {
        Header: "Lastname",
        accessor: "customer.lastname"
      },
      {
        Header: "Date and time",
        accessor: "date",
        Cell: ({ value }) => Moment(value).format("MMM Do YYYY, h:mm a")
      },
      {
        Header: "Duration (in minutes)",
        accessor: "duration"
      },
      {
        Header: "Activity",
        accessor: "activity"
      },
      {
        Header: "Delete",
        accessor: "id",
        filterable: false,
        sortable: false,
        Cell: ({ value }) => (
          <Button aria-label="Delete">
            <DeleteIcon size="small" onClick={() => this.deleteTraining(value)}/>
          </Button>
        )
      }
    ];

    const addDialog = {
      marginTop: "-300px"
    };

    return (
      <div>
        <Button
          style={{ }}
          variant="outlined"
          color="secondary"
          onClick={this.listTrainings}
        >
          <ListIcon /> Show all trainings
        </Button>
        <SkyLight
          dialogStyles={addDialog}
          hideOnOverlayClicked
          ref={this.addModal}
        >
          <h3>All trainings</h3>
          <ReactTable
            filterable={true}
            defaultPageSize={10}
            className="-striped -highlight"
            data={this.state.trainings}
            columns={trainingColumns}
          />
        </SkyLight>
      </div>
    );
  }
}

export default TrainingList;
