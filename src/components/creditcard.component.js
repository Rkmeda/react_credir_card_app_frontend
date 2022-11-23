import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import React, { Component } from "react";
import './creditcard.css';


export default class CreditCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            name: '',
            cardNumber: '',
            limit: '',
            cardslist: [],
            errorMessage:''
        };
        this.addCard = this.addCard.bind(this);
    }

    componentDidMount() {
        console.log("card name :" + this.state.name);
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": '*'
            }
        }
        axios.get("http://35.230.159.224:8080/creditCard/v1/getAllCreditCards", headers)
            .then(response => {
                if (response.data.statusMsg === 'SUCCESS') {
                    console.log("status message : " + response.data.statusMsg);
                    console.log("cards list : " + response.data.data);
                    this.setState({ cardslist: response.data.data })
                }
                console.log();
            })
            .catch(error => {
                this.errorMessage = error.message;
                console.error("There was an error!", error);
            });

    }

    addCreditNumber = e => {
        this.setState({ cardNumber: e.target.value })
    }

    addName = e => {
        this.setState({ name: e.target.value })
    }

    addLimit = e => {
        this.setState({ limit: e.target.value })
    }

    addCard = () => {
        console.log("card name :" + this.state.name);
        console.log("card no :" + this.state.cardNumber);
        console.log("card limit :" + this.state.limit);

        if (this.state.name === '') {
            alert("name is empty");
        } else if (this.state.cardNumber === '') {
            alert("cardNumber is empty");
        } else if (this.state.limit === '') {
            alert("limit is empty");
        } else {
            const payLoad = {
                "name": this.state.name,
                "cardNumber": this.state.cardNumber,
                "limit": this.state.limit
            }
            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": '*'
                }
            }
            axios.post("http://35.230.159.224:8080/creditCard/v1/addNewCard", payLoad, headers
            )
                .then(response => {
                    if (response.data.statusMsg === 'SUCCESS') {
                        console.log("card addedstatus code : " + response.data.statusCode);
                        this.setState({ cardslist: response.data.data })
                    } else {
                        this.state.errorMessage = response.data.errorMsg;
                        alert(this.state.errorMessage)
                    }
                    console.log();
                })

                .catch(error => {
                    this.errorMessage = error.message;
                    console.error("There was an error!", error);
                });
        }
    };

    render() {
        return (
            <form>
                <div className="pgHead">
                <div className="headerApp">
                    <h3>Credit Card System</h3>
                    <h5>Add</h5>
                    <div className="form-group label" >
                        <label>Name</label>
                        <input type="text" value={this.state.name} onChange={this.addName} className="form-control" />
                    </div>
                    <div className="form-group label">
                        <label>Card Number</label>
                        <input type="text" value={this.state.cardNumber} onChange={this.addCreditNumber} className="form-control" />
                        <p> {this.state.errorMessage} </p>
                    </div>
                    <div className="form-group label">
                        <label>Limit</label>
                        <input type="text" value={this.state.limit} onChange={this.addLimit} className="form-control" />
                    </div>
                    <div className="form-group label">
                        <button type="submit" value="Submit" onClick={this.addCard} className="btn btn-primary btn-block label">Add</button>
                    </div>
                    <h5>Existing Cards</h5>
                </div>
                <div className="tableApp">
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead className="table-header">
                                <TableRow>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Card Number</TableCell>
                                    <TableCell align="left">Balance</TableCell>
                                    <TableCell align="left">Limit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.cardslist.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell align="left">{row.cardNumber}</TableCell>
                                        <TableCell align="left">£{row.balance}</TableCell>
                                        <TableCell align="left">£{row.limit}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                </div>
            </form>
        );
    }
}