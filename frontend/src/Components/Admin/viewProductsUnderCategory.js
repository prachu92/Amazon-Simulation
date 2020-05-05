import React, { Component } from 'react';
import Navbar from './adminNavbar';
import axios from "axios";
import product_image from "../../images/adminproduct.jpg";
import './admin.css';

class viewProductsUnderCategory extends Component {
    constructor() {
        super()
        this.state = {
            productdetails: [],
            currentPage: 1
        }
        this.onSubmit = this.onSubmit.bind(this);
    };

    componentDidMount = () => {
        const productCategory = this.props.match.params.category
        const data = {
            productCategory: productCategory,
            currentPage: this.state.currentPage
        }
        console.log("Category Selected ", data);
        axios("/getProductsUnderProductCategory", {
            method: 'put',
            data: data
        })
            .then(res => {
                this.setState({
                    productdetails: res.data
                })
                console.log("This is p", this.state.productdetails);
            })
    }

    nextPage = async (e) => {
        let page = this.state.currentPage;
        page += 1;
        this.setState({ currentPage: page }, () => {
            this.onSubmit();
        });
    }

    prevPage = async (e) => {
        let page = this.state.currentPage;
        if (page === 1)
            return;
        page -= 1;
        this.setState({ currentPage: page }, () => {
            this.onSubmit();
        });
    }


    onSubmit = async () => {
        const productCategory = this.props.match.params.category
        const data = {
            currentPage: this.state.currentPage,
            productCategory: productCategory
        }
        await axios.put("/getProductsUnderProductCategory", data)
            .then(res => {
                this.setState({
                    productdetails: res.data
                })
                console.log("This is p", this.state.productdetails);
            })
    }


    render() {
        let products;
        var pageBar, showPageBar;

        if (this.state.productdetails != null) {
            showPageBar = true;
            products = this.state.productdetails.map(product => {
                console.log(product);
                console.log(product.products.productName);
                let unknown = <img src={product_image} className="card-img-top" id="cardadmin-img-top" alt="..." />

                return (
                    <div>
                        <div id="itemAdminRight" >
                            <div className="col">
                                <div className="card" id="cardadminclass" >
                                    {unknown}
                                    <div className="card-block" id="cardadmin-title-text">
                                        <h6 className="card-title" id="cardadmin-title">SellerName</h6>
                                        <p className="card-text" id="cardadmin-text">{product.products.productName}</p>
                                        <span>
                                            <p className="card-text" id="cardadmin-text">{product.products.productPrice}</p>
                                            {/* <input id="quant-text" type="number" readOnly value={itemQuantity} /> */}

                                        </span>
                                        {/* <button id="btn-item-add-to-cart" onClick={() => this.props.togglePopup(itemName, itemPrice, itemId, restId, itemQuantity)} className="btn btn-success">Add to cart </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                )
            })
        }
        let threedotone = ""
        if (this.state.currentPage > 2) {
            threedotone = <li className="page-item ">
                <div className="page-link" ><span aria-hidden="true">...</span></div>
            </li>
        }
        let one
        if (this.state.currentPage >= 2) {
            one = <li className="page-item ">
                <div className="page-link" onClick={this.prevPage}><span aria-hidden="true">{this.state.currentPage - 1}</span></div>
            </li>
        }
        let threedottwo = <li className="page-item ">
            <div className="page-link" ><span aria-hidden="true">...</span></div>
        </li>


        if (showPageBar) {
            pageBar = (
                <div className="col-sm-12 justify-content-center mt-1">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item ">
                                <div className="page-link" onClick={this.prevPage} aria-label="Previous"><span aria-hidden="true">&laquo;</span></div>
                            </li>
                            {threedotone}
                            {one}
                            <li className="page-item ">
                                <div className="page-link" ><span className="active" aria-hidden="true">{this.state.currentPage}</span></div>
                            </li>
                            <li className="page-item ">
                                <div className="page-link" onClick={this.nextPage}><span aria-hidden="true">{this.state.currentPage + 1}</span></div>
                            </li>
                            {threedottwo}
                            <li className="page-item">
                                <div className="page-link" onClick={this.nextPage} aria-label="Next"><span aria-hidden="true">&raquo;</span></div>
                            </li>
                        </ul>
                    </nav>
                </div>
            );
        }


        return (
            <div>
                <Navbar />
                <div>
                    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
                    <div className="container">
                        <div className="row ">

                            <div className="col">
                                <br />
                                <div className="row">

                                    {products}

                                </div>
                            </div>

                            {pageBar}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default viewProductsUnderCategory;