import ProductApi from "../api/ProductApi";
import { parseRequestUrl, $, reRender } from "../utils";
import Header from "./component/header";
import SearchBox from "./component/SearchBox";
import Top10Product from "./component/Top5Product";
const ProductDetail = {
  async render() {
    const { id } = parseRequestUrl();
    const { data: product } = await ProductApi.get(id);
    return /*html*/ `
    <head>
    <title>${product.name}</title></head>
        <div class="container mb-3">
        	<div class="row">
        	<div class="col-4">
        	<img src="${product.image}" width="350"class="img-fluid"/>
        	</div>
        	<div class="col-8">
        	
        	<h2>
        	${product.name}
            </h2>
            <h2>
        <div class="row">
        <div class="col-12">
        <i class="fas fa-star fs-6 text-warning"></i>
        <i class="fas fa-star fs-6 text-warning"></i>
        <i class="fas fa-star fs-6 text-warning"></i>
        <i class="fas fa-star fs-6 text-warning"></i>     
        <i class="far fa-star fs-6"></i>   
        <i class="fas fa-grip-lines-vertical fs-6 text-secondary"></i>
        <i class="fab fa-facebook-f fs-6 text-primary"></i>
        <i class="fab fa-twitter fs-6 text-primary"></i>
        <i class="fab fa-instagram fs-6 text-warning"></i>
                      </div>
        </div>
            </h2>
            <p>${product.description}</p>
           <h3> ${product.price} VNĐ</h3>
            <div class="row">
            <div class="col-1">
            <button class="btn btn-primary" id="btn-minus"> - </button>
            </div>
            <div class="col-2">
            <input type="number" value="1" disabled id="quantity-product-add" class="form-control">
            </div>
            <div class="col-1">
            <button  class="btn btn-primary" id="btn-plus"> + </button>
            </div>
            </div>        
            <button class="btn btn-primary mt-2 ml-5 mt-3"  id="btn-add-to-cart"><i class="fas fa-cart-plus"></i> Add To Card</button>

            </div>
        </div>
        <h2>Sản phẩm đề xuất</h2>
        <div class="row">
        
        ${await Top10Product.render()}
        </div>
        </div>
            `;
  },
  async afterRender() {
    let products = [];
    $("#btn-minus").addEventListener("click", function () {
      let quantity_product = $("#quantity-product-add");
      --quantity_product.value;
      if (quantity_product.value <= 0) {
        alert("vui lòng nhập số lượng lớn hơn 1");
        quantity_product.value = 1;
      }
    });
    $("#btn-plus").addEventListener("click", function () {
      let quantity_product = $("#quantity-product-add");
      ++quantity_product.value;
    });
    $("#btn-add-to-cart").addEventListener("click", async function () {
      const { id } = parseRequestUrl();
      const { data: product } = await ProductApi.get(id);
      if (localStorage.getItem("products")) {
        products = JSON.parse(localStorage.getItem("products"));
      }
      if (localStorage.getItem("products") == null) {
        let products = [];
        localStorage.setItem("products", products);
      }

      products = JSON.parse(localStorage.getItem("products"));
      let hashProduct = false;
      let price = parseFloat(product.price).toFixed(3);
      for (let i = 0; i < products.length; i++) {
        let idProduct = products[i];
        if (idProduct.id == product._id) {
          console.log(typeof products[i].quantity);
          const quantity = parseInt($("#quantity-product-add").value);
          products[i].quantity += parseInt($("#quantity-product-add").value);
          products[i].price = product.price * products[i].quantity;
          localStorage.setItem("products", JSON.stringify(products));
          alert(
            "Số lượng giỏ hàng đã được thay đổi thành " + products[i].quantity
          );
          hashProduct = true;
        }
      }
      if (hashProduct == false) {
        let price = parseFloat(product.price).toFixed(3);
        products.push({
          id: product._id,
          name: product.name,
          image: product.image,
          price: parseFloat(product.price).toFixed(3),
          quantity: parseInt($("#quantity-product-add").value),
        });
        console.log(typeof price);
        localStorage.setItem("products", JSON.stringify(products));
        reRender(Header, "#nav-header");
        $("#nav-header").style.marginLeft = "53px";
        $("#nav-header").style.height = "68px";
        alert("Thêm vào giỏ hàng thành công");
      }
    });
    return `${await SearchBox.afterRender()}${await Header.afterRender()}`;
  },
};

export default ProductDetail;
