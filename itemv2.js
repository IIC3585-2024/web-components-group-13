
const template = document.createElement('template')
template.innerHTML = `
    <style>
        .item {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            padding: 10px;
        }
        .row {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
        .title {
            font-size: 1.5em;

        }
        .rounded-box {
            display: inline-block;
            padding: 20px;
            border: 2px solid #ccc;
            border-radius: 15px;
            background-color: #f9f9f9;
            text-align: center;
        }
    </style>
    <div class="item">
        <div class="row">
            <img src="" alt="">
        </div>
        <div class="row title">
           <span id="title-content"></span>
        </div>
        <slot></slot>
        <button>Buy</button>
    </div>
`

class SellItem extends HTMLElement {
    
    constructor() {
        super()

        // Shadow DOM   
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.append(template.content.cloneNode(true))

        this.img = shadow.querySelector('img')
    }

    static get observedAttributes() {
        return ['src']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue)
        if (name === 'src') {this.img.src = newValue}
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