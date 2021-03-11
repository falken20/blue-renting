import { LitElement, html } from 'lit-element';
import '../bluerenting-ficha-compra/bluerenting-ficha-compra'
import { apiVehicles } from '../api';


class BluerentingSidebar extends LitElement {

    static get properties() {
        return {
            coches: {type: Object}
        }
    }

    constructor() {
        super()

        this.coches = []
        this.getCestaCompra()
    }

    render() {
        return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        <h4>Cesta Compra</h4>
        <div class="col" id="cestaList">
            <div class="col col-rows-1 col-rows-sm-4">
            ${this.coches.map(
                coche => html`
                    <bluerenting-ficha-compra 
                        name="${coche.name}"
                        price="${coche.price}"
                        imageUrl="${coche.imageUrl}"
                        @delete-item=""
                        @info-item=""
                    >
                    </bluerenting-ficha-compra>`
            )} 
            </div>
        </div>
       `;
    }       

    getCestaCompra() {
        console.log("GetCestaCompra")
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log(xhr.responseText)
                let APIResponse = JSON.parse(xhr.responseText);

                // El campo que nos interesa de esa api se llama results
                //this.coches = APIResponse.results
                this.coches = APIResponse
                console.log(this.coches)
            }
        }

        // open no envia la petición, es como una especia de init
        xhr.open("GET", apiVehicles);
        // Hacemos la petición
        xhr.send();
    }
}

customElements.define('bluerenting-sidebar', BluerentingSidebar);
