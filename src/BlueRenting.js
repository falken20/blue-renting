import { LitElement, html, css } from 'lit-element';
import { openWcLogo } from './open-wc-logo.js';
import './bluerenting-header/bluerenting-header'
import './bluerenting-menu/bluerenting-menu'
import './bluerenting-sidebar/bluerenting-sidebar'
import './bluerenting-main/bluerenting-main'
import './bluerenting-footer/bluerenting-footer'

export class BlueRenting extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    };
  }

  static get styles() {
    return css`
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
      <main>

          <bluerenting-header></bluerenting-header>
          <bluerenting-menu @show-admin-coches="${this.showAdminCoches}" @hide-admin-coches="${this.hideAdminCoches}"></bluerenting-menu>
          <div class="row">
              <bluerenting-sidebar class="col-2"></bluerenting-sidebar>
              <bluerenting-main class="col-10"></bluerenting-main>
          </div>
          <bluerenting-footer></bluerenting-footer>

      </main>
    `;
  }

  showAdminCoches() {
    console.log("showAdminCoches en BlueRenting")
    this.shadowRoot.querySelector("bluerenting-main").showAdminCoches = true
  }

  hideAdminCoches() {
    console.log("hideAdminCoches en BlueRenting")
    this.shadowRoot.querySelector("bluerenting-main").showAdminCoches = false
  }

}
