import { $, parseRequestUrl } from "../utils";
import ProductApi from "../api/ProductApi.js";
import Header from "./component/Header";
const ProductsPagi = {
  async render() {
    const request = parseRequestUrl();
    let _page = request.id;
    let _limit = 8;
    const { data: product } = await ProductApi.Paginate(_page, _limit);
    const cateResult_Product = product
      .map((item) => {
        return /*html*/ `
        <div class="card col-3 mt-2">
        <a href="#/products/${item.id}">
        <div class="sale">${parseInt(item.salePrice/item.price * 100 )}%</div>
        <img src="${item.image}" height="250" class="card-img-top" alt="...">
  <div class="card-body">
    <h4 class="card-title">${item.name}</h4>
    <h3 class="card-text text-danger mt-2">${item.price} <small><del>${item.salePrice}</del></del></small></h3>
    <a href="/#/products/${item.id}" class="btn btn-primary">Xem chi tiết</a>
        </a>
  </div>
</div>  
        `;
      })
      .join("");
    return /*html*/ `
    <title>Sảm phẩm</title>
        <div class="container">
        <div class="row">
        
        <div class="col-12">
        <div class="row">
        ${cateResult_Product}
        </div>
        
        <div class="d-flex justify-content-center mb-5">
        <nav aria-label="Page navigation example mt-2" style="margin-top:60px">
        <input type="button" class="btn btn-primary" id="prev-page" value="Prev"/>
        <span id="pagination" style="margin-top:10px"></span>
        <input type="button" class="btn btn-primary" id="next-page" value="Next"/>
                       </nav>
              </div>
        </div>
        </div>
         
        </div>
        `;
  },
  async afterRender() {
    const request = parseRequestUrl();
    let id = request.id;
    const btn_prev = $("#prev-page");
    if(id == 1){
      btn_prev.style.display = "none";
    }
    
    $("#prev-page").addEventListener("click", () => {
      let id = request.id;
      id--;
      window.location.hash = `/product/${id}`;
    });
    $("#next-page").addEventListener("click", () => {
      let id = request.id;
      id++;
      window.location.hash = `/product/${id}`;
    });
    const _limit = 8;
    const { data: productsPage } = await ProductApi.getAll();
    let pagess = Math.ceil(productsPage.length / _limit);
    const pagination = $("#pagination");
    pagination.innerHTML = "";
    let pageNum = '';
    for (let page = 1; page <= pagess; page++) {
      pageNum += page
      pagination.innerHTML += /*html*/ ` <input type="button" class="page-item btn btn-primary align-center" value="${page}"/>`;
    }
    console.log(parseInt(pageNum));
    const btns = $(".page-item");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        let id = request.id;
        id = btn.value;
        window.location.hash = `/product/${id}`;
      });
    });

    return `${await Header.afterRender()}`;
  },
};

export default ProductsPagi;
