import { LitElement, html } from 'lit-element';

class BluerentingFicha extends LitElement {

    static get properties() {
        return {
            id: {type: String},
            name: {type: String},
            model: {type: String},
            price: {type: Number},
            imageUrl: {type: String}
        };
    }

    constructor() {
        super()
    }

    render() {
        return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
            <div class="card h-100 card text-center">
                <img src="${this.imageUrl}" class="card-img-top" height="150" width="200" ></img>    
                <div class="card-body">
                    <h4 class="card-title">${this.name}</h4>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Modelo ${this.model} </li>
                        <li class="list-group-item">${this.price} euros/mes</li>
                    </ul>
                </div>
                <div class="card-footer">
                    <button @click="${this.addCoche}" class="btn btn-primary"><strong>Seleccionar</strong></button>
                </div>
            </div>

        `;
    }       

//<img src="${this.imageUrl.src}" height="300" width="250" alt="${this.imageUrl.alt}"></img>    

    addCoche(e){
        console.log("ini -addCoche desde ficha");
        console.log("se va a añadir coche a la cesta " + this.name + ". Precio: " + this.price);
        
        this.dispatchEvent(
            new CustomEvent("add-coche", {
                "detail" : {
                    "id" : this.id,
                    "name" : this.name,
                    "model" : this.model,
                    "price": this.price,
                    "imageUrl": this.imageUrl
                }

            })
        );
    
    }

}
/*
        <div class="row">
            <div class="col-4"><img src="${this.imgsrc}" height="150"></img></div>
            <h1 class="col-8">${this.title}</h1>
        </div>
*/
customElements.define('bluerenting-ficha', BluerentingFicha);
