import { LitElement, html , css} from 'lit-element';
import { apiPedidos } from '../api';
import '../bluerenting-coche-edit/bluerenting-coche-edit'

class BluerentingPedidos extends LitElement {

    static get properties() {
        return {
            pedidos: {type: Array},
            updateLista: {type: Boolean}
        }
    }

    constructor() {
        super()

        this.pedidos = []
        this.updateLista = true
        this.getPedidos()
    }

    render() {
        return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        <div class="d-grid gap-2">
            <button class="btn btn-outline-primary btn-lg" type="button" disabled>Pedidos</button>
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">User</th>
                    <th scope="col">Importe</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Mdelo</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>

            ${this.pedidos.map(
                pedido => html`

                    <tr class="table-primary">
                      <td scope="row">${pedido.userId}</td>
                      <td>${pedido.totalPrice} €/mes</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>

                    

                        ${pedido.vehicles.map(
                          car => html`
                          <tr>
                          <td></td>
                          <td></td>
                          <td>${car.name}</td>
                          <td>${car.model}</td>
                          <td><img src="${car.imageUrl}" heigth="50" width="50"></td>
                          </tr>
                        `)}
                    
                `)}
            </tbody>
        </table>

        `;
    }   
    updated(changedProperties) {
        if (changedProperties.has("updateLista")) {
            console.log("updated en bluerenting-pedidos")
            this.getPedidos()
        }
    }

    getPedidos() {
        console.log("getPedidos")
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log(xhr.responseText)
                let APIResponse = JSON.parse(xhr.responseText);
                this.pedidos = APIResponse
                console.log(this.pedidos)
                console.log("Pedidos correctamente obtenidos")
            }
        }

        xhr.open("GET", apiPedidos);
        xhr.send();
    }


}

customElements.define('bluerenting-pedidos', BluerentingPedidos);