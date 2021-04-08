import axios from "axios";
import ProductApi from "../api/ProductApi";
import firebase from "./firebase";
import { $, parseRequestUrl, reRender } from "../utils";
import Header from "./component/header";

const UpdateProduct = {
  async render() {
    const request = parseRequestUrl();
    const { data: product } = await ProductApi.getAll();
    const { data: cate } = await ProductApi.getAllCate();
    //start tìm id product == request id
    const idResult = product.filter((product) => {
      return product._id == request.id;
    });
    // start in danh mục
    const cateItem = cate.map((cate) => {
      return /*html*/ `
      <option value="${cate._id}">${cate.name}</option>
      `;
    });

    const printProduct = idResult.map((product) => {
      return /*html*/ `
      <head>
    <title>Cập nhật || ${product.name}</title></head>
    <div class="container">
    <div class="row" id="product-update">
    
    <div class="col-8">
    <h2>Cập nhật : ${product.name}</h2>
    <div class="col-12">
    <input type="text" class="form-control" placeholder="First name" aria-label="First name" id="update-id" value="${product._id}" disabled>
    </div>

    <div class="row mt-2">
    <div class="col-6">
      <input type="text" class="form-control" placeholder="First name" aria-label="First name" id="update-name" value="${product.name}">
    </div>
    <div class="col-6">
      <input type="file" class="form-control" placeholder="Last name" value="" aria-label="Last name" id="update-image">
    </div>
    </div>

    <div class="row mt-2">
    <div class="col-6">
      <input type="text" class="form-control" placeholder="Last name" aria-label="Last name" id="update-price" value="${product.price}">
    </div>
    <div class="col-6">
      <input type="text" class="form-control" placeholder="Last name" aria-label="Last name" id="update-status" value="${product.status}">
    </div>
    </div>
    <div class="row mt-2">
    <div class="col-6">
    <input type="text" class="form-control" placeholder="Last name" aria-label="Last name" id="update-quantity" value="${product.quantity}">
    </div>
    <div class="col-6">
    <select class="form-select" id="update-cateid" aria-label="Default select example">
    ${cateItem}
    </select>
    </div>
    </div>
    <div class="form-floating mt-2">
    <textarea class="form-control" placeholder="Leave a comment here" style="height: 100px" id="update-description">${product.description}</textarea>
    <label for="floatingTextarea2">Comments</label>
  </div>
    </div>
    <div class="col-4">
    <div >
    <img src="${product.image}" id="img-product" class="img-fluid w-100" alt="">
    <input class="d-none" type="text" id="url-image" value="${product.image}">
    </div>
    </div>
    </div>
      <div class="row mt-2">
      <button class="btn btn-danger w-100 mt-2 mb-2" id="btn-update-product">Update</button>
    </div> 
      `;
    });
    return printProduct;
  },
  async afterRender() {
    //start cập nhật sản phẩm
    document
      .querySelector("#btn-update-product")
      .addEventListener("click", async function () {
        const request = parseRequestUrl();
        const id = request.id;
        const { data: product } = await ProductApi.getAll();
        const { data: detail } = await ProductApi.get(id);
        const idResult = product.filter((product) => {
          return product.id == request.id;
        });

        if ($("#update-image").value == "") {
          const data = {
            ...detail,
            id: document.querySelector("#update-id").value,
            name: document.querySelector("#update-name").value,
            image: document.querySelector("#url-image").value,
            price: document.querySelector("#update-price").value,
            status: document.querySelector("#update-status").value,
            quantity: parseInt(
              document.querySelector("#update-quantity").value
            ),
            cateID: document.querySelector("#update-cateid").value,
            description: document.querySelector("#update-description").value,
          };
          console.log("ok");
          ProductApi.update(id, data).then((data) => console.log(data));
          window.location.hash = "/dashboard";
        } else {
          const productImage = $("#update-image").files[0];
          let storageRef = firebase
            .storage()
            .ref(`images/${productImage.name}`);
          storageRef.put(productImage).then(function () {
            storageRef.getDownloadURL().then((url) => {
              const data = {
                ...detail,
                id: document.querySelector("#update-id").value,
                name: document.querySelector("#update-name").value,
                image: url,
                price: document.querySelector("#update-price").value,
                status: document.querySelector("#update-status").value,
                quantity: parseInt(
                  document.querySelector("#update-quantity").value
                ),
                cateID: document.querySelector("#update-cateid").value,
                description: document.querySelector("#update-description")
                  .value,
              };
              ProductApi.update(id, data).then((data) => console.log(data));
              window.location.hash = "/dashboard";
            });
          });
        }
      });

    //end update products
    return `${await Header.afterRender()}`;
  },
};
export default UpdateProduct;
