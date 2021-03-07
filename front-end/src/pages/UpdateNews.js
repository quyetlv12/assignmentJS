import axios from "axios";
import ProductApi from "../api/ProductApi";
import { parseRequestUrl } from "../utils";
const UpdateNews = {
  async render() {
    const request = parseRequestUrl();
    const { data: news } = await ProductApi.getAllNews();
    const { data: cate } = await ProductApi.getAllCate();
    const idResult = news.filter((news) => {
      return news.id == request.id;
    });

    const printProduct = idResult.map((news) => {
      return /* html*/ `
      <head>
    <title>Cập nhật || ${news.title}</title></head>
        <div class="container">
        <div>
        <h3>CẬP NHẬT : ${news.name}</h3>
        </div>
            <div class="row mt-2">
                <div class="col-12">
                <label for="">ID</label>
                <input type="text" class="form-control" placeholder="First name" aria-label="First name" id="update-id" value="${news.id
        }" disabled>
                </div>
            </div>
           
      <div class="row mt-2">
          <div class="col-6">
          <label for="">Name</label>
            <input type="text" class="form-control" placeholder="First name" aria-label="First name" id="update-title" value="${news.title
        }">
        
          </div>
          <div class="col-6">
          <label for="">Image</label>
            <input type="text" class="form-control" placeholder="Last name" aria-label="Last name" id="update-image" value="${news.image
        }">
          </div>
      </div>
      <div class="row mt-2">
          <div class="col-12">
          <div class="form-floating">
  <textarea class="form-control" rows="50" cols="30" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 300px" id="update-content">${news.content}</textarea>
  <label for="floatingTextarea2">Content</label>
</div>
           
          </div>
      <div class="row mt-2">
    <div class="row">
    <div class="col-12 d-flex justify-content-center mt-2 mb-4">
    <a href="http://localhost:6868/#/dashboard"><button class="btn btn-danger w-100" id="btn-update-product">Cập nhật</button>
    </div>
    </div>
    
    </a>
        </div>
`;
    });
    return printProduct;
  },
  async afterRender() {
    document
      .querySelector("#btn-update-product")
      .addEventListener("click", function () {
        const request = parseRequestUrl();
        const id = request.id;
        const data = {
          id: document.querySelector("#update-id").value,
          title: document.querySelector("#update-title").value,
          image: document.querySelector("#update-image").value,
          content: document.querySelector("#update-content").value,
        };
        const data_URL = "http://localhost:3000/news/";
        axios.put(data_URL + id, data);
      });

  }
}
export default UpdateNews;