import { LitElement, html } from 'lit-element';

class BluerentingCesta extends LitElement {

    static get properties() {
        return {
            id: {type: String},
            name: {type: String},
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
            <div class="card h-10 w-65 card text-center">
                <img src="${this.imageUrl}" class="card-img-top" height="100" width="150" ></img>    
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${this.name} </li>
                        <li class="list-group-item">${this.price} euros/mes</li>
                    </ul>
                </div>            
                <div class="card-footer">
                    <button @click="${this.deleteCoche}" class="btn btn-danger"><strong>Delete</strong></button>
                </div>
            </div>

        `;
    }       

    deleteCoche(e){
        console.log("deleteCoche");
        console.log("se va a quitar coche de la cesta " + this.name + ". Precio: " + this.price);
        
        this.dispatchEvent(
            new CustomEvent("delete-coche", {
                "detail" : {
                    "name" : this.name,
                    "precio": this.precio,
                    "imageUrl": this.imageUrl
                }

            })
        );
    
    }

}
customElements.define('bluerenting-cesta', BluerentingCesta);
