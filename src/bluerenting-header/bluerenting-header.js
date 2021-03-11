import { LitElement, html , css } from 'lit-element';
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
        this.imgbackground = '../img/header.png';
    }

    static get styles() {
        return css`
            .divheader {
                background-color: #060A4B;
            }
        `;
    }

    render() {
        return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">

        <div class="row" class="divheader">
            <div class="col-4"><img src="${this.imgsrc}" height="150"></img></div>
            <div class="col-8"><img src="${this.imgbackground}" height="150" with="1000"></img></div>
        </div>
        `;
    }       


}

customElements.define('bluerenting-header', BluerentingHeader);
