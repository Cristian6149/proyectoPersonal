Vue.component("ventas",{
    data(){
        return {
            titulo1:"MENU DE VENTAS",
            productos:[],
            productoVenta:[],
            cantidad_pedido:0,
            TOTAL:0
        }
    },
    mounted(){
      this.getProductos();
    },
    methods:{
        async getProductos(){
            const result = await axios.get(`http://localhost:8000/api/productos`);
            this.productos=result.data.productos.map(res=>{
                return res;
            })
        },
        seleccionarProducto(produc){
            console.log(produc)
             this.productoVenta.push({...produc,cantidad:0,subtotal:0});

        },
        sumar(precio){
          this.TOTAL+=precio;
        },
        restar(precio){
          this.TOTAL-=precio;
        }
    },
    template://html
    `
    <div>
    <h1>{{titulo1}}</h1>
    <div><!--inicio div tabla1-->
    <table>
      <tr>
       <th>PRODUCTO</th>
       <th>PRECIO</th>
       <th>CANTIDAD</th>
      </tr>
      <tr v-for="produc in productos">
        <td>{{produc.name}}</td>
        <td>{{produc.precioVenta}}</td>
        <td><button @click="seleccionarProducto(produc)">agregar</button></td>
      </tr>
    </table>
    </div><!--fin div tabla 1-->
    <div><!--inicio div tabla 2-->
      <table>
        <caption><h1>REGISTRO COMPRA</h1></caption>
          <tr>
            <th>DESCRIPCION</th>
            <th>PRECIO PRODUCTO</th>
            <th>SUBTOTAL</th>
            <th colspan="3">CANTIDAD</th>
          </tr>
          <tr v-for="data in productoVenta">
            <td>{{data.name}}</td>
            <td>{{data.precioVenta}}</td>
            <td>{{data.subtotal=data.precioVenta*data.cantidad}}</td>
            <td><button @click="restar(data.precioVenta),data.cantidad--">-</button></td>
            <td>{{data.cantidad}}</td>
            <td><button @click="sumar(data.precioVenta),data.cantidad++">+</button></td>
          </tr>
          <h1>TOTAL :S/.{{TOTAL}}</h2>
      </table>
    </div><!--fin div tabla 2-->

    <div>
      <!-- Button trigger modal -->
        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">
        Hacer pedido
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Registro de compras</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                 <div><!--inicio div tabla 2-->
                 <table>
                     <tr>
                       <th>DESCRIPCION</th>
                       <th>P/U</th>
                       <th>CANT</th>
                       <th>SUBTOTAL</th>
                     </tr>
                     <tr v-for="data in productoVenta">
                       <td>{{data.name}}</td>
                       <td>{{data.precioVenta}}</td>
                       <td>{{data.cantidad}}</td>
                       <td>{{data.subtotal}}</td>
                     </tr>
                     <h1>TOTAL :S/.{{TOTAL}}</h2>
                 </table>
               </div><!--fin div tabla 2-->
               <button>continuar</button>
               <h3>Ingrese datos:</h3>
               <input type="text" placeholder="nombre cliente"/>
               <input type="text" placeholder="opcional: apellido cliente"/>
               <input type="number" placeholder="dni cliente"/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="">Save changes</button>
            </div>
          </div>
        </div>
        </div>
            </div>

      </div>
    `
})