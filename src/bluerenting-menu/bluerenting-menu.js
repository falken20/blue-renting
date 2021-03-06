import { LitElement, html , css} from 'lit-element';

class BluerentingMenu extends LitElement {

    static get properties() {
        return {
        }
    }

    constructor() {
        super()

    }

    static get styles() {
        return css`
            .navbar-custom { 
                background-color: #0f1741; 
            }
        `;
      }

    render() {
        return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        <nav class="navbar navbar-expand-lg navbar-dark navbar-custom">
            <a class="navbar-brand" href="/">Blue Renting</a>

            <div class="collapse navbar-collapse" id="navbar-bluerenting">
                <ul class="navbar-nav mr-auto">
                   <li class="nav-item">
                        <button class="btn btn-light" @click="${this.showFichas}">Comprar</button>
                    </li>
                    <li> | </li>
                    <li class="nav-item">
                        <button class="btn btn-light" @click="${this.showPedidos}">Pedidos</button>
                    </li>
                    <li> | </li>
                    <li class="nav-item">
                        <button class="btn btn-light" @click="${this.showAdminCoches}">Admin</button>
                    </li>
                </ul>
            </div>
        </nav>
        `;
    }       

    showAdminCoches() {
        console.log("Click en Admin menu")
        this.dispatchEvent(new CustomEvent("show-admin-coches", {}))
    }
    
    showFichas() {
        console.log("Click en Admin menu")
        this.dispatchEvent(new CustomEvent("show-fichas", {}))
    }

    showPedidos() {
        console.log("Click en Admin menu")
        this.dispatchEvent(new CustomEvent("show-pedidos", {}))
    }

}

customElements.define('bluerenting-menu', BluerentingMenu);
