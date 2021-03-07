import ProductApi from "../../api/ProductApi.js";
const CountUser = {
   async render(){
        const { data: news } = await ProductApi.getAllAccount();   
        return `<div class="row" id="count-product">
        <div class="col-xl-3 col-md-6 text-center">
            <div class="card bg-primary text-white mb-4">
            <div class="card-title"><h4><i class="fas fa-border-all"></i> Tổng số người dùng</h4></div>
                <div class="card-body">
                <h2>
                ${news.length}
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

export default CountUser;