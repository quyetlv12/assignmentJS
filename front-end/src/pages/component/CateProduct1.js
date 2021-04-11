
import ProductApi from '../../api/ProductApi.js';
const CateProduct = {
   async render (){
        const {data : product} = await ProductApi.getAll();
        const { data : cate} = await ProductApi.getAllCate()
        const cateResult = product.filter(product =>{
            return product.cateID == "6057005facdd4575e37ccfab"
        })
        const cateResult_Product = cateResult.map(product =>{
            return `
            
            <div class="card-product col-md-3 col-sm-12 mt-2 p-3">
            <a href="/#/products/${product._id}" class="text-decoration-none">
            ${parseInt(product.salePrice/product.price * 100 )== 0 ? "" : ` <div class="sale text-width">${parseInt(product.salePrice/product.price * 100 )}%</div>`}
                <img class="card-img-top" src="${product.image}" height="250" alt="Card image cap">
                </a>
                <div class="card-body">
                  <h5 class="card-title"><a href="/#/products/${product._id}" class="text-decoration-none">${product.name}</a></h5>
                  <h4 class="card-text text-danger">${product.price} VNĐ <small><del>${product.salePrice}VNĐ</del></small></h4>
                  <button class="btn btn-primary btn-view"><a href="/#/products/${product._id}" class="text-decoration-none text-white"><i class="fas fa-info-circle"></i> &nbsp;XEM CHI TIẾT</a></button>
                </div>
            </div>`
        }).join("");
        
        return cateResult_Product
    },
    afterRender(){
    
    }
}

export default CateProduct;