// import { data } from "./data.js";
import axios from 'axios';
import ProductApi from '../api/ProductApi.js';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

class Products {
 async listProduct () {
    const {data } = await ProductApi.getAll();
    const result = data
      .map(({ id, name, price, image, status, quantity }, index) => {
       
        return `<tr class="details-products">
            <td>${index}</td>
            <td>${name}</td>
            <td><img src="${image}" width="200"/></td>
            <td>${price}</td>
            <td>${status}</td>
            <td>${quantity}</td>
            <td><button data-id="${id}" data-name="${name}" data-price="${price}" data-image =${image} data-status=${status} data-quantity="${quantity}" class="btn btn-danger btn-detail" data-toggle="modal" data-target="#myModal">Detail product</button>
            <button data-id="${id}" data-name="${name}" data-price="${price}" data-image =${image} class="btn btn-primary btn-remove">Remove product</button>
            <button data-id="${id}" data-name="${name}" data-price="${price}" data-image =${image} class="btn btn-primary btn-edit">Edit product</button>
            <div id="show-modal"></div>
            </td>
            </tr>`;
      })
      .join("");
    $("#products").innerHTML = result;
  }
  removeProducts(id) {
     const tr = $$(".details-products");
     tr.forEach((tr) => {
       tr.addEventListener("click", function () {
         tr.remove();
       });
     });

    
  data.splice(id ,1);
  console.log(data);
  
  }
  editProducts(id){
    console.log("em đang edit sản phẩm" , id);
  }
  detailProducts(id, name, image, status, price ,quantity) {
    const showJH = `<!-- The Modal -->
    <div class="modal" id="myModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
        
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">${name}</h4>
            <button type="button" class="close btn btn-primary" data-dismiss="modal">&times;</button>
            
          </div>
          
          <!-- Modal body -->
          <div class="modal-body">
          <div class="row">
          <div class="col-4">
            <img src="${image}" class="img-fluid"/>
           
          </div>
          <div class="col-8">
         <h4>Giá sản phẩm :${price}</h4>
         <h4>Giá sản phẩm :${status}</h4>
         <h4>Số lượng sản phẩn : ${quantity}</h4>
        </div>
         
        
          </div>
            
          </div>
          
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
          
        </div>
      </div>
    </div>`;
    $("#show-modal").innerHTML = showJH;
  }
  getButton() {
    const buttons = $$(".btn");
    let _this = this;
    buttons.forEach((buttons) => {
      buttons.addEventListener("click", function () {
        const { id, name, image, status, price ,quantity } = this.dataset;
        if (this.classList.contains("btn-detail")) {
          _this.detailProducts(id, name, image, status, price, quantity);
        } else if (this.classList.contains("btn-remove")) {
          _this.removeProducts(id, name, image, status, price ,quantity);
        }
        else if (this.classList.contains("btn-edit")) {
          _this.editProducts(id, name, image, status, price ,quantity);
        }
      });
    });
  }
  
}





window.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  products.listProduct();
  products.getButton();

});


$('#form-add').addEventListener('submit',(e)=>{
  e.preventDefault();
 const product = {
   id : $('#product-id').value,
   name : $('#product-name').value,
   image : $('#product-image').value,
   price : $('#product-price').value

 }
 axios.post('http://localhost:3000/products',product)
})
