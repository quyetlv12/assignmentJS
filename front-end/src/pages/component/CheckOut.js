
const CheckOut = {
    render() {
        let priceTotal = [];
        priceTotal = JSON.parse(localStorage.getItem("products"));
        let sumTotal = (accumulator, currentValue) => {
            return accumulator + +currentValue.price;
          };
        return `
        <h2>Total : ${priceTotal.reduce(sumTotal,0)}</h2>
        `
    },
    afterRender(){

    }
}

export default CheckOut;