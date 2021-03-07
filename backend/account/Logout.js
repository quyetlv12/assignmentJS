import { $ } from "../../front-end/src/utils";

const Logout = {
   async render(){
        return `<button class="btn btn-primary" id="btn-logout">
        <i class="fas fa-sign-out-alt"></i>
        </button>`
    },
   async afterRender(){
        $('#btn-logout').addEventListener('click',function(){
            console.log("show hello");
        })

    }
}
export default Logout;