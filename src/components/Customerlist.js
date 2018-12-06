import React, { Component } from 'react';
import ReactTable from "react-table";
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import 'react-table/react-table.css'
import Addcustomer from './AddCustomer';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Traininglist from './TrainingList';
import AddTraining from './AddTraining';
import TrainingSessions from './TrainingSessions';

class Customerlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
    }
    addCustomer = (customer) => {
        fetch("https://customerrest.herokuapp.com/api/customers", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(customer)
        })
            .then(res => {
                this.listCustomers()
            })
            .catch(err => console.error(err))
    };

    componentDidMount(){
        this.listCustomers();
    }
    listCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(responseData => {
            this.setState({
                customers: responseData.content
            })
        })
    }
    deleteCustomer = (link) => {
        confirmAlert({
            title: "",
            message: "  Are you sure to delete?",
            buttons: [
                {
                    label: "  Yes  ",
                    onClick: () => {
                        fetch(link, { method: "DELETE" })
                            .then(res => {
                                this.listCustomers()
                            })
                            .catch(err => console.error(err));
                    }
                },
                {
                    label: "  No  "
                }
            ]
        });
    }
    addTraining = (training) => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(training)})
          .then(response => {
              this.listCustomers();
          });
      };

    editCustomer = (customer, link) => {
        fetch(link,
          {method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(customer)})
          .then(response => {
            this.listCustomers();
          })
    }
    

    renderEditable = (cellInfo) => {
        return (
          <div
            style={{ backgroundColor: "#fafafa" }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const data = [...this.state.customers];
              data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({ customers: data });
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.customers[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
      }
    
    render() {
        const columns = [
        {
        Header: "Add trainings",
        accessor: "links[0].href",
        filterable: false,
        sortable: false,
        Cell: ({ value }) => (
            <AddTraining addTraining={this.addTraining} customer={value}/>
        )
        }, {
        Header: 'First Name',
        accessor: 'firstname',
        Cell: this.renderEditable
        }, {
        Header: 'Last Name',
        accessor: 'lastname',
        Cell: this.renderEditable
        }, {
        Header: 'Email',
        accessor: 'email',
        Cell: this.renderEditable
        }, {
        Header: 'Phone',
        accessor: 'phone',
        Cell: this.renderEditable
        }, {
        Header: 'Post Code',
        accessor: 'postcode',
        Cell: this.renderEditable
        }, {
        Header: 'Address',
        accessor: 'streetaddress', 
        Cell: this.renderEditable
        }, {
            Header: "Training sessions",
            accessor: "links[2].href",
            filterable: false,
            sortable: false,
            Cell: ({ value }) => (
            <TrainingSessions trainingID = {value} />
            )
        }, {
        Header: 'Edit',
        filterable: false,
        sortable: false,
        accessor: 'links[0].href', 
        Cell: ({row, value}) => (
                            <IconButton size="small" onClick={() => this.editCustomer(row, value)} aria-label="Edit">
                            <SaveIcon></SaveIcon>
                            </IconButton>)
            
        }, {
        Header: 'Delete',
        filterable: false,
        sortable: false,
        accessor: 'links[0].href', 
        Cell: ({value}) => (<Tooltip title="Delete" placement="right-end">
                            <IconButton size="small" onClick={() => this.deleteCustomer(value)}>
                            <DeleteIcon />
                            </IconButton></Tooltip>)   
        }];
        return(
         <div className="container-fluid"><br />
                <h1 className="text-center font-weight-bold">Customer List</h1>
                    <Traininglist/>
                    <Addcustomer addCustomer={this.addCustomer} listCustomers={this.listCustomers} />
        <ReactTable defaultPageSize={12} filterable={true} data={this.state.customers} columns={columns} />
        </div>
        )
    }
}

export default Customerlist;