import { LitElement, html, css } from 'lit-element';
import { openWcLogo } from '../open-wc-logo.js';

class BluerentingFooter extends LitElement {

    static get properties() {
        return {
        }
    }

    constructor() {
        super()

    }

    static get styles() {
        return css`
            div { 
                margin-top: 10px !important;
                height: 100px !important;
            }
            .divfooter {
                background-color: #0f1741;
            }
        `;
    }

    render() {
        return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        <div class="row divfooter">
            <div class="row align-items-end">
                <div class="col align-self-left" align="right">
                    <button class="btn btn-light disabled btn-lg">@BlueRenting 2021</button>
                </div>
                <div class="col align-self-right" align="right">
                    <small style="color: white;">Powered by Mª Angeles, Edu, Tino, Jose y Richi</small>
                </div>
            </div>
        </div>
        `;
    }       


}

customElements.define('bluerenting-footer', BluerentingFooter);
