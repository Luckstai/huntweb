import React, { Component } from "react";
import api from "../../services/api";
import "./styles.css";

import { Link } from "react-router-dom";

export default class Main extends Component {
  state = {
    products: [],
    productInfo: {},
    currentPage: 1
  };
  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const { data } = await api.get(`/products?page=${page}`);
    const { docs, ...productInfo } = data;

    this.setState({ products: docs, productInfo, currentPage: page });
  };

  prevPage = () => {
    const { currentPage } = this.state;

    if (currentPage === 1) return;

    const pageNumber = currentPage - 1;

    this.loadProducts(pageNumber);
  };

  nextPage = () => {
    const { currentPage, productInfo } = this.state;

    if (currentPage === productInfo) return;

    const pageNumber = currentPage + 1;

    this.loadProducts(pageNumber);
  };

  render() {
    const { products, currentPage, productInfo } = this.state;
    return (
      <div className="product-list">
        {products.map(product => (
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <Link to={`/products/${product._id}`}>Acessar </Link>
          </article>
        ))}
        <div className="actions">
          <button disabled={currentPage === 1} onClick={this.prevPage}>
            Anterior
          </button>
          <button
            disabled={currentPage === productInfo.pages}
            onClick={this.nextPage}
          >
            Próxima
          </button>
        </div>
      </div>
    );
  }
}
