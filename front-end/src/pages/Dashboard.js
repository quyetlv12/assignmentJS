import ProductApi from "../api/ProductApi.js";
import CountProduct from "./component/CountProduct.js";
import Header from "./component/header.js";
import ListProduct from "./component/ListProduct.js";
const Dashboard = {
  async render() {
    // if (localStorage.getItem("username")  == null) {
    //   window.location.hash = "/login";
    //   return false;
    // }
    // if (localStorage.getItem("role") == 1) {
    //   window.location.hash = "/404";
    //   return false;
    // }
    const { data: product } = await ProductApi.getAll();
    const { id, name } = product;
    const { data: cate } = await ProductApi.getAllCate();
    const reducer = (accumulator, currentValue) => {
      return accumulator + +currentValue.quantity;
    };
    const reducer_cate = (accumulator, currentValue) => {
      return accumulator + +currentValue.cateID;
    };
    return /*html*/ `
    <head>
    <title>Quản lý sản phẩm</title></head>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading">Core</div>
                        <a class="nav-link" href="http://localhost:6868/#/dashboard">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            Product
                        </a>
                        <a class="nav-link" href="http://localhost:6868/#/dashboardnew">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            News
                        </a>
                        <a class="nav-link" href="http://localhost:6868/#/dashboardcate">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            Category
                        </a>
                        <a class="nav-link" href="http://localhost:6868/#/dashboarduser">
                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                        User
                    </a>
                        <a class="nav-link" href="http://localhost:6868/#/dashboardcontact">
                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                        Contact
                    </a>
                    </a>
                        <a class="nav-link" href="http://localhost:6868/#/dashboardorder">
                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                        Order
                    </a>
                        <div class="sb-sidenav-menu-heading">Interface</div>
                        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                            Layouts
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="layout-static.html">Static Navigation</a>
                                <a class="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                            </nav>
                        </div>
                        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                            <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                            Pages
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="collapsePages" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                    Authentication
                                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                                <div class="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                                    <nav class="sb-sidenav-menu-nested nav">
                                        <a class="nav-link" href="login.html">Login</a>
                                        <a class="nav-link" href="register.html">Register</a>
                                        <a class="nav-link" href="password.html">Forgot Password</a>
                                    </nav>
                                </div>
                                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                    Error
                                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                                <div class="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                                    <nav class="sb-sidenav-menu-nested nav">
                                        <a class="nav-link" href="401.html">401 Page</a>
                                        <a class="nav-link" href="404.html">404 Page</a>
                                        <a class="nav-link" href="500.html">500 Page</a>
                                    </nav>
                                </div>
                            </nav>
                        </div>
                        <div class="sb-sidenav-menu-heading">Addons</div>
                        <a class="nav-link" href="charts.html">
                            <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                            Charts
                        </a>
                        <a class="nav-link" href="tables.html">
                            <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                            Tables
                        </a>
                    </div>
                </div>
               
            </nav>
        </div>
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid">
                    <h1 class="mt-4">Dashboard</h1>
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingOne">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne"> <i class="fab fa-product-hunt"></i> &nbsp
                            THÊM SẢN PHẨM
                          </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                          <div class="accordion-body">
                          <form action="" id="form-reload">
                          <div class="row g-3">
                      <div class="col">
                        <input type="text" class="form-control" id="form-add-id" disabled placeholder="Auto ID" aria-label="First name">
                      </div>
                      <div class="col">
                        <input type="text" class="form-control" id="form-add-name" placeholder="NAME" aria-label="Last name">
                      </div>
                      <div class="col">
                        <input type="file" class="form-control" id="form-add-image">
                      </div>
                      <div class="col">
                        <input type="text" class="form-control" id="form-add-price" placeholder="PRICE" aria-label="Last name">
                      </div>
                      <div class="col">
                      <select class="form-select" id="form-add-status" aria-label="Default select example">
                      <option selected>Chọn trạng thái</option>
                      <option value="true">Đã bán</option>
                      <option value="false">Chưa bán</option>
                    </select>
                      </div>
                      <div class="col">
                      <select class="form-select" id="form-add-cateid" aria-label="Default select example">
                      <option selected>Chọn danh mục</option>
                      ${cate.map((cate) => {
                        return `<option value="${cate._id}">${cate.name}</option>`;
                      })}
                    </select>
                      </div>
                      <div class="col">
                        <input type="text" class="form-control" id="form-add-quantity" placeholder="QUANTITY" aria-label="Last name">
                      </div>
                      <div class="row mt-2">
                      <div class="col-12">
                      <div class="form-floating">
                      <textarea class="form-control" id="form-add-description" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                      <label for="floatingTextarea2">DESCRIPTION</label>
                    </div>
                      </div>
                      </div>
                    </div>
                    <div class="row mt-3">
                    <button class="btn btn-primary" type="button" id="add-product"><i class="fas fa-plus-square"></i> THÊM SẢN PHẨM</button></div>
                          </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Dashboard</li>
                    </ol>
                    ${await CountProduct.render()}
                    <div class="row">
                    <div class="input-group mb-3">
                  <input type="text" id="search-table" class="form-control" placeholder="Search...">
                  </div>
                  <div>
                  </div>
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table mr-1"></i>
                            DataTable Example
                        </div>
                       
                        <div class="card-body" id="list-products">
                            <div class="table-responsive">
                            <div id="dataList">
                            ${await ListProduct.render()}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Copyright &copy; Your Website 2020</div>
                        <div>
                            <a href="#">Privacy Policy</a>
                            &middot;
                            <a href="#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>`;
  },
  async afterRender() {
    //start gọi phương thức afterRender
    return `${await ListProduct.afterRender()}
    ${await Header.afterRender()}
    `;
  },
};
export default Dashboard;
