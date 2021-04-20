import Header from "./component/header";
import ProductApi from "../api/ProductApi"
import axios from "axios";
import {$} from '../utils';

const Contact = {
    render(){
        return /*html*/`
        <head>
    <title>Liên hệ</title></head>
        <div class="container contact-form bg-primary">
        <div class="contact-image">
            <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact"/>
        </div>
        <form>
            <h3 class="text-white">Drop Us a Message</h3>
           <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <input type="text" name="txtName" 
                        id="contact-name"   
                        class="form-control" placeholder="Your Name *" value="" />
                    </div>
                    <div class="form-group ">
                        <input type="text" name="txtName" 
                        id="contact-id"   
                        class="form-control  d-none" disable placeholder="Your Name *" value="" />
                    </div>
                    <div class="form-group">
                        <input type="text" name="txtEmail" 
                        id="contact-email"
                        class="form-control" placeholder="Your Email *" value="" />
                    </div>
                    <div class="form-group">
                        <input type="text" name="txtPhone" class="form-control"
                        id="contact-number-phone"
                        placeholder="Your Phone Number *" value="" />
                    </div>
                    <div class="form-group">
                        <button class="btn btn-danger" id="btn-submit-contact">Submit</button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <textarea name="txtMsg" class="form-control" placeholder="Your Message *" 
                        id="contact-content"
                        style="width: 100%; height: 150px;"></textarea>
                    </div>
                </div>
            </div>
        </form>
</div>`
    },
    async afterRender() {
        //start gửi form lên db
        document
          .querySelector("#btn-submit-contact")
          .addEventListener("click", function (e) {
            e.preventDefault()
            const $ = document.querySelector.bind(document);
            const contact = {
            id : $("#contact-id").value , 
              name: $("#contact-name").value,
              email: $("#contact-email").value,
              numberphone: $("#contact-number-phone").value,
              message: $("#contact-content").value,
            };
            const id = localStorage.getItem("id")
            const data_URL = `http://localhost:6767/api/contact/${id}`;
            const method_SEVER = {
              method: "POST",
              headers: { "content-type": "application/json",'Authorization': 'Bearer ' + localStorage.getItem('token')},
              data: JSON.stringify(contact),
              url: data_URL,
            };
            alert("Gửi liên hệ thành công");
            axios(method_SEVER, contact)
            
          });
        return `${await Header.afterRender()}`
      }
    
}
export default Contact;