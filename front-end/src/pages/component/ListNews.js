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
          .map((news,index) => {
            return `<tr>
            <td>${index + 1}</td>
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
                <button class="btn btn-warning btn-remove text-white" id="btn-remove-product" data-id="${news._id}"><div class="">
                  <i class="fas fa-trash-alt"></i>
                </div> Remove</button>
              </div>
            </div>
             <div class="row mt-2">
               <a href="#/updatenews/${news._id}"> <button class="btn btn-primary"><div class="">
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
          .addEventListener("click",async function (e) {
            e.preventDefault()
            const $ = document.querySelector.bind(document);
            const userId = localStorage.getItem("id")
            const news = {
              title: $("#form-new-title").value,
              image: $("#form-new-image").value,
              content: $("#form-new-content").value,
            };
            const data_URL = "http://localhost:6767/api/news/";
            const method_SEVER = {
              method: "POST",
              headers: { "content-type": "application/json" ,'Authorization': 'Bearer ' + localStorage.getItem('token') },
              data: JSON.stringify(news),
              url: data_URL + userId,
            };
            await axios(method_SEVER, news);
            alert("Thêm bài viết thành công !")
            await reRender(ListNews, "#dataTableNew");
            
          });
        const buttons = document.querySelectorAll(".btn-remove");
       
        buttons.forEach((buttons) => {
          buttons.addEventListener("click", async function () {
              const question = confirm("Are you sure delete ? ")
              if(question){
                const { id } = this.dataset;
                const userId = localStorage.getItem("id")
                const data_URL = `http://localhost:6767/api/news/${id}/${userId}`;
               await axios.delete(data_URL,{
                  headers: { "content-type": "application/json" ,'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
               await reRender(ListNews, "#dataTableNew");
              }
            
            
            
          });
        });
      },
}
export default ListNews;