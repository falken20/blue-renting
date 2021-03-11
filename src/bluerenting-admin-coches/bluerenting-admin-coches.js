import { LitElement, html , css} from 'lit-element';
import { apiVehicles } from '../api';
import '../bluerenting-coche-edit/bluerenting-coche-edit'

class BluerentingAdminCoches extends LitElement {

    static get properties() {
        return {
            coches: {type: Object},
            altaCoche: {type: Boolean},
            id_temp: {type: Number},
        }
    }

    constructor() {
        super()

        this.coches = []
        this.altaCoche = true
        this.id_temp = 0
        this.getCoches()
    }

    render() {
        return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        <div class="d-grid gap-2">
            <button class="btn btn-danger btn-lg" type="button" disabled>Mantenimiento Vehículos</button>
        </div>
        <div>
            <form id="formEdicion" class="d-none">
            <div class="row">
                <div class="col-4">
                    <input type="text" class="form-control" id="nameForm" placeholder="Name">
                    <input type="text" class="form-control" id="modelForm" placeholder="Model">
                    <input type="number" class="form-control" id="priceForm" placeholder="Price (€)">
                    <input type="text" class="form-control" id="imageUrlForm" placeholder="url imagen">
                </div>
                <div class="col-4 d-grid gap-2 md-block">
                    <button class="btn btn-primary col-3" type="button" @click=${this.saveCoche}>Save</button>
                    <button class="btn btn-primary col-3" type="button" @click=${this.cancelEdicion}>Cancel</button>
                </div>
            </div>
            </form>
        </div>
        
        <div class="d-grid col-4">
            <button class="btn btn-primary" type="button" @click="${this.showAltaCoche}"><span class="glyphicon glyphicon-align-left"></span>
            Alta Vehículo</button>
        </div>
        <table class="table table-striped">
            <thead>
                <tr>

                </tr>
            </thead>
            <tbody>
                ${this.coches.map(
                    coche => html`
                    <tr>
                    <bluerenting-coche-edit
                        id="${coche.id}"
                        imageUrl="${coche.imageUrl}"
                        name="${coche.name}"
                        model="${coche.model}"
                        price="${coche.price}"
                        @update-coche="${this.showUpdateCoche}"
                        @lista-change="${this.updateLista}"
                    >
                    </bluerenting-coche-edit>
                    </tr>` 
                    )}
            </tbody>
        </table>

        `;
    }   

    getCoches() {
        console.log("getCoches")
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

    showUpdateCoche(e) {
        console.log("showUpdateCoche")
        this.altaCoche = false
        this.id_temp = e.detail.id
        console.log("Vamos a editar el coche " + e.detail.id + "-" + e.detail.name)
        this.shadowRoot.getElementById("formEdicion").classList.remove("d-none")
        this.shadowRoot.getElementById("nameForm").value = e.detail.name
        this.shadowRoot.getElementById("modelForm").value = e.detail.model
        this.shadowRoot.getElementById("priceForm").value = e.detail.price
        this.shadowRoot.getElementById("imageUrlForm").value = e.detail.imageUrl
    }

    showAltaCoche(e) {
        console.log("showAltaCoche")
        this.altaCoche = true
        this.id_temp = Math.floor(Math.random() * (1000 - 1)) + 1;
        this.shadowRoot.getElementById("formEdicion").classList.remove("d-none")
        this.shadowRoot.getElementById("nameForm").value = ""
        this.shadowRoot.getElementById("modelForm").value = ""
        this.shadowRoot.getElementById("priceForm").value = ""
        this.shadowRoot.getElementById("imageUrlForm").value = ""
    }

    cancelEdicion(e) {
        console.log("cancelEdicion")
        e.preventDefault()
        this.id_temp = 0
        this.shadowRoot.getElementById("formEdicion").classList.add("d-none")
        this.shadowRoot.getElementById("nameForm").value = ""
        this.shadowRoot.getElementById("modelForm").value = ""
        this.shadowRoot.getElementById("priceForm").value = ""
        this.shadowRoot.getElementById("imageUrlForm").value = ""
    }

    saveCoche(e) {
        console.log("saveCoche")
        e.preventDefault()
        this.shadowRoot.getElementById("formEdicion").classList.add("d-none")

        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if ((xhr.status === 201) || (xhr.status === 200)) {
                console.log(xhr.responseText)
                console.log("Se ha guardado correctamente el vehículo")
                this.getCoches()
            }
        }

        if (this.altaCoche) {
            console.log("Save alta")
            xhr.open("POST", apiVehicles);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
            console.log(this.createJSON())
            xhr.send(JSON.stringify(this.createJSON()));
        } else {
            console.log("Save update")
            xhr.open("PUT", apiVehicles);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            console.log(this.createJSON())
            xhr.send(JSON.stringify(this.createJSON()));
        }

    }

    createJSON(id) {
        let name = this.shadowRoot.getElementById("nameForm").value
        let model = this.shadowRoot.getElementById("modelForm").value
        let price = this.shadowRoot.getElementById("priceForm").value
        let imageUrl = this.shadowRoot.getElementById("imageUrlForm").value

        let jsonCoche = {
            "id": this.id_temp,
            "imageUrl": imageUrl,
            "model": model,
            "name": name,
            "price": price
        }

        return jsonCoche
    }

    updateLista(e) {
        console.log("updateLista")
        this.getCoches()
    }

}

customElements.define('bluerenting-admin-coches', BluerentingAdminCoches);