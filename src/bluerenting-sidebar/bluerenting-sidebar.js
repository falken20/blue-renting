import { LitElement, html } from 'lit-element';

class BluerentingSidebar extends LitElement {

    static get properties() {
        return {
        }
    }

    constructor() {
        super()

        this.title = 'Blue Renting';
    }

    render() {
        return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        <h1>Sidebar</h1>
        `;
    }       


}

customElements.define('bluerenting-sidebar', BluerentingSidebar);
