import { LitElement, html , css} from 'lit-element';
import { apiVehicles } from '../api';

class BluerentingCocheEdit extends LitElement {

    static get properties() {
        return {
            id: {type: String},
            name: {type: String},
            model: {type: String},
            price: {type: String},
            imageUrl: {type: String},
        }
    }

    constructor() {
        super()
    }

    render() {
        return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
            <th scope="row">
                <button class="btn btn-danger" @click="${this.deleteCoche}"><strong>Delete</strong></button>
                <button class="btn btn-success" @click="${this.updateCoche}"><strong>Update</strong></button>
            </th>
            <!-- <td>${this.id}</td> -->
            <td><img src="${this.imageUrl}" height=50 width=50</td>
            <td><b>Model: </b>${this.name}</td>
            <td><b>Precio: </b>${this.price} €</td>`;
    }   

    updateCoche() {
        console.log("updateCoche")
        console.log(this.id)
        this.dispatchEvent(new CustomEvent("update-coche", {
            "detail": {
                id: this.id,
                name: this.name,
                model: this.model,
                price: this.price,
                imageUrl: this.imageUrl,
            }
        }));
    }

    deleteCoche(e) {
        console.log("deleteCoche")
        e.preventDefault()

        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log(xhr.responseText)
                console.log("Se ha borrado correctamente el vehículo")
                this.dispatchEvent(new CustomEvent("lista-change", {}));
            }
        }

        xhr.open("DELETE", apiVehicles + "/" + this.id);
        xhr.send();

    }

}

customElements.define('bluerenting-coche-edit', BluerentingCocheEdit);