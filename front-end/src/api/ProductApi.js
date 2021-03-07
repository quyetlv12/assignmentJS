import { axiosClient } from './axiosClient';

const ProductApi = {
    getAll(){
        const url = `/products`;
        return axiosClient.get(url);
    },
    getAllCate(){
        const url = `/category`;
        return axiosClient.get(url);
    },
    getAllContact(){
        const url = `/contact`;
        return axiosClient.get(url);
    },
    getAllAccount(){
        const url = `/account`;
        return axiosClient.get(url);
    },
    getAllNews(){
        const url = `/news`;
        return axiosClient.get(url);
    },
    getCate(id){
        const url = `/category/${id}`;
        return axiosClient.get(url);
    },
    get(id){
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
    getNews(id){
        const url = `/news/${id}`;
        return axiosClient.get(url);
    },
    getAllUser(){
        const url = `/account`;
        return axiosClient.get(url);
    },
    getAccount(username,password){
        const  url  =  `/account?username=${username}&password=${password}`;
        return axiosClient.get(url);
        
    },
    checkHashAccount(username){
        const  url  =  `/account?username=${username}`;
        return axiosClient.get(url);
    },
    Paginate(_pages,_limit){
        const  url  =  `/products?_page=${_pages}&_limit=${_limit}`;
        return axiosClient.get(url);
    },
    getAllOrder(){
        const url = `/cart`;
        return axiosClient.get(url);
    }
    

}
export default ProductApi;