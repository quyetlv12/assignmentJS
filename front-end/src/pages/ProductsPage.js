import ProductApi from "../api/ProductApi.js";

const ProductsPage = {
  async render() {
    const { data: products } = await ProductApi.getAll();
    return `<div class="container">
      <ul> <div class="card-group">
      <div class="row">
                      ${products
                        .map(
                          (item) => `
                     
                         <div class="col-3">
                             <img class="card-img-top" src="${item.image}" alt="Card image cap">
                             <div class="card-body">
                               <h5 class="card-title"><a href="/#/products/${item.id}">${item.name}</a></h5>
                               <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                               <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                             </div>
                         </div>
                      
                         
                      `
                        )
                        .join("")}
                        </div>
                        </div>
                 </ul>
    </div>`;
  },
};
export default ProductsPage;
