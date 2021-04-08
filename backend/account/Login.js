import ProductApi from "../../front-end/src/api/ProductApi";
import { $ } from "../../front-end/src/utils";
import axios from "axios";
import SearchBox from "../../front-end/src/pages/component/SearchBox";

const Login = {
  async render() {
    return /*html*/ `
    <head>
    <title>Login</title>
    </head>
    <div class="container mb-5">
    <div class="row form-login ">
    <div class="text-center">
      <h2 class="title-login text-white">LOGIN</h2>
    </div>
    <div class ='text-danger text-center'>
    <span class="errorLogin"></span>
    </div>

    <div class="col-12">
    <form>
      <div class="container">
        <div class="mb-3">
          <label for="" class="form-label text-white">User name</label>
          <input type="text" class="form-control" id="form-login-email">
        
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label text-white">Password</label>
          <input type="password" class="form-control" id="form-login-password">
        </div>
        
        <div class="">
        <button type="submit" class="btn btn-primary mb-3 w-100" id="btn-login">Sign In</button></div>
        <div class="text-center">
        <a href="http://localhost:6868/#/registration">Bạn chưa có tài khoản ?</a>
        </div>
        <div>
        <div class="row text-center mt-3 mb-3">
        <div class="col-4">
        <i class="fab fa-facebook fs-1 text-primary"></i>
        </div>
        <div class="col-4">
        <i class="fab fa-google-plus fs-1 text-danger"></i>
              </div>
        <div class="col-4">
        <i class="fab fa-instagram-square fs-1 text-warning"></i></div>
        </div>
        </div>
      </div>
        </form>
    </div>
    </div>
      
    </div>
      `;
  },
  async afterRender() {
    $("#btn-login").addEventListener("click", async function (e) {
      e.preventDefault();
      const email = $("#form-login-email").value;
      const password = $("#form-login-password").value;
      //start valite đăng nhập 

      if(email == "" || password == ""){
        $(".errorLogin").innerHTML =
          "Vui lòng nhập thông tin tài khoản"
          return false;
      }
      const { data } = await ProductApi.getAccount(email, password);
      if (data.length === 0)
        return ($(".errorLogin").innerHTML =
          "Thông tin tài khoản hoặc mật khẩu không chính xác");
      else {
        data.map(({ _id, name,image, email, role , token}) => {
          (window.location.hash = "/"),
          localStorage.setItem("username", name);
          localStorage.setItem("email", email);
          localStorage.setItem("role", role);
          localStorage.setItem("image", image);
          localStorage.setItem("token", token);
          if (role == 0) {
            $("#dashboard-link").classList.add("show");
          } else {
            $("#dashboard-link").classList.add("hide");
          }
        });
      }
    });
    return `${await SearchBox.afterRender()}`;
  },
};
export default Login;
