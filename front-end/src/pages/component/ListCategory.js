import ProductApi from "../../api/ProductApi";
import axios from "axios";
import { reRender, $ } from "../../utils";
import CountProduct from "./CountProduct.js";
import CateProduct from "./CateProduct1.js";

const ListCate = {
  async render() {
    const { data: cate } = await ProductApi.getAllCate();
    return /*html*/`
   
    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
               
                <th>ACTION</th>
            </tr>
        </thead>
        <tbody id="list-products">
        ${cate
        .map((cate) => {
          return `<tr class="trContent">
            <td>${cate.id}</td>
            <td>${cate.name}</td>
          
            <td class="p-4 action-product">
            
            <div class="row">
              <a href="#/category/${cate.id}"> <button class="btn btn-primary"><div class="">
                <i class="fas fa-info-circle"></i>
              </div> Detail</button></a>
            </div>
             
            <div class="row mt-2">
              <div class="">
                <button class="btn btn-danger btn-remove-cate text-white" id="btn-remove-cate" data-id="${cate.id}"><div class="">
                  <i class="fas fa-trash-alt"></i>
                </div> Remove</button>
              </div>
            </div>
             <div class="row mt-2">
               <a href="#/updatecate/${cate.id}"> <button class="btn btn-success"><div class="">
                 <i class="fas fa-edit"></i>
               </div> Update</button></a>
             </div>
           </td>
            </tr>`;
        })
        .join("")}
        </tbody>
        
       
    </table>`;
  },
  async afterRender() {
    document
      .querySelector("#add-cate")
      .addEventListener("click",async function (e) {
        e.preventDefault();
        const $ = document.querySelector.bind(document);
        if($("#cate-add-name").value ==""){
          alert("vui lòng nhập sản phẩm");
        }else{
          const product = {
            id: $("#cate-add-id").value,
            name: $("#cate-add-name").value,
          };
          const data_URL = "http://localhost:3000/category";
          const method_SEVER = {
            method: "POST",
            headers: { "content-type": "application/json" },
            data: JSON.stringify(product),
            url: data_URL,
          };
          alert("Thêm thành công danh mục " + $("#cate-add-name").value)
          axios(method_SEVER, product);
          await reRender(ListCate, "#dataTable");

        }


       
      });
    const buttons = document.querySelectorAll(".btn-remove-cate");
    const data_URL = "http://localhost:3000/category/";
    buttons.forEach((buttons) => {
      buttons.addEventListener("click",async function (e) {
        e.preventDefault();
        const question = confirm("Are you sure delete ? ");

        if (question) {
          const { id } = this.dataset;
          
          await axios.delete(data_URL + id);
          await reRender(ListCate, "#dataTable");  

         }
      });
    });
    $("#search-table").addEventListener("keyup", function (e) {

      const tr = $('.trContent');

      for (let i = 0; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[1];
        const tdContent = td.innerText || td.textContent;
        let txtValue = e.target.value
        if (tdContent.toLowerCase().indexOf(e.target.value) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    })
  },
};

export default ListCate;
