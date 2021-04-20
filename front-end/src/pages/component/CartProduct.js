import { $ } from "../../utils";
import CheckOut from "./CheckOut";
import ListItemCart from "./ListItemCart";

const CartProduct = {
  async render() {
      let products = [];
      products = JSON.parse(localStorage.getItem("products"))
    return /*html*/ `
    <title>Cart</title>
       <div class="container">
       ${products == 0 ? /*html*/`<div class="d-flex justify-content-center">
       <h1>CART EMPTY </h1>
       </div>` : /*html*/` <table class="table table-hover" id="table">
       <thead class="text-center">
       <th>#</th>
       <th>Image</th>
       <th>Name</th>
       <th>Price</th>
       <th>Quantity</th>
       <th>Action</th>
       </thead>
       <tbody>
       ${await ListItemCart.render()}
       </tbody>
       </table>`}
      
       </div>

       `;
  },
  async afterRender() {
      return await ListItemCart.afterRender() 
  },
};
export default CartProduct;
