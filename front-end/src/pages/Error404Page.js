export default class Error404Page {
    static render() {
        return /* html*/`
        <head>
    <title>404</title></head>
        <div class="container">
        <div class="d-flex justify-content-center">
        <button class="btn btn-danger"> <a class="text-white mb-10" href="http://localhost:6868/">BACK TO HOME</a></button>
        </div>
        <div class="d-flex justify-content-center">
       <img src="https://freefrontend.com/assets/img/html-css-404-page-templates/HTML-404-Page-with-SVG.gif" alt="">
        </div>
        
        </div>
        `
    }
    afterRender(){
    
    }
}