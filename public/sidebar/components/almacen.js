
Vue.component("almacen",{
    data(){
        return{
           title:"LISTA DE PRODUCTOS",
           listaProductos:[]
        }
    },
    mounted(){
        this.getProductos();
    }, 
    methods:{
        async getProductos(){
            const result = await axios.get(`http://localhost:8000/api/productos`);
            this.listaProductos=result.data.productos.map(res=>{
                return res;
            })
        }
    },
    template://html
    `
      <div>
         <h1>{{title}}</h1>
         <table>
           <tr v-for="data in listaProductos">
              <td>{{data.name}}</td>
           </tr>
         </table>
      </div>
    `
})