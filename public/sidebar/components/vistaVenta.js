Vue.component("vista_ventas", {
  data() {
    return {
      titulo1: "REGISTRO DE VENTAS",
      ventas: [],
      detalleSeleccionado: [],
      VENTAS_TOTALES: 0,
      GANANCIA_TOTAL: 0,
      VENTASREALIZADAS:[]
    };
  },
  mounted() {
    const self = this;
    store({
      VENTASREALIZADAS(val) {
        self.ventas = val;
        console.log("ventasXD",val)
      },
      GANANCIA_TOTAL(val) {
        self.GANANCIA_TOTAL = val;
      },
      VENTA_TOTAL(val) {
        self.VENTAS_TOTALES = val;
      }
    });

    self.getventas()
    self.getDetalles();
  },
  methods: {
    async getventas() {
      const result = await axios.get("http://localhost:8000/api/venta");
      this.VENTAS_TOTALES = 0;
      this.GANANCIA_TOTAL = 0;
      store("VENTASREALIZADAS",result.data.map(res=> {
          this.VENTAS_TOTALES += res.total;
          this.GANANCIA_TOTAL += res.totalganancia;
          return res;
        })
      );
      console.log(this.ventas);
      store("GANANCIA_TOTAL", this.GANANCIA_TOTAL);
      store("VENTA_TOTAL", this.VENTAS_TOTALES);
    },
    async getDetalles(id) {
      const self = this;
      const result = await axios.get(`http://localhost:8000/api/detalle/${id}`);
      self.detalleSeleccionado = result.data.map((e) => {
        return e;
      });
    },
    cambiar(){
      store('VENTASREALIZADAS@set' , {
        nombre:"gkgkgkgk"
      } , item => (item.nombre == 'ggggggg'))
    }
  },
  template:  //html
   `
    <div>
     <table border="2">
     <tr >
         <th>CLIENTE</th>
         <th>FECHA COMPRA</th>
         <th>TOTAL</th>
         <th>G.VENTA</th>
      </tr>
      <tr v-for="data in ventas">
         <td>{{data.nombre}}</td>
         <td>{{data.fecha}}</td>
         <td>{{data.total}}</td>
         <td>{{data.totalganancia}}</td>
         <button onclick="openModal2()" @click="getDetalles(data._id)">ver detalle</button>
      </tr>
     </table>
     <h1>VENTAS TOTALES : {{VENTAS_TOTALES}}</h1>
     <h1>GANANCIA DEL DIA : {{GANANCIA_TOTAL}}</h1>
     <button @click="cambiar()">actualizar</button>
    <!--xinicio modal-->
     
   <!-- Ventana Modal -->
<div id="myModal2" class="modal2">
<div class="modal-content2">
  <span class="close2" onclick="closeModal2()">&times;</span>
  <h2>DETALLES:</h2>
  <table border="2">
  <tr>
     <th>ID DE PRODUCTO</th>
     <th>CANTIDAD</th>
     <th>SUBTOTAL</th>
     <th>GANANCIA</th> 
  </tr> 
  <tr v-for="data in detalleSeleccionado">
      <td>{{data.idProducto}}</td>
      <td>{{data.cantidad}}</td>
      <td>{{data.subtotal}}</td>
      <td>{{data.subtotalGanancia}}</td>
  </tr>
</table>
</div>
</div>

    <!--xfinal modal-->
    </div>
    `,
});
