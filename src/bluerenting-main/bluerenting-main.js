import { LitElement, html } from 'lit-element';
import { apiVehicles } from '../api';
import '../bluerenting-admin-coches/bluerenting-admin-coches'

class BluerentingMain extends LitElement {

    static get properties() {
        return {
            coches: {type: Array},

            showAdminCoches: {type: Boolean}
        }
    }

    constructor() {
        super()

        this.coches = [];
        this.showAdminCoches = false;
    }

    render() {
        return html`
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
            <h1>Main Page</h1>
            <div class="row">
                <h1>Coches: ${this.coches}</h1>
            </div>
            <div class="row">
                <bluerenting-admin-coches class="d-none" id="bluerentingAdminCoches"></bluerenting-admin-coches>
            </div>
        `;
    }       

    updated(changedProperties) {
        console.log("updated en bluerenting-main")

        if (changedProperties.has("showAdminCoches")) {
            console.log("Valor de showAdminCoches: " + this.showAdminCoches)
            if (this.showAdminCoches === true) {
                this.shadowRoot.getElementById("bluerentingAdminCoches").classList.remove("d-none")
            } else {
                this.shadowRoot.getElementById("bluerentingAdminCoches").classList.add("d-none")
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

                //this.coches = APIResponse.results
                this.coches = xhr.responseText
            }
        }

        xhr.open("GET", apiVehicles);
        xhr.send();

    }

}

customElements.define('bluerenting-main', BluerentingMain);
