import ProductApi from "../api/ProductApi";
import { parseRequestUrl } from "../utils";
import Header from "./component/header";
import Top10News from './component/Top5News.js';
const NewsDetail = {
        async render() {
        const { id } = parseRequestUrl();
        const { data: news } = await ProductApi.getNews(id);
        return /*html*/`
        <head>
        <title>${news.title}</title></head>
            <div class="container">
              <div class="row">
              <div class="col-9">
              <h1>
              ${news.title}
          </h1>
              <img src="${news.image}" class="img-fluid w-100"/>
              <p>${news.content}</p>
              </div>
              <div class="col-3">
              <h4 class="text-danger">BÀI VIẾT ĐỀ XUẤT</h4>
              ${await Top10News.render()}
          </div>
      </div>
            </div>
                `;
      }
      ,
   async afterRender(){
        return `${await Header.afterRender()}`

    
    }
}
export default NewsDetail;