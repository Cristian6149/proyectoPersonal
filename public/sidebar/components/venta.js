Vue.component("ventas",{
    data(){
        return {
            titulo1:"MENU DE VENTAS",
            productos:[],
            productoVenta:[],
            cantidad_pedido:0,
            TOTAL:0,
            TOTAL_GANANCIA:0,
            nombreCliente:'',
            apellidoCliente:'',
            dniCliente:''
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
        sumar(precioVenta,precioBase){
          const ganancia= precioVenta-precioBase;
          this.TOTAL+=precioVenta;
          this.TOTAL_GANANCIA+=ganancia;
        },
        restar(precio){
          this.TOTAL-=precio;
        },
        registroVenta(){
          const self = this;
          axios.post('http://localhost:8000/api/venta/cliente',{
            nombre:self.nombreCliente,
            apellido:self.apellidoCliente,
            dni:self.dniCliente,
            total:self.TOTAL,
            totalganancia:self.TOTAL_GANANCIA
          }).then(res=>{
            const id=res.data.data1._id
            self.nuevoDetalle(id);
          }).catch(e=>{
            console.log("error")
          })
        },
        nuevoDetalle(idVenta){
          const self = this;
           for(let data of self.productoVenta){
            axios.post('http://localhost:8000/api/venta/detalle',{
              idVenta:idVenta,
              idProducto:data._id,
              subtotal:data.subtotal,
              subtotalGanancia:(data.precioVenta-data.precioBase)*data.cantidad,
              cantidad:data.cantidad
            })
            axios.post(`http://localhost:8000/api/productos/${data._id}`,{
              stock:data.stock-data.cantidad
            });
           }
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
       <th></th>
      </tr>
      <tr v-for="produc in productos">
        <td>{{produc.name}}</td>
        <td>{{produc.precioVenta}}</td>
        <td><button @click="seleccionarProducto(produc)">agregar</button></td>
      </tr>
    </table>
    </div><!--fin div tabla 1-->
    <div><!--inicio div tabla 2-->
    <h1>REGISTRO COMPRA</h1>
      <table>        
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
            <td><button @click="restar(data.precioVenta,data.
              precioBase
              ),data.cantidad--">-</button></td>
            <td>{{data.cantidad}}</td>
            <td><button @click="sumar(data.precioVenta,data.
              precioBase
              ),data.cantidad++">+</button></td>
          </tr>
          <h2>TOTAL :S/.{{TOTAL}}</h2>
      </table>
    </div><!--fin div tabla 2-->

    <div>
       <div><!--inicio modal-->
       <button onclick="openModal()">hacer pedido</button>

       <!-- Ventana Modal -->
         <div id="myModal" class="modal">
          <div class="modal-content">
           <span class="close" onclick="closeModal()">&times;</span>
           <h2>PEDIDOS:</h2>
           <div><!--inicio div tabla 2-->
               <table>
                  <tr>
                    <th>DESCRIPCION</th>
                     <th>CANT</th>
                      <th>SUBTOTAL</th>
                      </tr>
                       <tr v-for="data in productoVenta">
                       <td>{{data.name}}</td>
                       <td>{{data.precioVenta}}</td>
                       <td>{{data.cantidad}}</td>
                       <td>{{data.subtotal}}</td>
                     </tr>
                     <h2>TOTAL :S/.{{TOTAL}}</h2>
                  </table>
                </div><!--fin div tabla 2-->
              
              <div><!--data usuario-->
              <h3>Ingrese datos:</h3>
              <input type="text" placeholder="nombre cliente" v-model='nombreCliente'/>
              <input type="text" placeholder="opcional: apellido cliente" v-model='apellidoCliente'/>
              <input type="number" placeholder="dni cliente" v-model='dniCliente'/>
           </div><!--data usuario-->
              <div class="btn-group  closee " role="group" aria-label="Basic example">
                <button type="button" class="btn btn-success" onclick="closeModal()"  @click="registroVenta()">registrar</button>
                <button type="button" class="btn btn-danger"  onclick="closeModal()">cancelar</button>
              </div>
          </div>          

             <!--xfinal modal-->
       </div><!--fin modal-->

    </div>
    </div>
    </div>
    `
})