Vue.component("ventas",{
    data(){
        return {
            titulo1:"MENU DE VENTAS",
            productosDisponibles:[],
            productoVenta:[],
            cantidad_pedido:0,
            TOTAL:0,
            TOTAL_GANANCIA:0,
            nombreCliente:'',
            apellidoCliente:'',
            dniCliente:'',
            buscarProducto:''
        }
    },
    mounted(){
      const self=this
      /* store({productos(val){
            self.productosDisponibles=val
      }}) */

      //this.getProductos();
    },
    methods:{
        async getProductosBuscar(event){  
          const self = this;   
          console.log(self.buscarProducto)
          console.log("1",event) 
          try{
            let result=await axios.get(`http://localhost:8000/api/productos/?q=${self.buscarProducto}`);
            console.log("2",event.value)
            console.log(result)
             self.productosDisponibles=result.data.productos
              //store('productos',result)
          }catch(e){
            console.log(e)
          }
            
        },
        getVentas(){
            let VENTASTOTALES=0
            let VENTASGANANCIA=0;
                    axios.get('http://localhost:8000/api/venta').then((res)=>{
                       store('VENTASREALIZADAS',res.data) 
                        for(let e of res.data){
                            VENTASTOTALES+=e.total
                            VENTASGANANCIA+=e.totalganancia;
                          }                           
                           store('GANANCIA_TOTAL',VENTASGANANCIA)
                           store('VENTA_TOTAL',VENTASTOTALES)
                  })       
        },
        seleccionarProducto(produc){
             this.productoVenta.push({...produc,cantidad:0,subtotal:0});

        },
        sumar(precioVenta,precioBase){
          const ganancia= precioVenta-precioBase;
          this.TOTAL+=precioVenta;
          this.TOTAL_GANANCIA+=ganancia;
        },
        restar(precio,precioBase){
          const ganancia= precio-precioBase;
          this.TOTAL-=precio;
          this.TOTAL_GANANCIA-=ganancia;
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
            store('VENTASREALIZADAS@push',{
              _id:id,
              nombre:self.nombreCliente,
              apellido:self.apellidoCliente,
              dni:self.dniCliente,
              total:self.TOTAL,
              totalganancia:self.TOTAL_GANANCIA})
          }).catch(e=>{
            console.log("error")
          })
        },
        async nuevoDetalle(idVenta){
          try{
            const self = this; 
            for(let data of self.productoVenta){
              await axios.post('http://localhost:8000/api/venta/detalle',{
                idVenta:idVenta,
                idProducto:data._id,
                subtotal:data.subtotal,
                subtotalGanancia:(data.precioVenta-data.precioBase)*data.cantidad,
                cantidad:data.cantidad
              })
              await axios.post(`http://localhost:8000/api/productos/${data._id}`,{
                stock:data.stock-data.cantidad
              });
              let productoEncontrado = self.productosDisponibles.find(function(producto) {
                return producto._id === data._id;
              });
              if (productoEncontrado) {
                console.log(productoEncontrado)
                productoEncontrado.stock=data.stock-data.cantidad;
              }
              store('productos',self.productosDisponibles)
              let sumaVentaTotal=data.subtotal
              let sumaGanaciaTotal=(data.precioVenta-data.precioBase)*data.cantidad
              store('GANANCIA_TOTAL',sumaGanaciaTotal)
              store('VENTA_TOTAL',sumaVentaTotal)
              store('TOTAL_INVENTARIO',((data.precioVenta-data.precioBase)*data.cantidad)*-1)
             }  
             

           //this.getVentas()         
           const nuevoArray=self.productoVenta.filter(objeto=>objeto._id === 'kcjknccn')
           this.productoVenta=nuevoArray
           this.TOTAL=0
          }catch(e){
            console.log(e)
          }
           
        },
        eliminarRegistro(id,precio,cantidad){
            this.TOTAL-=(precio*cantidad)
          const nuevoArray = this.productoVenta.filter(objeto => objeto._id !== id);
          this.productoVenta=nuevoArray
        },
      getDataCliente(){
          axios.get(`https://apiperu.dev/api/dni/${this.dniCliente}?api_token=7f79affab8ace91630e05ffcae6b44e906e173206016d3a5b7f3153f5a7a7e53`).
          then(datos=>{
            console.log(datos)
   
            this.nombreCliente=datos.data.data.nombres;
            this.apellidoCliente=datos.data.data.apellido_materno+' '+datos.data.data.apellido_paterno
          }).catch(e=>{
            console.log(e)
          })
            

      
        }
    },
    template://html
    `
    <div>
    <h1>{{titulo1}}</h1>
     <div><!--inicio div tabla1-->
     <h1>{{buscarProducto}}</h1>
     <input type="search" class="buscador" v-model="buscarProducto" @change="getProductosBuscar($event)"/>
      <table>
        <tr>
          <th>PRODUCTO</th>
          <th>PRECIO</th>          
          <th>STOCK</th>
          <th></th>
        </tr>
        <tr v-for="produc in productosDisponibles">
          <td>{{produc.name}}</td>
          <td>{{produc.precioVenta}}</td>
          <td>{{produc.stock}}</td>
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
            <th></th>
          </tr>
          <tr v-for="data in productoVenta">
            <td>{{data.name}}</td>
            <td>{{data.precioVenta}}</td>
            <td>{{data.subtotal=data.precioVenta*data.cantidad}}</td>
            <td><button @click="restar(data.precioVenta,data.precioBase),data.cantidad--">-</button></td>
            <td>{{data.cantidad}}</td>
            <td><button @click="sumar(data.precioVenta,data.precioBase),data.cantidad++">+</button></td>
            <td><ion-icon name="trash-outline" class="btn btn-danger" @click="eliminarRegistro(data._id,data.precioVenta,data.cantidad)"></ion-icon></td>
          </tr>
          <h2>TOTAL :S/.{{TOTAL}}</h2>
      </table>
    </div><!--fin div tabla 2-->

    <div>
       <div><!--inicio modal-->
       <button onclick="openModal()" >hacer pedido</button>

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
              <h3>Ingrese datos:{{dniCliente}}</h3>
              <input type="number" placeholder="dni cliente" v-model='dniCliente'/>
              <input type="text" placeholder="nombre cliente" v-model='nombreCliente'/>
              <input type="text" placeholder="opcional: apellido cliente" v-model='apellidoCliente'/>              
           </div><!--data usuario-->
              <div class="content-button">
              <button @click="getDataCliente()">buscar</button>
                <button type="submit" class="btn btn-success" onclick="closeModal()"  @click="registroVenta()">registrar</button>
                <button type="button" class="btn btn-danger"  onclick="closeModal()" >cancelar</button>
              </div>
          </div>          

             <!--xfinal modal-->
       </div><!--fin modal-->

    </div>
    </div>
    </div>
    `
})