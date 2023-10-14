Vue.component("cuentas",{
    data(){
        return{
            title:"MENU DE CUENTAS"
        }
    },
    template://html
    `
    <div>
      <h1>{{title}}</h1>
      <h4>SALDO EN CUENTA</h4>
       <table border="2d">
         <tr>
          <th>E. BANCARIA</th>
          <th>M. DISPONIBLE</th>
         </tr>
         <tr>
          <td>mi banco</td>
          <td>400</td>
        </tr>
        <tr>
          <td>caja . arequipa</td>
          <td>800</td>
        </tr>
        <tr>
          <td>bcp</td>
          <td>900</td>
        </tr>
      </table>

      <h4>PRESTAMOS BANCARIOS ->CORTO PLAZO<- i/o otrs</h4>
       <table border="2d">
         <tr>
          <th>E. BANCARIA</th>
          <th>M. PRESTADO</th>
         </tr>
         <tr>
          <td>caja. tacna</td>
          <td>400</td>
        </tr>
        <tr>
          <td>caja . huancayo</td>
          <td>800</td>
        </tr>
        <tr>
          <td>interbank</td>
          <td>900</td>
        </tr>
      </table>

      <h4>PRESTAMOS BANCARIOS ->LARGO PLAZO<- i/o otrs</h4>
      <table border="2d">
        <tr>
         <th>E. BANCARIA</th>
         <th>M. PRESTADO</th>
        </tr>
        <tr>
         <td>caja. tacna</td>
         <td>400</td>
       </tr>
       <tr>
         <td>caja . huancayo</td>
         <td>800</td>
       </tr>
       <tr>
         <td>interbank</td>
         <td>900</td>
       </tr>
     </table>

      <h4>Capital Social i/o otrs</h4>
       <table border="2d">
         <tr>
          <th>Nom. Socio</th>
          <th>M. Efectuado</th>
         </tr>
         <tr>
          <td>soc. Ronald</td>
          <td>400</td>
        </tr>
        <tr>
          <td>soc. Cristian</td>
          <td>800</td>
        </tr>
        <tr>
          <th>TOTAL</th>
          <td>S/XXXXXX</td>
        </tr>
      </table>
    </div>
    `
})