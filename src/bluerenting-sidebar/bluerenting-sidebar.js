import { LitElement, html } from 'lit-element';

import '../bluerenting-ficha/bluerenting-ficha.js'
import '../bluerenting-cesta/bluerenting-cesta.js'
import { apiPedidos } from '../api.js';

class BluerentingSidebar extends LitElement {

    static get properties() {
        return {
            cesta: {type: Array},
            id: {type: String},
            name: {type: String},
            price: {type: String},
            imageUrl: {type: String},
            hayCambios: {type: Boolean},
            totalCesta: {type: Number}
        }
    }

    constructor() {
        super()

        this.cesta = [];
        this.totalCesta = 0;
    
    }

    render() {
        return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        <div align="right">
            <div class="row">
                <button class="btn btn-outline-primary btn-lg" type="button" disabled>Cesta</button>
                <button class="btn btn-outline-dark" type="button" disabled>Total: ${this.totalCesta} euros/mes</button>
                <button class="btn btn-danger " type="button" @click="${this.hacerPedido}">Comprar</button>
            </div>
            <div class="row" style="margin: 0 auto;" id="cochesList">
                        ${this.cesta.map(
                            coche => html`
                            <bluerenting-cesta
                                name="${coche.name}"
                                price="${coche.price}"
                                imageUrl="${coche.imageUrl}"
                                cantidad="${coche.cantidad}"
                                id="${coche.id}"
                                @delete-coche="${this.deleteCoche}"
                            >
                            </bluerenting-cesta>
                            `
                        )}
            </div>
        </div>
        `;
    }       

    hacerPedido() {
        if (this.cesta.length > 0) {
            console.log("hacerPedido")
            console.log(this.cesta)
            console.log("Total Compra: " + this.totalCesta)

            let jsonToSend = this.createJSON()
            console.log(jsonToSend)

            let xhr = new XMLHttpRequest();
            xhr.onload = () => {
                if ((xhr.status === 201) || (xhr.status === 200)) {
                    console.log(xhr.responseText)
                    console.log("Se ha guardado correctamente el pedido")
                    this.cesta = []
                    this.totalCesta = 0
                }
            }
            xhr.open("POST", apiPedidos);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            xhr.send(JSON.stringify(jsonToSend));
        }
    }

    createJSON() {
        // Cogemos ids de coches
        let idsCoches = []; 
        for (var i=0; i<this.cesta.length; i++) { 
            idsCoches.push(this.cesta[i].id);
        }    

        let jsonCoche = {
            "idVehicles": idsCoches,
            "totalPrice": this.totalCesta,
            "userId": "user_equipo4@gmail.com",
        }
        return jsonCoche
    }

    updated(changeProperties) {
        console.log("updated en bluerenting-sidebar")
        console.log(changeProperties)

        if (changeProperties.has("hayCambios")) {
            console.log("Ha cambiado el valor de la propiedad id: " + this.id + "-" + this.name + "-" + this.price)
            
            
            /*
            this.cesta = [...this.cesta, 
                {
                    name: this.name,
                    price: this.price,
                    imageUrl: this.imageUrl
                }
            ];
            */ 

            let indexOfCoche = this.cesta.findIndex(
                coche => coche.id === this.id
            );

            if (indexOfCoche !== -1) {
                console.log("Encontrado coche a modificar en cesta")
                this.cesta[indexOfCoche].cantidad += 1
                this.cesta = this.cesta
            } else {
                console.log("NO encontrado coche a modificar en cesta")
                this.cesta = [...this.cesta, 
                    {
                        id: this.id,
                        name: this.name,
                        price: this.price,
                        imageUrl: this.imageUrl,
                        cantidad: 1
                    }
                ];               
            }                        

            this.totalCesta = 0;
            for (var i=0; i<this.cesta.length; i++) { 
                this.totalCesta += (this.cesta[i].cantidad * this.cesta[i].price);
            }
            
            function dar_formato(num){
                var cadena = ""; var aux;
                var cont = 1,m,k;                 
                if(num<0) aux=1; else aux=0;                
                num=num.toString(); 
                for(m=num.length-1; m>=0; m--){                 
                    cadena = num.charAt(m) + cadena;                 
                    if(cont%3 == 0 && m >aux)  cadena = "." + cadena; else cadena = cadena;                 
                    if(cont== 3) cont = 1; else cont++;
                }
                cadena = cadena.replace(/.,/,",");
                return cadena;
            }

            this.totalCesta = dar_formato(this.totalCesta);        
            
        }
    }
    

    deleteCoche(e){
        console.log("delete coche en sidebar");
        console.log(e);
        console.log("Estamos en sidebar. borramos  " + e.detail.id + " " + e.detail.name +  " " +e.detail.price);

        this.cesta = this.cesta.filter(
            coche => coche.id != e.detail.id
        );
        this.totalCesta = 0;
        for (var i=0; i<this.cesta.length; i++) { 
            this.totalCesta += (this.cesta[i].cantidad * this.cesta[i].price);
        }

        function dar_formato(num){
            var cadena = ""; var aux;
            var cont = 1,m,k;                 
            if(num<0) aux=1; else aux=0;                
            num=num.toString(); 
            for(m=num.length-1; m>=0; m--){                 
                cadena = num.charAt(m) + cadena;                 
                if(cont%3 == 0 && m >aux)  cadena = "." + cadena; else cadena = cadena;                 
                if(cont== 3) cont = 1; else cont++;
            }
            cadena = cadena.replace(/.,/,",");
            return cadena;
        }

        this.totalCesta = dar_formato(this.totalCesta);        

    }
    

}

customElements.define('bluerenting-sidebar', BluerentingSidebar);
