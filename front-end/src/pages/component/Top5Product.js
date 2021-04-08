import ProductApi from "../../api/ProductApi.js";
import { $ } from "../../utils.js";
const Top10Product ={
   async render(){
    const {data : product } = await ProductApi.getAll();
    let i = product;
    let result = '';
    for (i = 0; i <=3; i++) {
      result  +=  `<div class="card col-3 mb-3">
      <img src="${product[i].image}" height="250" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${product[i].name}</h5>
        <p class="card-text">${product[i].price} VNĐ </p>
        <a href="/#/products/${product[i]._id}" class="btn btn-primary">Detail</a>
      </div>
    </div>`;
    }
    return result
    },
    async afterRender(){
     
    }
}
export default Top10Product