import { LitElement, html } from 'lit-element';
import '../api'

class BluerentingFichaCompra extends LitElement {

    static get properties() {
        return {
            name: {type: String},
            model: {type: String},
            price: {type: Number},
            imageUrl: {type: String},
        }
    }

    constructor() {
        super()

    }

    render() {
        return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        <div class="card h-100">
            <img src="${this.imageUrl}" height="100" width="100">
            <div class="card-body">
                <p class="card-title">${this.name}</p>
                <p class="card-text">${this.price} €</p>
            </div>
            <div class="card-footer">
                <button class="btn btn-danger col-5" @click="${this.deletePerson}"><strong>X</strong></button>
                <button class="btn btn-info col-5" @click="${this.moreInfo}" offset-1><strong>U</strong></button>
            </div>
        </div>
        `;
    }       


}

customElements.define('bluerenting-ficha-compra', BluerentingFichaCompra);