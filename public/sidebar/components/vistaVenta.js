Vue.component("vista_ventas",{
    data(){
        return {
            titulo1:"REGISTRO DE VENTAS",
            ventas:[],
            detalleSeleccionado:[]
        }
    },
    mounted(){
        this.getventas(),
        this.getDetalles()
    },
    methods:{
        async getventas(){
            const result = await axios.get('http://localhost:8000/api/venta');
            this.ventas=result.data.map(res=>{
                return res;
            })
            console.log(this.ventas)
        },
        async getDetalles(id){
            const self = this;
            const result = await axios.get(`http://localhost:8000/api/detalle/${id}`);
            self.detalleSeleccionado=result.data.map(e=>{
                return e;
            })
        }
    },
    template://html
    `
    <div>
     <table border="4">
     <tr >
         <th>FECHA DE VENTA</th>
         <th colspan="2">TOTAL</th>
      </tr>
      <tr v-for="data in ventas">
         <td>{{data.fecha}}</td>
         <td>{{data.total}}</td>
         <td>{{data._id}}</td>
         <button onclick="openModal()" @click="getDetalles(data._id)">ver detalle</button>
      </tr>
     </table>
     <button @click="getventas()">actualizar</button>
    <!--xinicio modal-->
     
   <!-- Ventana Modal -->
<div id="myModal" class="modal">
<div class="modal-content">
  <span class="close" onclick="closeModal()">&times;</span>
  <h2>DETALLES:</h2>
  <table>
  <tr v-for="data in detalleSeleccionado">
      <td>{{data.idCliente}}</td>
  </tr>
</table>
</div>
</div>

    <!--xfinal modal-->
    </div>
    `
})