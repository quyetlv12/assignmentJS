import ProductApi from "../../api/ProductApi.js";
import { $ } from "../../utils.js";
const Top10News ={
   async render(){
    const {data : product } = await ProductApi.getAllNews();
    let i = product;
    let result = '';
    for (i = 0; i <= Math.floor(Math.random(product) * 20); i++) {
      console.log(product[i]);
      result  +=  `<div class="card mt-2 h-30"><a href="/#/news/${product[i].id}">
          <img src="${product[i].image}" class="card-img-top img-fluid " width=300 alt="...">
          <div class="card-body">
            <h5 class="card-title">${product[i].title}</h5>
          </div>
        </a>
      </div>`;
    }
    return result
    },
    async afterRender(){
     
    }
}
export default Top10News