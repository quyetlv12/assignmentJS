// import data from "../data.js";
import ProductApi from "../api/ProductApi.js";
const HomePages = {
  async render() {
    const { data: product } = await ProductApi.getAll();
    return `
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://xiaomiworld.vn/wp-content/uploads/2018/11/banner-1-08.png" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmFNuaip8LV0XgvjV6bTiHfUSLIdJLOMDNJw&usqp=CAU" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="https://kinhnghiemdulichdn.com/wp-content/uploads/2019/11/sua-dien-thoai-da-nang-ql-min.jpg" class="d-block w-100" alt="...">
    </div>
  </div>
</div>
    
    <div class="container mt-5">
      <ul> <div class="card-group">
      <div class="row">
                      ${product
                        .map(
                          (item) => `
                          <title>${item.name}</title>
                         <div class="col-3">
                         <a href="/#/products/${item.id}" class="text-decoration-none">
                             <img class="card-img-top" src="${item.image}" alt="Card image cap">
                             </a>
                             <div class="card-body">
                               <h5 class="card-title"><a href="/#/products/${item.id}" class="text-decoration-none">${item.name}</a></h5>
                               <p class="card-text">${item.price}</p>
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

export default HomePages;
