import ProductApi from "../../api/ProductApi.js";
const CountProduct = {
   async render(){
        const { data: product } = await ProductApi.getAll();
    const { id, name } = product;
    const { data: cate } = await ProductApi.getAllCate();
    const reducer = (accumulator, currentValue) => {
      return accumulator + +currentValue.quantity;
    };
    const cateResultProduct1 = product.filter(product =>{
        return product.cateID == 1;
    })
    const cateResultProduct2 = product.filter(product =>{
        return product.cateID == 2;
    })
    const cateResultProduct3 = product.filter(product =>{
        return product.cateID == 3;
    })
    const reducer_cate = (accumulator, currentValue) => {
      return accumulator + +currentValue.cateID;
    };
        return `<div class="row">
        <div class="col-xl-3 col-md-6 text-center" >
            <div class="card bg-primary text-white mb-4">
            <div class="card-title"><h4><i class="fas fa-border-all"></i> Tổng số sản phẩm</h4></div>
                <div class="card-body">
                <h2>
                ${product.reduce(reducer, 0)}
                </h2>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" id='key' onclick="func(0)" href="/#dataList">View Details</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 text-center">
            <div class="card bg-warning text-white mb-4">
            <div class="card-title"><h4><i class="fas fa-border-all"></i> Tai nghe bluetooth</h4></div>
                <div class="card-body">
                <h2>
                ${cateResultProduct1.length}
                </h2>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" href="#dataList">View Details</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 text-center">
            <div class="card bg-success text-white mb-4">
            <div class="card-title"><h4><i class="fas fa-border-all"></i> Tai nghe phòng thu</h4></div>
                <div class="card-body">
                <h2>
                ${cateResultProduct2.length}
                </h2>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" href="#dataList">View Details</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6 text-center">
            <div class="card bg-info text-white mb-4">
            <div class="card-title"><h4><i class="fas fa-border-all"></i> Tai nghe chống ồn</h4></div>
                <div class="card-body">
                <h2>
                ${cateResultProduct3.length}
                </h2>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" href="#dataList">View Details</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
    </div>`
    }
}

export default CountProduct;