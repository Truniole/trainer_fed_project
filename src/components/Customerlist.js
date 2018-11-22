import React, { Component } from 'react';
import ReactTable from "react-table";
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import 'react-table/react-table.css'


class Customerlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
    }

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
            console.log(responseData);
        })
    }
    deleteCustomer = (link) => {
        fetch(link, {method: 'DELETE'})
        .then(response => {
            this.listCustomers();
        })
    }
    editCustomer = (customer, link) => {
        console.log(customer);
        console.log(link);
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
        const columns = [{
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
          },{
            Header: '',
            filterable: false,
            sortable: false,
            accessor: 'links[0].href', 
            Cell: ({row, value}) => (
                                <IconButton size="small" onClick={() => this.editCustomer(row, value)} aria-label="Edit">
                                <SaveIcon></SaveIcon>
                                </IconButton>)
              
          },  {
                Header: '',
                filterable: false,
                sortable: false,
                minWidth: 30,
                accessor: 'links[0].href', 
                Cell: ({value}) => (<Tooltip title="Delete" placement="right-end">
                                    <IconButton size="small" onClick={() => this.deleteCustomer(value)}>
                                    <DeleteIcon />
                                    </IconButton></Tooltip>)   
          }]
        return(
        <div>
        <ReactTable defaultPageSize={12} filterable={true}data={this.state.customers} columns={columns} />
        </div>)
    }
}

export default Customerlist;