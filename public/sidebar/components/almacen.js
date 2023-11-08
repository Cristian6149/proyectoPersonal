Vue.component("almacen", {
  data() {
    return {
      title: "INVENTARIO",
      listaProductos: [],
      productoPermanente:[],
      productoSeleccionadoName: "",
      productoSeleccionadoId: "",
      productoSeleccionadoStock: 0,
      ventanamodal: "",
      nombreNuevoProducto: "",
      precioBaseNuevoProducto: "",
      precioVentaNuevoProducto: "",
      stockNuevoProducto: "",
      sumaTotalStock: 0,
      codigoMaximo:0,
      contador:0,
    };
  },
  mounted() {
    const self = this;
    store({
      productos(val) {
        self.listaProductos = val;
      },
    });
    this.getProductos();
  },
  computed: {
    formatoContador() {
      return this.contador.toString().padStart(4, '0');
    }
  },
  methods: { 
   async getProductos() {
      this.sumaTotalStock = 0;
      const result = await axios.get(`http://localhost:8000/api/productos`);
      store(
        "productos",
        result.data.productos.map((res) => {
          this.sumaTotalStock += res.stock * res.precioBase;
          this.codigoMaximo=res.codigo > this.codigoMaximo ? res.codigo : this.codigoMaximo
          return res;
        })
      );
      store("TOTAL_INVENTARIO", this.sumaTotalStock);
    },
    agregarProducto() {
      axios.post("http://localhost:8000/api/agregarProducto", {
        name:this.productoPermanente[0].codigo,
        precioBase:parseInt(this.productoPermanente[0].precioBase),
        precioVenta:parseInt(this.productoPermanente[0].precioVenta),
        stock:parseInt(this.productoPermanente[0].stock),
        codigo:this.productoPermanente[0].codigo
        })
        .then((response) => {
          store("productos@push", response.data.data);
          this.clearProductoPermanente()
        });
    },
    async eliminarProducto(name,ids,cod){
      let veri = confirm(`¿Estás seguro eliminar producto ->${name}?`);
      if(veri){
        let moti=prompt("Por favor, ingresa motivo a eliminar:", "******")
        axios.post(`http://localhost:8000/api/delete/?id=${ids}`)
        store(`productos@removeBy/codigo/${cod}`)
       }
    },
    clearProductoPermanente(){
      this.productoPermanente.splice(0,1)
      console.log(this.productoPermanente)
    },
    ModificarProducto() {
      axios.post(
        `http://localhost:8000/api/productos/${this.productoPermanente[0]._id}`,
        {
          name:this.productoPermanente[0].codigo,
          precioBase:this.productoPermanente[0].precioBase,
          precioVenta:this.productoPermanente[0].precioVenta,
          stock:this.productoPermanente[0].stock,
          codigo:this.productoPermanente[0].codigo
        }
      ).then(()=>{
        store("productos@set",{
          name:this.productoPermanente[0].codigo,
          precioBase:this.productoPermanente[0].precioBase,
          precioVenta:this.productoPermanente[0].precioVenta,
          stock:this.productoPermanente[0].stock,
          codigo:this.productoPermanente[0].codigo
          },(item) => item._id == this.productoPermanente[0]._id
          );
          this.clearProductoPermanente();
        }
      )

      /*let productoEncontrado = self.listaProductos.find(function(producto) {
              return toString(producto._id) === toString(this.productoSeleccionadoId);
            });
            if (productoEncontrado) {
              productoEncontrado.stock=this.productoSeleccionadoStock + parseInt(this.nuevoStock);
            }
            store('productos',self.listaProductos)*/
      //let newStok = this.nuevoStock * this.productoSeleccionadoPrice;
      //store("TOTAL_INVENTARIO", newStok);

     /*  store(
        "productos@set",
        {
          stock: this.suma,
        },
        (item) => item._id == this.productoSeleccionadoId
      ); */
    },
    seleccionarProducto(id,cod,name,prBs,prVt, stock) {
      /* this.productoSeleccionadoName = name;
      this.productoSeleccionadoId = id;
      this.productoSeleccionadoStock = stock;
      this.productoSeleccionadoPrice = price; */
      let newData={
        _id:id,
        codigo:cod,
        name:name,
        precioBase:prBs,
        precioVenta:prVt,
        stock:stock
      };
      this.productoPermanente.push(newData)
      console.log(newData)
      console.log(this.productoPermanente)

    },
    dataPermanente(){
      let n=parseInt(this.codigoMaximo)+1
      this.codigoMaximo=n.toString().padStart(4, '0');
      let newData={
        _id:'',
        codigo:this.codigoMaximo,
        name:'',
        precioBase:'',
        precioVenta:'',
        stock:''
      };
    this.productoPermanente.push(newData)
    },
    generarCodigo(cod) {
      // Llamada a JsBarcode para generar el código de barras
      JsBarcode(this.$refs.codigoBarras,cod);
    },
  },
  //html
  template://html
   `
       <div>
        <h1 class="alamacen-estatico">{{title}}</h1>
         <table>
         <tr>
           <th>CODIGO</th>
           <th>PRODUCTO</th>
           <th>P.COMPRA</th>
           <th>P.VENTA</th>
           <th>STOCK</th>
         </tr>
           <tr v-for="data in listaProductos">
              <td>{{data.codigo}}</td>
              <td>{{data.name}}</td>
              <td>{{data.precioBase}}</td>
              <td>{{data.precioVenta}}</td>
              <td  >{{data.stock}}</td>
              <!--<div> inicio iconos-->
                    <td><div class="contenedor"><!--inicio contenedor-->
                      <div class="icono"  @click="seleccionarProducto(data._id,data.codigo,data.name,data.precioBase,data.precioVenta,data.stock),ventanamodal='stock'" onclick="openModal3()">
                        <ion-icon name="create"></ion-icon>
                        <div class="texto modificar">
                         <p >MODIFICAR</p>
                        </div>
                      </div>
                    </div></td><!--fin contenedor-->

                    <td><div class="contenedor"><!--inicio contenedor-->
                      <div class="icono"  @click="eliminarProducto(data.name,data._id,data.codigo),ventanamodal='stock'">
                      <ion-icon name="trash-sharp"></ion-icon>
                        <div class="texto eliminar">
                         <p >ELIMINAR</p>
                        </div>
                      </div>
                    </div></td><!--fin contenedor-->

                    <td><div class="contenedor"><!--inicio contenedor-->
                      <div class="icono"  @click="generarCodigo(data.codigo),ventanamodal='verqr'" onclick="openModal3()">
                      <ion-icon name="qr-code-sharp"></ion-icon>
                        <div class="texto qr">
                         <p >VER QR</p>
                        </div>
                      </div>
                    </div></td><!--fin contenedor-->
              <!--</div>FIN ICONOS -->
           </tr>
         </table>
         <ion-icon name="add-sharp"></ion-icon>
         <button @click="dataPermanente(),ventanamodal='agregarProducto'" onclick="openModal3()">agregar productos</button>
         
         
         <!-- Ventana Modal -->
               <div id="myModal3" class="modal3">
                <div class="modal-content3">
                 <span class="close3" @click="clearProductoPermanente()" onclick="closeModal3()">&times;</span>
                   <div v-show="ventanamodal=='stock'">
                       <h2>MODIFICAR</h2>
                       <tr v-for="data in productoPermanente">
                       <label for="fcodigo">CODIGO:</label>
                       <input type="text" id="fcodigo" v-model="productoPermanente[0].codigo" :value="data.codigo" />
                       <label for="fnombre">NOMBRE:</label>
                       <input  type="text" id="fnombre" v-model="productoPermanente[0].name" :value="data.name"/>
                       <label for="fpre-base">PR.BASE:</label>
                       <input type="text" id="fpre-base" v-model="productoPermanente[0].precioBase"  :value="data.precioBase" />
                       <label for="fpre-venta">PR.VENTA:</label>
                       <input  type="text" id="fpre-venta" v-model="productoPermanente[0].precioVenta :value="data.precioVenta""/><br/>
                       <label for="fstock">STOCK:</label>
                       <input  type="text" id="fstock" v-model="productoPermanente[0].stock" :value="data.stock"/>
                       </tr>
                       <h3>stock actual -> {{productoSeleccionadoStock}}</h3>
                       <button @click="clearProductoPermanente()" onclick="closeModal3()" >cancelar</button>
                       <button @click="ModificarProducto()" onclick="closeModal3()" >agregar</button>
                    </div>  <!--fin div agregar stock--> 
                    <div v-show="ventanamodal=='agregarProducto'">
                       <h2>NUEVO PRODUCTO</h2>
                       <tr v-for="data in productoPermanente">
                       <label for="fcodigo">CODIGO:</label>
                       <input type="text" id="fcodigo" v-model="productoPermanente[0].codigo" :value="data.codigo" />
                       <label for="fnombre">NOMBRE:</label>
                       <input  type="text" id="fnombre" v-model="productoPermanente[0].name" :value="data.name"/>
                       <label for="fpre-base">PR.BASE:</label>
                       <input type="text" id="fpre-base" v-model="productoPermanente[0].precioBase"  :value="data.precioBase" />
                       <label for="fpre-venta">PR.VENTA:</label>
                       <input  type="text" id="fpre-venta" v-model="productoPermanente[0].precioVenta" :value="data.precioVenta" /><br/>
                       <label for="fstock">STOCK:</label>
                       <input  type="text" id="fstock" v-model="productoPermanente[0].stock" :value="data.stock"/>
                       </tr>
                       <button @click="clearProductoPermanente(),codigoMaximo--" onclick="closeModal3()">cancelar</button>
                       <button @click="agregarProducto()" onclick="closeModal3()">agregar</button>
                    </div><!--fin div agregar producto--> 
                    <div v-show="ventanamodal=='verqr'">
                       <div class="codigBarra"><svg ref="codigoBarras"></svg> 
                        <button class="btn btn-success">imprimir</button>
                        <button class="btn btn-danger" onclick="closeModal3()">salir</button>
                       </div>
                    </div><!--fin div verqr-->    
                  </div>
               </div>
    <!--xfinal modal-->

   
       </div>
    `,
});
