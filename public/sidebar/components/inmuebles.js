Vue.component("inmuebles",{
    data(){
        return {
            title:"PROPIEDADES, PLANTA Y EQUIPO"
        }
    },
    template://html
    `
    <div>
      <h1>{{title}}</h1>
       <h4>PROPIEDADES</h4>
        <table>
         <tr>
           <th>Propiedad Registr.</th>
           <th>Direcc.</th>
           <th>Valor</th>
         </tr>
         <tr>
           <td>casa 220m2</td>
           <td>calle los nogales N°234</td>
           <td>10,000</td>
         </tr>
        </table>
        <h4>EQUIPO</h4>
        <table>
         <tr>
           <th>Equipo Registr.</th>
           <th>Descrip.</th>
           <th>Valor</th>
         </tr>
         <tr>
           <td>laptop</td>
           <td>hp pavilion ryzen5</td>
           <td>3,000</td>
         </tr>
        </table>

    </div>
    `
})