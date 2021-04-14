import { axiosClient } from './axiosClient';

const ProductApi = {
    getAll(){
        const url = `/products`;
        return axiosClient.get(url);
    },
    getAllCate(){
        const url = `/categories`;
        return axiosClient.get(url);
    },
    getAllContact(){
        const url = `/contact`;
        return axiosClient.get(url);
    },
    getAllAccount(){
        const url = `/users`;
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
    getAccount(email,password){
        const  url  =  `/signin?_email=${email}&_password=${password}`;
        return axiosClient.get(url);
    },
    checkHashAccount(username){
        const  url  =  `/users?username=${username}`;
        return axiosClient.get(url);
    },
    Paginate(_pages,_limit){
        const  url  =  `/products?page=${_pages}&limit=${_limit}`;
        return axiosClient.get(url);
    },
    getAllOrder(){
        const url = `/cart`;
        return axiosClient.get(url);
    },
    update(id,data){
        const url = `/products/${id}`;
        return axiosClient.put(url,data,{
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    },
    getInfo(id){
        const url  = `/users/${id}`
        return axiosClient.get(url,{
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }
}
export default ProductApi;