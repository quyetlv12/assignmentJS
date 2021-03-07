import HomePages from './pages/HomePage.js';
import ProductDetailPage from './pages/ProductsDetail.js';
import Error404Page from './pages/Error404Page.js';
import { parseRequestUrl } from './utils.js'
import ProductsPage from './pages/ProductsPage.js';


const $ = selector =>{
    let element = document.querySelectorAll(selector);
    return element.length == 1 ? element[0] : [...element];

}
const routes = {
    '/': HomePages,
    '/products': ProductsPage,
    '/products/:id': ProductDetailPage
}

const router = async () => {
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '');

    console.log(routes[parseUrl]);

    const page = routes[parseUrl] ? routes[parseUrl] : Error404Page;

    const main = $('#main-content');
    main.innerHTML = await page.render();
}




window.addEventListener('DOMContentLoaded',router);
window.addEventListener('hashchange', router)