import { LitElement, html, css } from 'lit';

export class ProductCard extends LitElement {
  static properties = {
    imageUrl: { type: String, attribute: 'image-url' },
    backgroundColor: { type: String, attribute: 'background-color' },
    fontColor: { type: String, attribute: 'font-color' },
    discount: { type: Number },
    price: { type: Number },
    title: { type: String }
  };

  constructor() {
    super();
    this.imageUrl = '';
    this.backgroundColor = '#fff';
    this.fontColor = '#000';
    this.discount = 0;
    this.price = 0;
    this.title = '';
  }

  static styles = css`
    .product-container {
      position: relative;
      border: 1px solid #ccc;
      width: 400px;
      height: 500px;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
      background-color: var(--background-color, #fff);
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
      color: var(--font-color, #000);
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
      color: var(--font-color, #000);
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

  render() {
    const priceLabel = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(this.price);
    const finalPrice = this.price - (this.price * this.discount / 100);

    return html`
      <div class="product-container" style="background-color: ${this.backgroundColor}">
        <div class="product-image-container">
          <img src="${this.imageUrl}" alt="Product Image" class="product-image">
          <div class="product-rating-container" style="background-color: ${this.backgroundColor}">
            <span class="product-rating">5 ⭐️</span>
          </div>
        </div>
        <div class="product-info">
          <h2 class="product-title" style="color: ${this.fontColor}">
            ${this.title}
          </h2>
          <div class="product-price-container">
            <span class="product-price" style="${this.discount > 0 ? 'text-decoration: line-through; text-decoration-color: #ff4d4f;' : ''}">
              ${priceLabel}
            </span>
            <div class="product-discount-container">
              ${this.discount > 0 ? html`<span class="product-discount">${this.discount}% OFF</span>` : ''}
            </div>
          </div>
          <div class="product-final-price-container" style="color: ${this.fontColor}">
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
