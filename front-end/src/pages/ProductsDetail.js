import ProductApi from "../api/ProductApi";
import { parseRequestUrl } from "../utils";

const ProductDetail = {
  async render() {
    const { id } = parseRequestUrl();
    const { data: product } = await ProductApi.get(id);

    return `
        <div class="row">
        <div class="col-4">
        <img src="${product.image}
        " width="350"class="img-fluid"/>
        </div>
        <div class="col-8">
        
        <h1>
        ${product.name}
    </h1>
    <h2>
        ${product.price}
    </h2>
    <h3>
        ${product.status}
    </h3>
    <p>${product.description}</p>
    </div>
</div>
            `;
  },
};

export default ProductDetail;
