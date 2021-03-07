import ProductApi from "../../api/ProductApi";
import axios from "axios";
import { reRender, $ } from "../../utils";
import firebase from "../firebase";

const ListUser = {
  async render() {
    const { data: product } = await ProductApi.getAllUser();
    const List = product
      .map((product) => {
        return /*html*/ `<tr class="trContent">
            <td>${product.id}</td>
            <td>${product.username}</td>
            <td><img src="${product.image}" width="200"/></td>
            <td>${product.email}</td>
            <td>${product.numberphone}</td>
            <td>${product.role == 0 ? "Quản trị" : "Khách hàng" } </td>
            <td class="p-4 action-product">
            
            <div class="row">
              <a href="#/products/${product.id}"> <button class="btn btn-primary"><div class="">
                <i class="fas fa-info-circle"></i>
              </div> Detail</button></a>
            </div>
             
            <div class="row mt-2">
              <div class="">
                <button class="btn btn-danger btn-remove text-white" id="btn-remove-product" data-id="${product.id}"><div class="">
                  <i class="fas fa-trash-alt"></i>
                </div> Remove</button>
              </div>
            </div>
             <div class="row mt-2">
               <a href="#/update/${product.id}"> <button class="btn btn-success"><div class="">
                 <i class="fas fa-edit"></i>
               </div> Update</button></a>
             </div>
           </td>
            </tr>`;
      })
      .join("");
    return /*html*/ `
    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>IMAGE</th>
                <th>EMAIL</th>
                <th>NUMBER PHONE</th>
                <th>PERMISSION</th>
                <th>ACTION</th>
            </tr>
        </thead>
        <!--show product!-->
        <tbody id="list-products">
             ${List}
        </tbody>
    
        
       
    </table>`;
  },
  async afterRender() {
    // THÊM SẢN PHẨM
    document
      .querySelector("#add-product")
      .addEventListener("click", async function (e) {
        const $ = document.querySelector.bind(document);
        if (
          $("#form-add-name").value == "" ||
          $("#form-add-image").value == ""
        ) {
          alert("vui lòng nhập sản phẩm");
        } else {
          e.preventDefault();
          const productImage = $("#form-add-image").files[0];
          let storageRef = firebase
            .storage()
            .ref(`images/${productImage.name}`);
          storageRef.put(productImage).then(function () {
            storageRef.getDownloadURL().then(async (url) => {
              const product = {
                id: $("#form-add-id").value,
                name: $("#form-add-name").value,
                image: url,
                price: $("#form-add-price").value,
                status: $("#form-add-status").value,
                quantity: $("#form-add-quantity").value,
                cateID: parseInt($("#form-add-cateid").value),
                description: $("#form-add-description").value,
                createdAt: Date.now(),
              };
              const data_URL = "http://localhost:3000/products";
              const method_SEVER = {
                method: "POST",
                headers: { "content-type": "application/json" },
                data: JSON.stringify(product),
                url: data_URL,
              };

              await axios(method_SEVER, product);
              await reRender(ListUser, "#dataTable");
              $("#form-add-name").value = "";
              $("#form-add-image").value = "";
              $("#form-add-price").value = "";
              $("#form-add-quantity").value = "";
              $("#form-add-description").value = "";
            });
          });
        }
      });

    //END THÊM SẢN PHẨM

    //start XOÁ SẢN PHẨM
    const buttons = document.querySelectorAll(".btn-remove");
    const data_URL = "http://localhost:3000/account/";
    buttons.forEach((buttons) => {
      buttons.addEventListener("click", async function (e) {
        e.preventDefault();
        const question = confirm("Are you sure delete ? ");

        if (question) {
          const { id } = this.dataset;
          await axios.delete(data_URL + id);
          await reRender(ListUser, "#dataTable");
        }
      });
    });

    //END XOÁ SẢN PHẨM

    // TÌM KIẾM SẢN PHẨM THEO BẢNG
    $("#search-table").addEventListener("keyup", function (e) {
      const tr = $(".trContent");

      for (let i = 0; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[1];
        const tdContent = td.innerText || td.textContent;
        let txtValue = e.target.value;
        if (tdContent.toLowerCase().indexOf(e.target.value) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    });
  },
  //END TÌM KIẾM SẢN PHẨM
};

export default ListUser;
