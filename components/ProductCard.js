export class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {

    const imageUrl = this.getAttribute('image-url');
    const backgroundColor = this.getAttribute('background-color');
    const fontColor = this.getAttribute('font-color');
    const discount = this.getAttribute('discount');
    const price = this.getAttribute('price');
    const priceLabel = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
    const finalPrice = price - (price * discount / 100);

    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      <div class="product-container" style="background-color: ${backgroundColor}">
        <div class="product-image-container">
          <img src="${imageUrl}" alt="Product Image" class="product-image">
          <div class="product-rating-container" style="background-color: ${backgroundColor}">
            <span class="product-rating">5 ⭐️</span>
          </div>
        </div>
        <div class="product-info">
          <h2 class="product-title" style="color: ${fontColor}">
           Camiseta Real Madrid 2021/2022
          </h2>
          <div class="product-price-container">
            <span class="product-price" style="${discount > 0 ? 'text-decoration: line-through; text-decoration-color: #ff4d4f;' : ''}">
              ${priceLabel}
            </span>
            <div class="product-discount-container">
              ${discount > 0 ? '<span class="product-discount">' + discount + '% OFF</span>' : ''}
            </div>
          </div>
          <div class="product-final-price-container" style="color: ${fontColor}">
            <span class="product-final-price">
              ${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(finalPrice)}
            </span>
          </div>
        </div>
        <div class="product-slot">
          <slot name="button"></slot>
        </div>
      </div>
    `;
  }
}

const css = `
  .product-container {
    position: relative;
    border: 1px solid #ccc;
    width: 400px;
    height: 500px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    background-color: #fff;
  }

  .product-image-container {
    position: relative;
    width: 100%;
    height: 65%;
  }

  .product-image {
    width: 100%;
    height: 100%;
    border-top-radius: 4px;
  }

  .product-info {
    width: 100%;
    height: 35%;
    display: flex;
    flex-direction: column;
  }

  .product-title {
    font-size: 1.5rem;
    font-weight: bold;
    padding: 8px;
    margin: 2%;
  }

  .product-price-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 25%;
  }

  .product-discount {
    display: inline-block;
    color: #fff;
    font-weight: bold;
    padding: 4px;
    font-size: 1.25rem;
  }

  .product-discount-container {
    height: 100%;
    background-color: #ff4d4f;
    display: flex;
    border-radius: 4px;
    margin-left: 2%;
    justify-content: center;
    align-items: center;
  }

  .product-price {
    font-size: 2.25rem;
    font-weight: bold;
    color: #333;
    background-color: #f8f9fa;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding-left: 8px;
    padding-right: 8px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product-final-price-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 25%;
    margin-top: 2%;
  }

  .product-final-price {
    font-size: 2.25rem;
    font-weight: bold;
    color: #333;
    background-color: #f8f9fa;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding-left: 8px;
    padding-right: 8px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product-rating-container {
    position: absolute;
    font-size: 1.5rem;
    bottom: 10%;
    right: 0%;
    color: #fff;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    padding-left: 5%;
    padding-right: 5%;
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  .product-slot {
    position: absolute;
    bottom: 5%;
    right: 5%;
  }
`;