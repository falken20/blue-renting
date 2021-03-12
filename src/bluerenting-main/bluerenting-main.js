import { LitElement, html } from 'lit-element';
import { apiVehicles } from '../api';
import '../bluerenting-admin-coches/bluerenting-admin-coches'
import '../bluerenting-ficha/bluerenting-ficha.js'
import '../bluerenting-sidebar/bluerenting-sidebar.js'
import '../bluerenting-pedidos/bluerenting-pedidos'


class BluerentingMain extends LitElement {

    static get properties() {
        return {
            coches: {type: Array},
            showAdminCoches: {type: Boolean},
            showPedidos: {type: Boolean},
            //coches: {type: Object},
            cesta: {type: Array}
        };
    }


    constructor() {
        super();

        this.coches = [];
        this.showAdminCoches = false;
        this.getCoches();
        this.cesta = [];
        
    }

    render() {
        return html`
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
            <div class="row" id="cochesList">
                <div class="d-grid gap-2">
                    <button class="btn btn-outline-primary btn-lg" type="button" disabled>Listado de vehículos disponibles</button>
                </div>
                <div class="row row-cols-1 row-cols-sm-4"> 
                    ${this.coches.map(
                        coche => html`
                        <bluerenting-ficha 
                            id="${coche.id}"
                            name="${coche.name}"
                            model="${coche.model}"
                            imageUrl="${coche.imageUrl}"
                            price="${coche.price}"
                            @add-coche ="${this.addCoche}"
                        >
                        </bluerenting-ficha>
                        `
                    )}
                </div>    
            </div>
            <div class="row">
                <bluerenting-admin-coches class="d-none" id="bluerentingAdminCoches"></bluerenting-admin-coches>
            </div>
            <div class="row">
                <bluerenting-pedidos class="d-none" id="bluerentingPedidos"></bluerenting-pedidos>
            </div>            
        `;
    }      


    addCoche(e){
        console.log("add coche en main");
        console.log(e);
        console.log("Estamos en main. recibimos para add  " + e.detail.id + " " + e.detail.name +  " " +e.detail.price);

        this.cesta = [...this.cesta, e.detail];
        console.log(this.cesta);

        this.dispatchEvent(
            new CustomEvent("add-cesta", {
                "detail" : {
                    "id" : e.detail.id,
                    "name" : e.detail.name,
                    "price": e.detail.price,
                    "imageUrl": e.detail.imageUrl
                }

            })
        )

    }

    updated(changedProperties) {
        console.log("updated en bluerenting-main")

        if (changedProperties.has("showAdminCoches") || changedProperties.has("showPedidos")) {
            console.log("Valor de showAdminCoches: " + this.showAdminCoches)
            console.log("Valor de showPedidos: " + this.showPedidos)
            if (this.showAdminCoches === true) {
                this.shadowRoot.getElementById("bluerentingAdminCoches").classList.remove("d-none")
                this.shadowRoot.getElementById("cochesList").classList.add("d-none")
                this.shadowRoot.getElementById("bluerentingPedidos").classList.add("d-none")
            } else if (this.showPedidos === true) { 
                this.shadowRoot.getElementById("bluerentingPedidos").classList.remove("d-none")
                this.shadowRoot.getElementById("bluerentingAdminCoches").classList.add("d-none")
                this.shadowRoot.getElementById("cochesList").classList.add("d-none")
                this.shadowRoot.getElementById("bluerentingPedidos").updateLista = !this.shadowRoot.getElementById("bluerentingPedidos").updateLista
            } else {
                this.shadowRoot.getElementById("bluerentingPedidos").classList.add("d-none")
                this.shadowRoot.getElementById("bluerentingAdminCoches").classList.add("d-none")
                this.shadowRoot.getElementById("cochesList").classList.remove("d-none")                
            }
        }
    }

    getCoches() {
        console.log("Get Coches")
        let xhr = new XMLHttpRequest();

        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log(xhr.responseText)
                let APIResponse = JSON.parse(xhr.responseText);

                // El campo que nos interesa de esa api se llama results
                this.coches = APIResponse
                console.log("coches devueltos")
                console.log(APIResponse)
            }
        }

        // open no envia la petición, es como una especia de init
        xhr.open("GET", apiVehicles);
        // Hacemos la petición
        xhr.send();
        console.log("fin de getcoches");

    }

}

customElements.define('bluerenting-main', BluerentingMain);
