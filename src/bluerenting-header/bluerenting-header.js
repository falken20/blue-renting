import { LitElement, html } from 'lit-element';
import { openWcLogo } from '../open-wc-logo.js';

class BluerentingHeader extends LitElement {

    static get properties() {
        return {
        }
    }

    constructor() {
        super()

        this.title = 'Blue Renting';
        this.imgsrc = '../img/bluerenting.png';
    }

    render() {
        return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">

        <div class="row">
            <div class="col-4"><img src="${this.imgsrc}" height="150"></img></div>
            <h1 class="col-8">${this.title}</h1>
        </div>
        `;
    }       


}

customElements.define('bluerenting-header', BluerentingHeader);
