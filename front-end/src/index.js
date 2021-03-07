import HomePages from './pages/HomePage.js';
import ProductDetailPage from './pages/ProductsDetail.js';
import Error404Page from './pages/Error404Page.js';
import { parseRequestUrl,$} from './utils.js'
import ProductsPage from './pages/ProductsPage.js';
import Dashboard from './pages/Dashboard.js';
import DashboardUser from './pages/DashboardUser.js';
import DashboardContact from './pages/DashboardContact.js';
import Header from './pages/component/header.js'
import UpdateProduct from './pages/UpdateProduct.js';
import footer from './pages/component/footer.js';
import Category from './pages/Category.js';
import News from './pages/News.js';
import NewsDetail from './pages/NewsDetail.js';
import UpdateNews from './pages/UpdateNews.js';
import DashboardNews from './pages/DashboardNews.js';
import Contact from './pages/contact.js';
import About from './pages/About.js';
import DashboardCate from './pages/DashboardCate.js';
import UpdateCate from './pages/UpdateCate.js';
import Login from '../../backend/account/Login.js';
import RegistrationPage from '../../backend/account/registrationPage.js';
import ProductsPagi from './pages/ProductsPagi.js';
import DashboardOrder from './pages/DashboardOrder.js';
import ProfileAccount from './pages/ProfileAccount.js';
import CartProduct from './pages/component/CartProduct.js';

const routes = {
    '/': HomePages,
    '/products': ProductsPage,
    '/products/:id': ProductDetailPage,
    '/dashboard' : Dashboard,
    '/dashboardnew' : DashboardNews,
    '/dashboardcate' : DashboardCate,
    '/dashboardorder' : DashboardOrder,
    '/category/:id' : Category,
    '/update/:id' : UpdateProduct,
    '/cart' : CartProduct,
    '/news' : News,
    '/contact' : Contact,
    '/about' : About,
    '/product/:id' : ProductsPagi,
    '/updatenews/:id' : UpdateNews,
    '/updatecate/:id' : UpdateCate,
    '/news/:id' : NewsDetail,
    '/login' : Login,
    '/registration' : RegistrationPage,
    '/dashboarduser' : DashboardUser,
    '/dashboardcontact' : DashboardContact,
    '/info' : ProfileAccount,
    '/404' : Error404Page,
 }

const router = async () => {
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '');

    console.log(routes[parseUrl]);

    const page = routes[parseUrl] ? routes[parseUrl] : Error404Page;
    const main = $('#main-content');
    main.innerHTML = await page.render();
    $('#header').innerHTML = await Header.render();
    $('#footer').innerHTML = await footer.render();
    await page.afterRender();
}

window.addEventListener('DOMContentLoaded',router);
window.addEventListener('hashchange', router)