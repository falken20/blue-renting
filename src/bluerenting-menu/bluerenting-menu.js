import { LitElement, html , css} from 'lit-element';

class BluerentingMenu extends LitElement {

    static get properties() {
        return {
        }
    }

    constructor() {
        super()

        this.title = 'Blue Renting';
    }

    static get styles() {
        return css`
            .navbar-custom { 
                background-color: #060A4B; 
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
                        <a class="nav-link" href="/" target="_blank">Opcion</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/" target="_blank">Opcion</a>
                    </li>
                </ul>
            </div>
        </nav>
        `;
    }       


}

customElements.define('bluerenting-menu', BluerentingMenu);
