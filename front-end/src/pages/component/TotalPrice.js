const TotalPrice = {
    render(){
        let products = [];
        products = JSON.parse(localStorage.getItem("products"));
        const reducer = (accumulator, currentValue) => {
            return accumulator + +currentValue.price;
          };
        return `
        <div>
        <h1>Tổng số tiền :${products.reduce(reducer,0)}</h1>
        </div>
        `
    },
    afterRender(){

    }
}
export default TotalPrice;