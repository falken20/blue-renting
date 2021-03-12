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
        <div align="right">
            <div class="row">
                <button class="btn btn-outline-danger btn-lg" type="button" disabled>Cesta</button>
            </div>
            <div class="row" style="margin: 0 auto;" id="cochesList">
                        ${this.cesta.map(
                            coche => html`
                            <bluerenting-cesta
                                name="${coche.name}"
                                price="${coche.price}"
                                imageUrl="${coche.imageUrl}"
                                cantidad="${coche.cantidad}"
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
        console.log("updated en bluerenting-sidebar")

        if (changeProperties.has("id")) {
            console.log("Ha cambiado el valor de la propiedad id: " + this.id + "-" + this.name + "-" + this.price)
            
            
            /*
            this.cesta = [...this.cesta, 
                {
                    name: this.name,
                    price: this.price,
                    imageUrl: this.imageUrl
                }
            ];
            */ 

            let indexOfCoche = this.cesta.findIndex(
                coche => coche.id === this.id
            );

            if (indexOfCoche !== -1) {
                console.log("Encontrado coche a modificar en cesta")
                this.cesta[indexOfCoche].cantidad += 1
            } else {
                console.log("NO encontrado coche a modificar en cesta")
                this.cesta = [...this.cesta, 
                    {
                        id: this.id,
                        name: this.name,
                        price: this.price,
                        imageUrl: this.imageUrl,
                        cantidad: 1
                    }
                ];               
            }
            
            console.log(this.cesta)
            
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
