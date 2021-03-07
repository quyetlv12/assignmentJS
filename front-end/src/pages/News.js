import ProductApi from "../api/ProductApi.js";
import Header from "./component/header.js";
const News = {
  async render() {
    const { data: news } = await ProductApi.getAllNews();
    return /*html*/ `
    <head>
    <title>Tin tức</title></head>
    <div class="container">
      <ul> <div class="card-group">
      <div class="row mt-2">
      <h2>Tin tức nổi bật</h2>
                      ${news
        .map(
          (news) => /*html*/ `
                          <div class="mb-3" style="max-width: 540px;">
                          <div class="row g-0">
                            <div class="col-md-4">
                              <a href="/#/news/${news.id}"><img src="${news.image}" class="img-fluid" alt="..."></a>
                            </div>
                            <div class="col-md-8">
                              <div class="card-body">
                                <a href="/#/news/${news.id}"><h5 class="card-title-new">${news.title}</h5></a>
                                <p class="card-text text-news-content">${news.content}</p>
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      
                         
                      `
        )
        .join("")}
                        </div>
                        </div>
                 </ul>
    </div>`;
  },
  async afterRender() {
    return `${await Header.afterRender()}`
  }
};
export default News;
