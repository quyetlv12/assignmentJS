import Logout from "../../../../backend/account/Logout";
import ProductApi from "../../api/ProductApi";
import { $ } from "../../utils";
import SearchBox from "./SearchBox";

const Header = {
  async render() {
    const { data: cate } = await ProductApi.getAllCate();
    let products = [];
    products = JSON.parse(localStorage.getItem('products'));
    const reducer = (accumulator, currentValue) => {
      return accumulator + +currentValue.quantity;
    };
    return /*html*/ ` <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fixed-top" id="navbar-header">
        <div class="container" id="nav-header">
          <a class="navbar-brand" href="http://localhost:6868/"><img src="../../../src/public/images/logo.png" width="50" alt="">&nbsp; HeadPhone</a>
          <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto" >
            <li>
            ${await SearchBox.render()}</li>
              <li class="nav-item nav-product">
                <a class="nav-link" href="http://localhost:6868/#/product/1">Product</a>
                <ul id="cate_item">
                ${cate
                  .map((cate) => {
                    return `<a href="#/category/${cate._id}"><li>${cate.name}</li></a>`;
                  })
                  .join("")}
                </ul>
              </li>
             
              <li class="nav-item">
                <a class="nav-link" href="http://localhost:6868/#/news">News</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link" href="http://localhost:6868/#/about">
                  About
                </a>
                
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link" href="http://localhost:6868/#/contact">
                Contact
                </a>
              
              </li>
              <li class="nav-item shopping-cart">
                <a class="nav-link" href="http://localhost:6868/#/cart" id="navbarDropdownBlog" >
                <i class="fa fa-shopping-cart"></i><span id="total-shopping-cart" class="text-white">
                 ${products.length}
                </span>
                
                </a>
               
              </li>
              <div class="dropdown ml-3">
              <button class="btn btn-account-tools dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
              ${localStorage.getItem("image") == null ?`<i class="fas fa-user-shield text-white"></i>` :     
              /*html*/`<img class=" border border-primary rounded-circle" src="${localStorage.getItem("image")}" width="30" alt="">`}
              
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>${
                  localStorage.getItem("username") == null
                    ? /*html*/`<ul class='list-user'><li>
                      <a  href='http://localhost:6868/#/login'>
                      <button class="btn btn-primary w-100">ĐĂNG NHẬP</button>
                      </a>
                    </li>
                    <li class="mt-3">
                      <a href="http://localhost:6868/#/registration">
                      <button class="btn btn-danger w-100">ĐĂNG KÍ</button>
                      </a>
                    </li>
                   </ul>`
                    : /*html*/ `
                <ul class="list-user-tools text-center">
                <li ><a class="text-dark" href="http://localhost:6868/#/info">${localStorage.getItem("username")}</a>
                </li>
                <li class="nav-item nav-dashboard hide" id="dashboard-link">
                <a class="nav-link text-dark" href="http://localhost:6868/#/dashboard">Dashboard</a>
              </li>
                <li><button class="btn btn-primary" id="btn-logout">Đăng xuất</button></li>
                </ul>
                `
                }</li>
                
              </ul>
            </div></li>
            </ul>
          </div>
        </div>
      </nav>`;
  },
  async afterRender() {
    if(localStorage.getItem('username') == null){
      return `${await SearchBox.afterRender()}`;
    }
    if (localStorage.getItem("role") == 0) {
      $("#dashboard-link").classList.add("show");
    } else {
      $("#dashboard-link").classList.add("hide");
    }
   
    $("#btn-logout").addEventListener("click",function () {
      (window.location.hash = "/login");
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("numberphone");
      localStorage.removeItem("image");
      localStorage.removeItem("role");
    });
    return `${await SearchBox.afterRender()}`;
  },
};

export default Header;
