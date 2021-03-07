import ProductApi from "../../api/ProductApi.js";
const CountProduct = {
   async render(){
    const { data: cate } = await ProductApi.getAllCate();
        return `<div class="row">
        <div class="col-xl-3 col-md-6 text-center" >
            <div class="card bg-primary text-white mb-4">
            <div class="card-title"><h4><i class="fas fa-border-all"></i> Tổng số danh mục</h4></div>
                <div class="card-body">
                <h2>
                ${cate.length}
                </h2>
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a class="small text-white stretched-link" id='key' onclick="func(0)" href="/#dataList">View Details</a>
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
    </div>`
    }
}

export default CountProduct;