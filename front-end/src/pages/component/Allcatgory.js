import ProductApi from "../../api/ProductApi";

const Allcatgory = {
  async render() {
    const { data: cate } = await ProductApi.getAllCate();
    const show = cate
      .map((cate) => {
        return /*html*/ `
            <div class="col-4 text-center mt-3 p-5">
            <a href="/#/category/${cate._id}">
            <div class="image">
            <i class="fas fa-headphones fs-1 text-white p-3 border border-primary rounded-circle" style="background-color:#343a40 "></i>
            </div>
            <div class="name">
            ${cate.name}
            </div>
            </a>
            
            </div>`;
      })
      .join("");
    return show;
  },
};

export default Allcatgory;
