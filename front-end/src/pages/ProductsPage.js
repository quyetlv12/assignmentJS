import ProductApi from "../api/ProductApi.js";
import { $, reRender } from "../utils.js";
import Header from "./component/Header.js";
import SearchBox from "./component/SearchBox.js";
import axios from "axios";

const ProductsPage = {
  async render() {
    
    const _pages = 2;
    const _limit = 9;
    const { data: products } = await ProductApi.Paginate(_pages, _limit);
    const { data: cate } = await ProductApi.getAllCate();
    const cateAll = cate
      .map((cate) => {
        return `<a href="#/category/${cate.id}"><li class="list-style-none text-dark" >${cate.name}</li></a>`;
      })
      .join("");
    const productResult = products
      .map(
        (item) => `
       
         <div class="card-product col-4 mt-2" >
         <a href="/#/products/${item.id}" class="text-decoration-none">
         



       
             <img class="card-img-top" src="${item.image}" height="250" alt="Card image cap">
             </a>
             <div class="card-body">
               <h5 class="card-title"><a href="/#/products/${item.id}" class="text-decoration-none">${item.name}</a></h5>
               <h4 class="card-text text-danger">${item.price} VNĐ</h4>
               <button class="btn btn-primary btn-view"><a href="/#/products/${item.id}" class="text-decoration-none text-white"><i class="fas fa-info-circle"></i> &nbsp;XEM CHI TIẾT</a></button>
             </div>
         </div>
      
         
      `
      )
      .join("");
    return /*html*/ `
    <head>
    <title>Sản phẩm</title></head>
    <div class="container-fluid " id="productRe">
    <div class="row  mt-5">
    <h3>Bộ lọc</h3>
    <div class="col-3">
    <div class="input-group mb-3">
          <div class="input-group-text">
            <input class="fillter-price" type="checkbox" value="5.000.000" aria-label="Checkbox for following text input">
          </div>
        <span> < 5 triệu</span>
        </div>
        <div class="input-group mb-3">
        <div class="input-group-text">
          <input class="fillter-price" type="checkbox" value="" aria-label="Checkbox for following text input">
        </div>
        <span> > 5 triệu</span>
        </div>
        <div class="input-group mb-3">
        <div class="input-group-text">
          <input class="fillter-price" type="checkbox" value="" aria-label="Checkbox for following text input">
        </div>
        <span> > 10 triệu</span>
        </div>
        <h3>Danh mục sản phẩm</h3>
        <div>
        <ul>
        ${cateAll}
        </ul>
        </div>
    </div>
    
    
    <div class="col-9" >
    <ul> <div class="card-group">
      <div class="row mt-2" id="productReRender">
                      ${productResult}
                        </div>
                        </div>
                 </ul>
    </div>
    
    </div>
      
    </div>`;
  },
  async afterRender() {
    const _limit = 9;
    const { data: productsPage } = await ProductApi.getAll();
    let pagess = Math.ceil(productsPage.length / _limit);
    console.log(pagess);
    const pagination = $("#pagination");
    pagination.innerHTML = "";
    for (let page = 1; page <= pagess; page++) {
      pagination.innerHTML += /*html*/ ` <input type="button" class="page-item btn btn-primary" value="${page}"/>`;
    }
    return `${await SearchBox.afterRender()}
    ${await Header.afterRender()}
    `;
  },
};
export default ProductsPage;
