import { $ } from "../../front-end/src/utils";
import axios from "axios";
import firebase from "../firebase";
import ProductApi from "../../front-end/src/api/ProductApi";
import SearchBox from "../../front-end/src/pages/component/SearchBox";
import { checkEmail, checkNumberPhone } from "../validation";
const RegistrationPage = {
  render() {
    if (localStorage.getItem("username") != null) {
      alert(
        "Bạn đang đăng nhập tài khoản , vui lòng đăng xuất để đăng kí tài khoản"
      );
      window.location.hash = "/";
      return false;
    }
    return /*html*/ `
    <head>
    <title>Đăng kí</title>
    </head>
   
   
        <div class="container">
        <form class="row g-3 form-registration mb-3">
        <div class="text-center">
        <h1 class="sign-up-title text-white">SIGN UP</h1>
        </div>
        <div class='text-center '>
        <span class="err-signup text-danger"></span>
        </div>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label text-white">Username</label>
    <input type="email" class="form-control" id="form-registration-username" placeholder="Your name">
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label text-white">Password</label>
    <input type="password" class="form-control" id="form-registration-password" placeholder="Your password">
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label text-white">Email</label>
    <input type="text" class="form-control" id="form-registration-email" placeholder="your email">
  </div>
  <div class="col-12">
    <label for="inputAddress2" class="form-label text-white">Image</label>
    <input type="file" class="form-control" id="form-registration-image">
  </div>
  <div class="col-12">
  </div>
  <div class="col-12 mb-5">
    <button type="submit" id="btn-registration" class="btn btn-success w-100">Sign Up</button>
  </div>
</form>
        </div>
        `;
  },
  async afterRender() {
    $("#btn-registration").addEventListener("click", async function (e) {
      e.preventDefault();
      //start lấy dữ liệu form
      const username = $("#form-registration-username").value;
      const image = $("#form-registration-image").value;
      const password = $("#form-registration-password").value;
      const email = $("#form-registration-email");
      const numberphone = $("#form-registration-numberphone");
      // const { data } = await ProductApi.checkHashAccount(username);
      const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      //start check input trống
      if (
        username == "" ||
        image == "" ||
        (password == "") | (email == "")
      ) {
        $(".err-signup").innerHTML = "Vui lòng nhập thông tin tài khoản";
        return false;
      }
      //start check email
      if (!checkEmail(email.value)) {
        email.style.border = "1px solid red";
        $(".err-signup").innerHTML = "Vui lòng nhập đúng định dạng email";
        return false;
      }
      //start check number phone
      // if (!checkNumberPhone(numberphone.value) || numberphone.value <= 10) {
      //   $(".err-signup").innerHTML = "Số điện thoại yêu cầu bằng số và 10 số";
      //   return false;
      // }
      //start check tài khoản đã tồn tại hay chưa
      const usersImage = $("#form-registration-image").files[0];
        let storageRef = firebase.storage().ref(`users/${usersImage.name}`);
        storageRef.put(usersImage).then(function () {
          storageRef.getDownloadURL().then(async (url) => {
            const product = {
              name: $("#form-registration-username").value,
              image: url,
              password: $("#form-registration-password").value,
              email: $("#form-registration-email").value,
              role: 1,
            };
            const data_URL = "http://localhost:6767/api/signup";
            const method_SEVER = {
              method: "POST",
              headers: { "content-type": "application/json" },
              data: JSON.stringify(product),
              url: data_URL,
            };
            axios(method_SEVER, product);
            $(".err-signup").innerHTML = "Đăng kí thành công";
          });
        });
      // if (data.length === 0) {
        
      // } else {
      //   $(".err-signup").innerHTML = "Tài khoản đã tồn tại";
      //   return false;
      // }
    });
    return `${await SearchBox.afterRender()}`;
  },
};

export default RegistrationPage;
