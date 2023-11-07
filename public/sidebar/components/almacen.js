Vue.component("almacen", {
  data() {
    return {
      title: "INVENTARIO",
      listaProductos: [],
      productoPermanente:[],
      productoSeleccionadoName: "",
      productoSeleccionadoId: "",
      productoSeleccionadoStock: 0,
      nuevoStock: 0,
      ventanamodal: "",
      nombreNuevoProducto: "",
      precioBaseNuevoProducto: "",
      precioVentaNuevoProducto: "",
      stockNuevoProducto: "",
      sumaTotalStock: 0,
      codigo: "",
      contador:99
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
    suma() {
      return this.productoSeleccionadoStock + parseInt(this.nuevoStock);
    },
    formatoContador() {
      return this.contador.toString().padStart(4, '0');
    }
  },
  methods: {
    incrementar() {
      this.contador++;
    },
    async getProductos() {
      this.sumaTotalStock = 0;
      const result = await axios.get(`http://localhost:8000/api/productos`);
      store(
        "productos",
        result.data.productos.map((res) => {
          this.sumaTotalStock += res.stock * res.precioBase;
          return res;
        })
      );
      store("TOTAL_INVENTARIO", this.sumaTotalStock);
    },
    agregarProducto() {
      axios
        .post("http://localhost:8000/api/agregarProducto", {
          name: this.nombreNuevoProducto,
          precioBase: parseInt(this.precioBaseNuevoProducto),
          precioVenta: parseInt(this.precioVentaNuevoProducto),
          stock: parseInt(this.stockNuevoProducto),
        })
        .then((response) => {
          store("productos@push", response.data.data);
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
    async incrementarstock() {
      await axios.post(
        `http://localhost:8000/api/productos/${this.productoSeleccionadoId}`,
        {
          stock: this.suma,
        }
      );

      /*let productoEncontrado = self.listaProductos.find(function(producto) {
              return toString(producto._id) === toString(this.productoSeleccionadoId);
            });
            if (productoEncontrado) {
              productoEncontrado.stock=this.productoSeleccionadoStock + parseInt(this.nuevoStock);
            }
            store('productos',self.listaProductos)*/
      let newStok = this.nuevoStock * this.productoSeleccionadoPrice;
      store("TOTAL_INVENTARIO", newStok);

      store(
        "productos@set",
        {
          stock: this.suma,
        },
        (item) => item._id == this.productoSeleccionadoId
      );
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
      this.$refs.ref="miInput"
      console.log(newData)
      console.log(this.productoPermanente)

    },
    setInputValue(value) {
      this.$refs.myInput.value = value;
    },
    generarCodigo() {
      // Llamada a JsBarcode para generar el código de barras
      JsBarcode(this.$refs.codigoBarras, this.codigo);
    },
  },
  //html
  template://html
   `
       <div>
        <h1 class="alamacen-estatico">{{title}}</h1>
        <div id="app">
          <button @click="incrementar">Incrementar</button>
          <div>{{ formatoContador }}</div>
        </div>
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
                      <div class="icono"  @click="codigo=data.codigo,generarCodigo(),ventanamodal='verqr'" onclick="openModal3()">
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
         <button @click="ventanamodal='agregarProducto'" onclick="openModal3()">agregar productos</button>
         
         
         <!-- Ventana Modal -->
               <div id="myModal3" class="modal3">
                <div class="modal-content3">
                 <span class="close3" onclick="closeModal3()">&times;</span>
                   <div v-show="ventanamodal=='stock'">
                       <h2>MODIFICAR</h2>
                       <tr v-for="data in productoPermanente">
                       <input :value="data.codigo" @input="updateInputValue" type="text" />
                       <input :value="data.name" type="text"/>
                       <input :value="data.precioBase" type="text"/>
                       <input :value="data.precioVenta" type="text"/>
                       <input :value="data.stock" type="text"/>
                       </tr>
                       <h1>{{productoSeleccionadoName}}</h1>

                       <h3>stock actual -> {{productoSeleccionadoStock}}</h3>
                       <input type="number" v-model="nuevoStock" placeholder="ingrese cant agregar" >
                       <button @click="nuevoStock=0" onclick="closeModal3()" >cancelar</button>
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
