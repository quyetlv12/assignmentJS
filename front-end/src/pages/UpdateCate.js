import axios from "axios";
import ProductApi from "../api/ProductApi";
import { parseRequestUrl } from "../utils";
const UpdateCate = {
  async render() {
    const request = parseRequestUrl();
    const { data: cate } = await ProductApi.getAllCate();
    const idResult = cate.filter((cate) => {
      return cate._id == request.id;
    });

    const printProduct = idResult.map((cate) => {
      return /* html*/ `
      <head>
    <title>Cập nhật || ${cate.name}</title></head>
        <div class="container">
        <div>
        <h3>CẬP NHẬT : ${cate.name}</h3>
        </div>
            <div class="row mt-2">
                <div class="col-12">
                <label for="">ID</label>
                <input type="text" class="form-control" placeholder="First name" aria-label="First name" id="update-id" value="${cate._id}" disabled>
                </div>
            </div>
           
      <div class="row mt-2">
          <div class="col-12">
          <label for="">Name</label>
            <input type="text" class="form-control" placeholder="First name" aria-label="First name" id="update-name" value="${cate.name}">
        
          </div>
      </div>
      <div class="row mt-2">
    <div class="row">
    <div class="col-12 d-flex justify-content-center mt-2 mb-4">
    <button class="btn btn-danger w-100" id="btn-update-product">Cập nhật</button>
    </div>
    </div>
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
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");
        const data = {
          id: document.querySelector("#update-id").value,
          name: document.querySelector("#update-name").value,
        };
        const data_URL = "http://localhost:6767/api/categories/";
        axios.put(`${data_URL}${id}/${userId}`, data, {
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        window.location.hash = "/dashboardcate";
      });
  },
};
export default UpdateCate;
