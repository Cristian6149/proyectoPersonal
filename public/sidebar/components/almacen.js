
Vue.component("almacen",{
    data(){
        return{
           title:"LISTA DE PRODUCTOS",
           listaProductos:[],
           productoSeleccionadoName:"",
           productoSeleccionadoId:"",
           productoSeleccionadoStock:0,
           nuevoStock:0,
           ventanamodal:"",
           nombreNuevoProducto:"",
           precioBaseNuevoProducto:"",
           precioVentaNuevoProducto:"",
           stockNuevoProducto:""
        }
    },
    mounted(){
        this.getProductos();
    }, 
    computed: {
      suma() {
        return this.productoSeleccionadoStock + parseInt(this.nuevoStock);
      }
    },
    methods:{
        async getProductos(){
            const result = await axios.get(`http://localhost:8000/api/productos`);
            this.listaProductos=result.data.productos.map(res=>{
                return res;
            })
        },
        async agregarProducto(){
           await axios.post('http://localhost:8000/api/agregarProducto',{
            name:this.nombreNuevoProducto,
            precioBase:parseInt(this.precioBaseNuevoProducto),
            precioVenta:parseInt(this.precioVentaNuevoProducto),
            stock:parseInt(this.stockNuevoProducto)
           })
        },
        async incrementarstock(){ 
            const suma=this.suma;
           await axios.post(`http://localhost:8000/api/productos/${this.productoSeleccionadoId}`,{
              stock:suma
            });
            console.log(suma)
        },
        seleccionarProducto(name,id,stock){
            this.productoSeleccionadoName=name;
            this.productoSeleccionadoId=id;
            this.productoSeleccionadoStock=stock
        }
    },
    template://html
    `
      <div>
         <h1>{{title}}</h1>
         <table>
         <tr>
           <th>PRODUCTO</th>
           <th>STOCK</th>
         </tr>
           <tr v-for="data in listaProductos">
              <td>{{data.name}}</td>
              <td>{{data.stock}}</td>
              <button @click="seleccionarProducto(data.name,data._id,data.stock),ventanamodal='stock'" onclick="openModal3()" >agregar stock</button>
           </tr>
         </table>
         <button @click="ventanamodal='agregarProducto'" onclick="openModal3()">agregar productos</button>
         
         <!-- Ventana Modal -->
               <div id="myModal3" class="modal3">
                <div class="modal-content3">
                 <span class="close3" onclick="closeModal3()">&times;</span>
                   <div v-show="ventanamodal=='stock'">
                       <h2>incrementar STOCK:</h2>
                       <h1>{{productoSeleccionadoName}}</h1>
                       <h3>stock actual -> {{productoSeleccionadoStock}}</h3>
                       <input type="number" v-model="nuevoStock" placeholder="ingrese cant agregar" >
                       <button onclick="closeModal3()" >cancelar</button>
                       <button @click="incrementarstock()" onclick="closeModal3()" >agregar</button>
                    </div>  <!--fin div agregar stock--> 
                    <div v-show="ventanamodal=='agregarProducto'">
                       <h1>AGREGANDO PRODUCTOS....</h1>
                       <input type="text" placeholder="ingrese nombre producto" v-model="nombreNuevoProducto"/>
                       <input type="text" placeholder="ingrese precio base" v-model="precioBaseNuevoProducto"/>
                       <input type="text" placeholder="ingrese precio venta" v-model="precioVentaNuevoProducto"/>
                       <input type="text" placeholder="ingrese stock" v-model="stockNuevoProducto"/>
                       <button onclick="closeModal3()">cancelar</button>
                       <button @click="agregarProducto()" onclick="closeModal3()">agregar</button>
                    </div><!--fin div agregar producto--> 
                  </div>
               </div>
    <!--xfinal modal-->

   
       </div>
    `
})