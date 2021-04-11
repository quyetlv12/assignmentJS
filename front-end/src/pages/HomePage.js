// import data from "../data.js";
import ProductApi from "../api/ProductApi.js";
import BrandSlider from "./component/Hero.js";
import CateProduct from "./component/CateProduct1.js";
import CateProduct2 from "./component/CateProduct2.js";
import CateProduct3 from "./component/CateProduct3.js";
import Header from "./component/header.js";
import SearchBox from "./component/SearchBox.js";
import News from "./News.js";
const HomePages = {
  async render() {
    const { data: product } = await ProductApi.getAll();
    return /*html */ `
    <head>
    <title>Trang chủ</title></head>
    
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <ol class="carousel-indicators">
    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>
    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
   
    <div class="carousel-item">
      <img src="https://tainghe.com.vn/media/banner/29_Oct4b1c59c7728e2b1cb65f6cb20aaf5cf9.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item active">
    <img src="https://tainghe.com.vn/media/banner/21_Jan812749e1a307f38fd0a88b54bea55ff2.png" class="d-block w-100" alt="...">
  </div>
    <div class="carousel-item">
      <img src="https://tainghe.com.vn/media/banner/03_Jul8abb6215f35c5477a75ab308e0a881fd.jpg" class="d-block w-100" alt="...">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </a>
</div>
<div class="row ">
<div class="col-md-4 col-sm-4 mt-3">
<img src="https://tainghe.com.vn/media/banner/01_Apra8520c1ff98c117296b85dddb6c3357e.png" class="img-fluid" alt="">
</div>
<div class="col-md-4 col-sm-4 mt-3">
<img src="https://tainghe.com.vn/media/banner/14_Jan3aa87eb1ebfc3c990600da85219dc698.png" class="img-fluid" alt=""></div>
<div class="col-md-4 col-sm-4 mt-3">
<img src="https://tainghe.com.vn/media/banner/30_Jane06d061a77a7bde916b8a91163029d41.jpg" class="img-fluid" alt=""></div>
</div>
    <div class="container">
      <ul> <div class="card-group bg-white p-3">
      <div class="row mt-2 ">
      <h2>Sản phẩm nổi bật</h2>
                      ${product
                        .map(
                          (item) => /*html*/ `
                         <div class="card-product col-md-3 col-sm-6 mt-2">
                         <a href="/#/products/${
                           item._id
                         }" class="text-decoration-none">
                         ${
                           parseInt((item.salePrice / item.price) * 100) == 0
                             ? ""
                             : ` <div class="sale text-width">${parseInt(
                                 (item.salePrice / item.price) * 100
                               )}%</div>`
                         }
                             <img class="card-img-top img-fluid p-4" src="${
                               item.image
                             }" height="250" alt="Card image cap">
                             </a>
                             <div class="card-body">
                               <h5 class="card-title"><a href="/#/products/${
                                 item._id
                               }" class="text-decoration-none fs-6">${
                            item.name
                          }</a></h5>
                               <div class="row">
                               <div class="col-md-8"><h5 class="card-text text-danger">${
                                 item.price
                               } VNĐ</h5></div>
                               <div class="col-md-4">
                               <h5> <small><del>${
                                 item.salePrice
                               }VNĐ</del></small></h5>
                               </div>
                               </div>
                               
                               <button class="btn btn-primary btn-view"><a href="/#/products/${
                                 item._id
                               }" class="text-decoration-none text-white"><i class="fas fa-info-circle"></i> &nbsp;XEM CHI TIẾT</a></button>
                               
                             </div>
                         </div>
                      `
                        )
                        .join("")}
                        </div>
                        </div>
                 </ul>
    </div>

    <div class="container">

    <div class="row">
    <h3>Tai nghe bluetooth</h3>
      ${await CateProduct.render()}
    </div>
    <div class="col-xxl-8 px-4 py-5 bg-white">
  <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
    <div class="col-10 col-sm-8 col-lg-6">
      <img src="https://tainghe.com.vn/media/product/3210_1.jpg" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" loading="lazy">
    </div>
    <div class="col-lg-6">
      <h1 class="display-5 fw-bold lh-1 mb-3">Responsive left-aligned hero with image</h1>
      <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
      <div class="d-grid gap-2 d-md-flex justify-content-md-start">
        <button type="button" class="btn btn-primary btn-lg px-4 me-md-2">Primary</button>
        <button type="button" class="btn btn-outline-secondary btn-lg px-4">Default</button>
      </div>
    </div>
  </div>
</div>
    
    <div class="row">
    <h3>Tai nghe Chống ồn</h3>
      ${await CateProduct2.render()}
    </div>
    <div class="row">
    <h3>Tai nghe phòng thu</h3>
      ${await CateProduct3.render()}
    </div>
    <div>
    ${await BrandSlider.render()}
    </div>
    
    <div class="space-elm"></div>
    </div>
    ${await News.render()}
    
   `;
  },
  async afterRender() {
    return `${await Header.afterRender()}
    `;
  },
};

export default HomePages;
