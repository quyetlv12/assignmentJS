// import data from "../data.js";
import ProductApi from "../api/ProductApi.js";
import CateProduct from "./component/CateProduct1.js";
import CateProduct2 from "./component/CateProduct2.js";
import CateProduct3 from "./component/CateProduct3.js";
import Header from "./component/header.js";
import SearchBox from "./component/SearchBox.js";
import News from "./News.js";
const HomePages = {
 
  async render() {
    const { data: product } = await ProductApi.Paginate(2,8);
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
    
    <div class="container">
      <ul> <div class="card-group">
      <div class="row mt-2">
      <h2>Sản phẩm nổi bật</h2>
                      ${product
                        .map(
                          (item) => `
                       
                         <div class="card-product col-3 mt-2 p-3">
                         <a href="/#/products/${item.id}" class="text-decoration-none">
                         <div class="sale text-width">${parseInt(item.salePrice/item.price * 100 )}%</div>
                             <img class="card-img-top" src="${item.image}" height="250" alt="Card image cap">
                             </a>
                             <div class="card-body">
                               <h5 class="card-title"><a href="/#/products/${item.id}" class="text-decoration-none">${item.name}</a></h5>
                               <h4 class="card-text text-danger">${item.price} VNĐ <small><del>${item.salePrice}VNĐ</del></small></h4>
                               <button class="btn btn-primary btn-view"><a href="/#/products/${item.id}" class="text-decoration-none text-white"><i class="fas fa-info-circle"></i> &nbsp;XEM CHI TIẾT</a></button>
                               
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
    <div class="space-elm"></div>
    <div class="row">
    <h3>Tai nghe bluetooth</h3>
      ${await CateProduct.render()}
    </div>
    <div class="space-elm"></div>
    <div class="row">
    <h3>Tai nghe Chống ồn</h3>
      ${await CateProduct2.render()}
    </div>
    <div class="space-elm"></div>

    <div class="row">
    <h3>Tai nghe phòng thu</h3>
      ${await CateProduct3.render()}
    </div>
      
    
    <div class="space-elm"></div>
    </div>
    
    ${await News.render()}`;
  },
 async afterRender() {
    return `${await Header.afterRender()}
    `
  },
};

export default HomePages;
