function getPrice(price) {
  // let precio = parseInt(price, 10);
  // console.log(precio.toLocaleString('es-ES'))
  try {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } catch {
    return 0;
  }
}

function getNormalPrice(price, discount) {
  const priceN = Number(price);
  const disountN = Number(discount);
  let normalPrice = priceN / (1 - (disountN / 100));
  return normalPrice.toFixed(0)
}

class SellItem extends HTMLElement {
    
    constructor() {
        super()

        // Shadow DOM   
        const shadow = this.attachShadow({ mode: 'open' })


        const template = document.createElement('div')
        template.style.width = '100%';
        // template.style.maxWidth = '500px';
        template.innerHTML = `
            <style>
                hr {
                    border: 0;
                    width: 100%;
                    height: 1px;
                    background: #ACADB6;
                }
                .image {
                  height: 300px;
                }
                .subcaja {
                  height: 55%;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                }
                img {
                  height: 80%;
                }
                .item {
                    display: flex;
                    flex-direction: column;
                    padding: 10px;
                    font-family: Arial, sans-serif;
                    border: 2px solid #ACADB6;
                    border-radius: 5%;
                }
                .row {
                    display: flex;
                    width: 100%;
                }
                .flex-center {
                    justify-content: center;
                }
                .flex-between {
                    justify-content: space-between;
                }
                .title {
                    font-size: 1.3em;
                }
                .price {
                  margin-top: 5%;
                }
                h4#title {
                    margin: 0;
                    font-weight: 50;
                    color: #b0b0ab;
                }
                h3#price {
                    margin: 0;
                    color: #1e9cde;
                }
                .rounded-box {
                    display: flex;
                    align-items: center;
                    padding: 1%;
                    border-radius: 5px;
                    background-color: #c31757;
                    text-align: center;
                    color: white;
                    font-weight: 500;
                }
                .normal {
                    color: #6d6d64;
                    font-size: 14px;
                }
                .star {
                    position: relative;
                    
                    display: inline-block;
                    width: 0;
                    height: 0;
                    
                    margin-left: .9em;
                    margin-right: .9em;
                    margin-bottom: 1.2em;
                    
                    border-right:  .3em solid transparent;
                    border-bottom: .7em  solid #FC0;
                    border-left:   .3em solid transparent;

                    /* Controlls the size of the stars. */
                    font-size: 8px;
                    
                    &:before, &:after {
                        content: '';
                        
                        display: block;
                        width: 0;
                        height: 0;
                        
                        position: absolute;
                        top: .6em;
                        left: -1em;
                      
                        border-right:  1em solid transparent;
                        border-bottom: .7em  solid #FC0;
                        border-left:   1em solid transparent;
                      
                        transform: rotate(-35deg);
                    }
                    &:after {  
                        transform: rotate(35deg);
                    }
                }
                .rating {
                    margin: 5% 0 2% 0;
                    display: flex;
                    align-items: center;
                    font-size: 12px;
                }
            </style>
            <div class="item">
                <div class="row flex-center image">
                    <img src="${this.getAttribute('src') ? this.getAttribute('src') : ''}" alt="" id="image">
                </div>
                <hr>
                <div class="subcaja">
                  <div class="row title">
                      <h4 id="title">${this.getAttribute('title') || ''}</h4>
                  </div>
                  <div class="row price flex-between">
                      <h3 id="price">$${getPrice(this.getAttribute('price')) || 0}</h3>
                      <div class="rounded-box" id="discount">
                        -${this.getAttribute('discount') || 0}%
                      </div>
                  </div>
                  <div class="normal">
                      Normal: <s id="normal">$${getPrice(getNormalPrice(this.getAttribute('price'), this.getAttribute('discount')))  || 0}</s>
                  </div>
                  <div class="row rating">
                    <i class="star"></i>
                    <div id="rating">${getPrice(this.getAttribute('rating')) || 0}</div>
                  </div>
                  <div class ="row flex-center">
                      <slot></slot>
                  </div>
                </div>
            </div>
        `

        shadow.append(template)

        this.img = shadow.querySelector('#image')
        this.titleH3 = shadow.querySelector('#title')
        this.price = shadow.querySelector('#price')
        this.discount = shadow.querySelector('#discount')
        this.normal = shadow.querySelector('#normal')
        this.rating = shadow.querySelector('#rating')
    }

    static get observedAttributes() {
        return ['src', 'title', 'price', 'discount', 'rating']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue)
        console.log(this.titleH3)
        if (name === 'src') this.img.src = newValue
        else if (name === 'title') this.titleH3.innerText = newValue
        else if (name === 'price') {
          const discountPrice = getNormalPrice(this.getAttribute('price'), this.getAttribute('discount')) || '0'
          this.price.innerText = `$${getPrice(newValue)}`
          this.normal.innerText = `$${getPrice(discountPrice)}`
        }
        else if (name === 'discount') this.discount.innerText =  `-${newValue || 0}%`
        else if (name === 'rating') this.rating.innerText = newValue

    }

        //this.innerHTML = "holi"
        /*
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
            .item {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #ccc;
            }
        </style>
        <div class="item">
            <slot></slot>
            <button>Buy</button>
        </div>
        `;*/
    
}

customElements.define('sell-item', SellItem)