import ProductApi from "../../api/ProductApi";
import axios from "axios";
import { reRender, $ } from "../../utils";
import firebase from "../firebase";

const ListOrder = {
  async render() {
    const { data: product } = await ProductApi.getAllOrder();
    const List = product
      .map((product) => {
        return /*html*/ `<tr class="trContent">
            <td>${product.id}</td>
            <td>${product.customerName}</td>
            <td>
            <ul>
            <li>${product.product}</li>
            </ul>
            </td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            </tr>`;
      })
      .join("");
    return /*html*/ `
    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRODUCTS</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
            </tr>
        </thead>
        <!--show product!-->
        <tbody id="listPproducts">
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
         
          const productImage = $("#form-add-image").files[0];
          let storageRef = firebase
            .storage()
            .ref(`images/${productImage.name}`);
          storageRef.put(productImage).then(function (e) {
            storageRef.getDownloadURL().then(async (url,e) => {
              
              const product = {
                id: $("#form-add-id").value,
                name: $("#form-add-name").value,
                image: url,
                price: parseFloat($("#form-add-price").value).toFixed(3),
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
              alert("Thêm sản phẩm thành công " + product.name)
              await axios(method_SEVER, product);
              await reRender(ListProduct, "#listPproducts");
              $("#form-add-name").value = "";
              $("#form-add-image").value = "";
              $("#form-add-price").value = "";
              $("#form-add-quantity").value = "";
              $("#form-add-description").value = "";
              return false;
            });
          });
        }
        e.preventDefault();
        return false;
        
      });

    //END THÊM SẢN PHẨM

    //start XOÁ SẢN PHẨM
    const buttons = document.querySelectorAll(".btn-remove");
    const data_URL = "http://localhost:3000/products/";
    buttons.forEach((buttons) => {
      buttons.addEventListener("click", async function (e) {
        e.preventDefault();
        const question = confirm("Are you sure delete ? ");

        if (question) {
          const { id } = this.dataset;
          await axios.delete(data_URL + id);
          await reRender(ListProduct, "#dataTable");
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

export default ListOrder;
