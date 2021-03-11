import { LitElement, html } from 'lit-element';
import '../bluerenting-ficha/bluerenting-ficha.js'
import '../bluerenting-sidebar/bluerenting-sidebar.js'

class BluerentingMain extends LitElement {

    static get properties() {
        return {
            coches: {type: Object},
            cesta: {type: Array}
        };
    }

    /*constructor() {
        super()

        this.coches = [
            {
                id: "76565675",
                name: "Volkswagen",
                model: "touran 2.0 TDI",
                price: 122,
                imageUrl: {
                    src: "./img/touran.jfif",
                    alt: "prueba coche"
                }
            } ,
            {
                id: "99",
                name: "Decathlon",
                model: "Rockrider perro flauta",
                price: 12,
                imageUrl: {
                    src: "./img/rock.jfif",
                    alt: "prueba coche"
                }
            }
        ];
        
    }*/

    constructor() {
        super();

        this.coches = [];
        this.getCoches();
        this.cesta = [];
        
    }
    
    /*render() {
        return html`
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
            <h1>Main Page</h1>
            <h1>Coches: ${this.coches}</h1>


        `;
    }*/

    render() {
        return html`
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
            <h1>Listado de vehículos disponibles</h1>
            <div class="row" id="cochesList">
                <div class="row row-cols-1 row-cols-sm-4"> 
                    ${this.coches.map(
                        coche => html`
                        <bluerenting-ficha 
                            id="${coche.id}"
                            name="${coche.name}"
                            model="${coche.model}"
                            imageUrl="${coche.imageUrl}"
                            price="${coche.price}"
                            @add-coche ="${this.addCoche}"
                        >
                        </bluerenting-ficha>
                        `
                    )}
                </div>    
            </div>
            
        `;
    }      


    addCoche(e){
        console.log("add coche en main");
        console.log(e);
        console.log("Estamos en main. recibimos para add  " + e.detail.id + " " + e.detail.name +  " " +e.detail.price);

        this.cesta = [...this.cesta, e.detail];
        console.log(this.cesta);

        this.dispatchEvent(
            new CustomEvent("add-cesta", {
                "detail" : {
                    "id" : e.detail.id,
                    "name" : e.detail.name,
                    "price": e.detail.price,
                    "imageUrl": e.detail.imageUrl
                }

            })
        )

    }

    getCoches() {
        console.log("Get Coches");
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
                this.coches = APIResponse
                console.log("coches devueltos")
                console.log(APIResponse)
            }
        }

        // open no envia la petición, es como una especia de init
        xhr.open("GET", "https://bluerenting-dluj3qlvta-oa.a.run.app/api/v2/vehicles");
        // Hacemos la petición
        xhr.send();
        console.log("fin de getcoches");

    }

}

customElements.define('bluerenting-main', BluerentingMain);
