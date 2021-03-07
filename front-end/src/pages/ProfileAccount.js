import ProductApi from "../api/ProductApi";
import { $ } from "../utils";
import axios from 'axios';
import firebase from 'firebase';
import SearchBox from "./component/SearchBox";
import Header from "./component/header";

const ProfileAccount = {
  async render() {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if(username == null){
      alert("vui lòng đăng nhập");
      window.location.hash = '/';
    }
    const { data: account } = await ProductApi.getAccount(username, password);
    const showAccount = account.map((account) => {
      return /*html*/ `
         <form action="" class="mb-4">
         <div class="d-flex justify-content-center">
         <img src="${account.image}" alt="" width="200" class="border border-primary     rounded-circle  border-5  ">
        
         <input type="text" id="account-image-old" value="${account.image}" class=d-none>
         </div>
         <div class="d-flex justify-content-center mb-2 mt-2"><input type="file" id="account-image-update"></div>
         <input type="text" id="account-name" class="form-control" disabled value="${account.username}">
         <input type="password" id="account-password" class="form-control mt-2" disabled value="${account.password}">
         <input type="text" id="account-numberphone" class="form-control mt-2" disabled value="${account.numberphone}">
         <input type="text" id="account-role" class="form-control mt-2" disabled value="${account.role == 0 ?"Quản trị " : "Khách hàng"}">
         <button class="btn btn-primary w-100 mt-2" id="btn-update-account">Update</button>
         </form>
         `;
    });
    return /*html*/ `
        <title>Thông tin tài khoản</title>
        <div class="container">
       ${showAccount}
        </div>
        `;
  },
 async afterRender() {
    $("#btn-update-account").addEventListener("click",async (e) => {
      e.preventDefault();
      const usernameForm = $("#account-name");
      const passwordForm = $("#account-password");
      const numberphoneForm = $("#account-numberphone");
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");
      const id = localStorage.getItem('id');
      if (usernameForm.disabled == true) {
        usernameForm.disabled = false;
        passwordForm.disabled = false;
        numberphoneForm.disabled = false;
        $("#btn-update-account").innerHTML = `Save`;
        return false
      }else{
        usernameForm.disabled = true;
        passwordForm.disabled = true;
        numberphoneForm.disabled = true;
        $("#btn-update-account").innerHTML = `Update`;
         if ($("#account-image-update").value == "") {
          const data = {
            id: localStorage.getItem("id"),
            username: usernameForm.value,
            image: $('#account-image-old').value,
            password : passwordForm.value,
            numberphone : numberphoneForm.value,
            role : $('#account-role').value
          };
          const data_URL = "http://localhost:3000/account/";
          localStorage.setItem("username" , usernameForm.value);
          localStorage.setItem("password" , passwordForm.value);
          localStorage.setItem("numberphone" , numberphoneForm.value);
          axios.put(data_URL + id, data);
          alert("Update thành công");
        }
        else{
          const productImage = $("#account-image-update").files[0];
          let storageRef = firebase.storage().ref(`users/${productImage.name}`);
          storageRef.put(productImage).then(function () {
            storageRef.getDownloadURL().then((url) => {
              const data = {
                username : usernameForm.value,
                image :url,
                password : passwordForm.value,
                numberphone : numberphoneForm.value,
              };
              const data_URL = "http://localhost:3000/account/";
              axios.put(data_URL + id, data);
              alert("Update thành công");
             
            });
          });
        }
      }
    });
    return `${await SearchBox.afterRender()}${await Header.afterRender()}`;
  },
};

export default ProfileAccount;
