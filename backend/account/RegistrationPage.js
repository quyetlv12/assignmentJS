import { $ } from "../../front-end/src/utils";
import axios from "axios";
import firebase from "../firebase";
import ProductApi from "../../front-end/src/api/ProductApi";
import SearchBox from "../../front-end/src/pages/component/SearchBox";
import { checkEmail, checkNumberPhone } from "../validation";
const RegistrationPage = {
  render() {
    // if (localStorage.getItem("username") != null) {
    //   alert(
    //     "Bạn đang đăng nhập tài khoản , vui lòng đăng xuất để đăng kí tài khoản"
    //   );
    //   window.location.hash = "/";
    //   return false;
    // }
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
  <div class="col-md-12">
    <label for="inputEmail4" class="form-label text-white">Username</label>
    <input type="email" class="form-control" id="form-registration-username" placeholder="Your name">
  </div>
  <div class="col-md-12">
    <label for="inputPassword4" class="form-label text-white">Password</label>
    <input type="password" class="form-control" id="form-registration-password" placeholder="Your password">
  </div>
  <div class="col-md-12">
  <label for="inputPassword4" class="form-label text-white">Enter the password</label>
  <input type="password" class="form-control" id="form-registration-re-password" placeholder="Your password">
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label text-white">Email</label>
    <input type="text" class="form-control" id="form-registration-email" placeholder="your email">
  </div>
  <div class="col-12">
  </div>
  <div class="col-12 mb-5">
    <button type="submit" id="btn-registration" class="btn btn-success w-100">Sign Up</button>
    <div class="d-flex justify-content-center mt-4">
    <p class="text-white">Bạn đã có tài khoản <a href="http://localhost:6868/#/login">Đăng nhập ngay !</a></p>
    </div>
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
      const re_password = $("#form-registration-re-password").value;
      console.log(password);
      console.log(re_password);
      //start check input trống
      if (username == "" ||  (password == "") || (email == "")) {
        $(".err-signup").innerHTML = "Vui lòng nhập thông tin tài khoản";
        return false;
      }
      //start check email
      if (!checkEmail(email.value)) {
        email.style.border = "1px solid red";
        $(".err-signup").innerHTML = "Vui lòng nhập đúng định dạng email";
        return false;
      }
      if (password != re_password) {
        $(".err-signup").innerHTML = "Mật khẩu không trùng khớp";
        return false;
      } else {
        const product = {
          name: $("#form-registration-username").value,
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
        await axios(method_SEVER, product)
          .then(() => {
            $(".err-signup").innerHTML = "Đăng kí thành công";
            setTimeout(() => {
              window.location.hash = "/login";
            }, 3000);
          })
          .catch(function (error) {
            if (error.response) {
              $(".err-signup").innerHTML = error.response.data.error;
            }
          });
      }
    });
    return `${await SearchBox.afterRender()}`;
  },
};

export default RegistrationPage;
