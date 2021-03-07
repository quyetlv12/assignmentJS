import ProductApi from "../../api/ProductApi.js";
import {reRender} from "../../utils.js"
import axios from 'axios'
const ListNews = {
 async  render(){
        const {data : news} = await ProductApi.getAllNews();
        return `
        <table class="table table-bordered" id="dataTableNew" width="100%" cellspacing="0">
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>IMAGE</th>
                <th>Content</th>
                <th>ACTION</th>
            </tr>
        </thead>
        <tbody id="list-newss">
        ${news
          .map((news) => {
            return `<tr>
            <td>${news.id}</td>
            <td>${news.title}</td>
            <td><img src="${news.image} "width="200"/></td>
         
            <td>${news.content}</td>
            <td class="p-4 action-product">
            
            <div class="row">
              <a href="#/news/${news.id}"> <button class="btn btn-primary"><div class="">
                <i class="fas fa-info-circle"></i>
              </div> Detail</button></a>
            </div>
             
            <div class="row mt-2">
              <div class="">
                <button class="btn btn-warning btn-remove text-white" id="btn-remove-product" data-id="${news.id}"><div class="">
                  <i class="fas fa-trash-alt"></i>
                </div> Remove</button>
              </div>
            </div>
             <div class="row mt-2">
               <a href="#/updatenews/${news.id}"> <button class="btn btn-primary"><div class="">
                 <i class="fas fa-edit"></i>
               </div> Update</button></a>
             </div>
           </td>
            </tr>`;
          })
          .join("")}
        </tbody>
        
       
    </table>
        `
    },
    async afterRender() {
        document
          .querySelector("#btn-add-new")
          .addEventListener("click", function (e) {
            e.preventDefault()
            const $ = document.querySelector.bind(document);
            const news = {
              id: $("#form-new-id").value,
              title: $("#form-new-title").value,
              image: $("#form-new-image").value,
              content: $("#form-new-content").value,
            };
            const data_URL = "http://localhost:3000/news";
            const method_SEVER = {
              method: "POST",
              headers: { "content-type": "application/json" },
              data: JSON.stringify(news),
              url: data_URL,
            };
            axios(method_SEVER, news);
            reRender(ListNews, "#dataTableNew");
            
          });
        const buttons = document.querySelectorAll(".btn-remove");
        const data_URL = "http://localhost:3000/news/";
        buttons.forEach((buttons) => {
          buttons.addEventListener("click", function () {
              const question = confirm("Are you sure delete ? ")
              if(question){
                const { id } = this.dataset;
                axios.delete(data_URL + id);
                reRender(ListNews, "#dataTableNew");
              }
            
            
            
          });
        });
      },
}
export default ListNews;