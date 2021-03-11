import { LitElement, html } from 'lit-element';

import '../bluerenting-ficha/bluerenting-ficha.js'
import '../bluerenting-cesta/bluerenting-cesta.js'

class BluerentingSidebar extends LitElement {

    static get properties() {
        return {
            cesta: {type: Array},
            id: {type: String},
            name: {type: String},
            price: {type: String}
        }
    }

    constructor() {
        super()

        this.cesta = [];
    
    }

    render() {
        return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        <h2>Cesta</h2>
        <div class="row" id="cochesList">
                <div class="row row-cols-1 row-cols-sm-1"> 
                    ${this.cesta.map(
                        coche => html`
                        <bluerenting-cesta
                            name="${coche.name}"
                            price="${coche.price}"
                            imageUrl="${coche.imageUrl}"
                            @delete-coche="${this.deleteCoche}"
                        >
                        </bluerenting-cesta>
                        `
                    )}
                </div>    
            </div>
        `;
    }       

    updated(changeProperties) {
        console.log("updated en persona-app")

        if (changeProperties.has("id")) {
            console.log("Ha cambiado el valor de la propiedad id: " + this.id + this.name + this.price)
            
            this.cesta = [...this.cesta, 
                {
                    name: this.name,
                    price: this.price,
                    imageUrl: this.imageUrl
                }
            ];
            
        }
    }
    

    deleteCoche(e){
        console.log("delete coche en sidebar");
        console.log(e);
        console.log("Estamos en sidebar. borramos  " + e.detail.id + " " + e.detail.name +  " " +e.detail.price);

        this.cesta = this.cesta.filter(
            coche => coche.name != e.detail.name
        );

    }
    

}

customElements.define('bluerenting-sidebar', BluerentingSidebar);
