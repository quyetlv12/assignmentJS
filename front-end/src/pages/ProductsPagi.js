import { $, parseRequestUrl } from "../utils";
import ProductApi from "../api/ProductApi.js";
import Header from "./component/Header";
const ProductsPagi = {
  async render() {
    const request = parseRequestUrl();
    let _page = request.id;
    let _limit = 8;
    const { data: product } = await ProductApi.Paginate(_page, _limit);
    const { data: cate } = await ProductApi.getAllCate();
    const resultCate = cate
      .map((cate) => {
        return /*html*/ `
      <div class="form-check">
      
          <input class="form-check-input" type="radio" value="${cate._id}" name="flexRadioDefault1" id="flexRadioDefault1">
          <label class="form-check-label" for="flexRadioDefault1">
            ${cate.name}
          </label>
        </div>
       
      `;
      })
      .join("");
    const cateResult_Product = product
      .map((item) => {
        return /*html*/ `
        <div class="card col-sm-6 col-md-6 col-lg-3 mt-2" >
        <a href="#/products/${item._id}">
        ${
          parseInt((item.salePrice / item.price) * 100) == 0
            ? ""
            : ` <div class="sale text-width">${parseInt(
                (item.salePrice / item.price) * 100
              )}%</div>`
        }
        <img src="${item.image}" height="200" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${item.name}</h5>
    <h3 class="card-text text-danger mt-2">${item.price} <small><del>${
          item.salePrice
        }</del></del></small></h3>
    <a href="/#/products/${item._id}" class="btn btn-primary">Xem chi tiết</a>
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
        <div class="col-2">
        <h5>Bộ lọc sản phẩm </h5>
        <div>
        
        <form action="" name="myForm">
        <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault" value="5.0" checked>
              <label class="form-check-label" for="flexRadioDefault1">
                Tất cả 
              </label>
            </div>
          <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault" value="5.0">
              <label class="form-check-label" for="flexRadioDefault1">
                < 5 Triệu
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" class="filter-price" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="10.0">
              <label class="form-check-label" for="flexRadioDefault2">
              > 10 Triệu  </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" class="filter-price" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="15.0">
              <label class="form-check-label" for="flexRadioDefault2">
              < 15 Triệu  </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" class="filter-price" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="20.0">
              <label class="form-check-label" for="flexRadioDefault2">
              > 20 Triệu  </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" class="filter-price" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="25.0">
              <label class="form-check-label" for="flexRadioDefault2">
              < 25 Triệu  </label>
            </div>
        </form>
        </div>
        <div><h5>Danh mục</h5>
        <div>
        <form action="" name="filterCate">
        <div class="form-check">
          <input class="form-check-input" type="radio" value="" name="flexRadioDefault1" id="flexRadioDefault1" checked>
          <label class="form-check-label" for="flexRadioDefault1">
            Tất cả danh mục
          </label>
        </div>
        ${resultCate}
        </form>
        
        </div></div>
        </div>
        <div class="col-10">
        <div class="products-container" id="product-pagi">
        
            <div class="row">
            ${cateResult_Product}
            </div>
            
            <div class="d-flex justify-content-center mb-5 product-pagi">
            <nav aria-label="Page navigation example mt-2" style="margin-top:60px">
            <input type="button" class="btn btn-primary" id="prev-page" value="Prev"/>
            <span id="pagination" style="margin-top:10px"></span>
            <input type="button" class="btn btn-primary" id="next-page" value="Next"/>
                          </nav>
                  </div>
        </div>
        <div id="show-filer" class="row"></div>
        </div>
        </div>
         
        </div>
        `;
  },
  async afterRender() {
    const request = parseRequestUrl();
    let id = request.id;
    const btn_prev = $("#prev-page");
    if (id == 1) {
      btn_prev.style.display = "none";
    }

    //start prev page
    $("#prev-page").addEventListener("click", () => {
      let id = request.id;
      id--;
      window.location.hash = `/product/${id}`;
    });

    //start next page

    $("#next-page").addEventListener("click", () => {
      let id = request.id;
      id++;
      window.location.hash = `/product/${id}`;
    });

    // start phân trang
    const _limit = 8;
    const { data: productsPage } = await ProductApi.getAll();
    let pagess = Math.ceil(productsPage.length / _limit);
    const pagination = $("#pagination");
    pagination.innerHTML = "";
    let pageNum = "";

    // start đếm tổng số trang trong cơ sở dữ liệu
    for (let page = 1; page <= pagess; page++) {
      pageNum += page;
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

    //start filter price

    const btn_filter = document.myForm.flexRadioDefault;
    console.log(btn_filter);
    for (let i = 0; i < btn_filter.length; i++) {
      btn_filter[i].addEventListener("click", async (e) => {
        const { data: products } = await ProductApi.getAll();
        const filter_price = products.filter((products) => {
          return btn_filter[i].value <= products.price;
        });
        if (btn_filter[i] != btn_filter[0]) {
          const cateResult_Product = filter_price
            .map((item) => {
              return /*html*/ `
                <div class="card col-3 mt-2" >
                <a href="#/products/${item._id}">
                ${
                  parseInt((item.salePrice / item.price) * 100) == 0
                    ? ""
                    : ` <div class="sale text-width">${parseInt(
                        (item.salePrice / item.price) * 100
                      )}%</div>`
                }
                <img src="${
                  item.image
                }" height="200" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <h3 class="card-text text-danger mt-2">${
                  item.price
                } <small><del>${item.salePrice}</del></del></small></h3>
                <a href="/#/products/${
                  item._id
                }" class="btn btn-primary">Xem chi tiết</a>
                    </a>
          </div>
        </div>  
                `;
            })
            .join("");
          console.log(filter_price);
          document.querySelector("#product-pagi").style.display = "none";
          document.querySelector("#show-filer").style.display = "";
          $("#show-filer").innerHTML = cateResult_Product;
          return false;
        } else {
          document.querySelector("#product-pagi").style.display = "block";
          document.querySelector("#show-filer").style.display = "none";
          return false;
        }
      });
    }

    //start filter cate

    const btn_filterCate = document.filterCate.flexRadioDefault1;
    for (let i = 0; i < btn_filterCate.length; i++) {
      btn_filterCate[i].addEventListener("click", async (e) => {
        const { data: products } = await ProductApi.getAll();
        const filterCate = products.filter((products) => {
          return products.cateID == btn_filterCate[i].value;
        });
        if (btn_filterCate[i] != btn_filterCate[0]) {
          const cateResult_Product = filterCate
            .map((item) => {
              return /*html*/ `
              <div class="card col-3 mt-2" >
              <a href="#/products/${item._id}">
              ${
                parseInt((item.salePrice / item.price) * 100) == 0
                  ? ""
                  : ` <div class="sale text-width">${parseInt(
                      (item.salePrice / item.price) * 100
                    )}%</div>`
              }
              <img src="${
                item.image
              }" height="200" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <h3 class="card-text text-danger mt-2">${
                item.price
              } <small><del>${item.salePrice}</del></del></small></h3>
              <a href="/#/products/${
                item._id
              }" class="btn btn-primary">Xem chi tiết</a>
                  </a>
        </div>
      </div>  
              `;
            })
            .join("");
          document.querySelector("#product-pagi").style.display = "none";
          document.querySelector("#show-filer").style.display = "";
          $("#show-filer").innerHTML = cateResult_Product;
          return false;
        } else {
          document.querySelector("#product-pagi").style.display = "block";
          document.querySelector("#show-filer").style.display = "none";
          return false;
        }
      });
    }
    return `${await Header.afterRender()}`;
  },
};

export default ProductsPagi;
