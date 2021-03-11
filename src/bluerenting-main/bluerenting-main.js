import { LitElement, html } from 'lit-element';

class BluerentingMain extends LitElement {

    static get properties() {
        return {
            coches: {type: Array},
        }
    }

    constructor() {
        super()

        this.coches = [];
        this.getCoches()
    }

    render() {
        return html`
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
            <h1>Main Page</h1>
            <h1>Coches: ${this.coches}</h1>


        `;
    }       

    getCoches() {
        console.log("Get Coches")
        // Usamos AJAX
        let xhr = new XMLHttpRequest();

        // onload signifcica que se ha lanzado la petición y ha llegado, en este caso lo que estoy haciendo es 
        // cuando se finaliza la petición se ejecuta la función anonima ()
        // Funcion anonima que no tiene nombre, por eso se pone () nada más, podria ser ... = hola() => {...}
        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log(xhr.responseText)
                let APIResponse = JSON.parse(xhr.responseText);

                // El campo que nos interesa de esa api se llama results
                this.coches = APIResponse.results
                console.log(APIResponse)
            }
        }

        // open no envia la petición, es como una especia de init
        xhr.open("GET", "https://dev-bluerenting-dluj3qlvta-oa.a.run.app/api/v2/vehicles");
        // Hacemos la petición
        xhr.send();

    }

}

customElements.define('bluerenting-main', BluerentingMain);
