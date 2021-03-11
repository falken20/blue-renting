import { LitElement, html } from 'lit-element';
import { openWcLogo } from '../open-wc-logo.js';

class BluerentingFooter extends LitElement {

    static get properties() {
        return {
        }
    }

    constructor() {
        super()

    }

    render() {
        return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        <h4>@BlueRenting 2021</h4>
        `;
    }       


}

customElements.define('bluerenting-footer', BluerentingFooter);
