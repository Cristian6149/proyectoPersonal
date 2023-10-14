Vue.component("balancegeneral",{
  data(){
    return{
        title:"NeverStore2.0.S.A.C",
        tiempo:new Date(),
    }
  },
  template://html
  `
  <div>
  <h1>{{title}}</h1>
  <h2>Balance General</h2>
  <h3>Fecha: [{{tiempo}}]</h3>

  <h4>Activos</h4>
  <table>
    <tr>
      <th>Activos Circulantes</th>
      <th>Monto ($)</th>
    </tr>
    <tr>
      <td>Cuentas Bancarias</td>
      <td>$XX,XXX</td>
    </tr>
    <tr>
      <td>Ventas Realizadas</td>
      <td>$XX,XXX</td>
    </tr>
    <tr>
      <td>Inventarios</td>
      <td>$XX,XXX</td>
    </tr>
    <tr>
      <th>Total de Activos Circulantes</th>
      <td>$XXX,XXX</td>
    </tr>
    <tr>
      <th>Activos No Circulantes</th>
      <th></th>
    </tr>
    <tr>
      <td>Propiedades, Planta y Equipo</td>
      <td>$XX,XXX</td>
    </tr>
    <tr>
      <td>Inversiones a Largo Plazo</td>
      <td>$XX,XXX</td>
    </tr>
    <tr>
      <td>Otros Activos No Circulantes</td>
      <td>$XX,XXX</td>
    </tr>
    <tr>
      <th>Total de Activos</th>
      <td>$XXX,XXX</td>
    </tr>
  </table>

  <h4>Pasivos</h4>
  <table>
    <tr>
      <th>Pasivos Circulantes</th>
      <th>Monto ($)</th>
    </tr>
    <tr>
      <td>Cuentas por Pagar Comerciales</td>
      <td>$XX,XXX</td>
    </tr>
    <tr>
      <td>Préstamos y Deudas a Corto Plazo</td>
      <td>$XX,XXX</td>
    </tr>
    <tr>
      <th>Total de Pasivos Circulantes</th>
      <td>$XXX,XXX</td>
    </tr>
    <tr>
      <th>Pasivos No Circulantes</th>
      <th></th>
    </tr>
    <tr>
      <td>Préstamos y Deudas a Largo Plazo</td>
      <td>$XX,XXX</td>
    </tr> 
    <tr>
      <td>Otros Pasivos No Circulantes</td>
      <td>$XX,XXX</td>
    </tr>
    <tr>
      <th>Total de Pasivos No Circulantes</th>
      <td>$XXX,XXX</td>
    </tr>
    <tr>
      <th>Total de Pasivos</th>
      <td>$XXX,XXX</td>
    </tr>
    <tr>
      <th>Patrimonio Neto</th>
      <th></th>
    </tr>
    <tr>
    <td>Resultado de Ejercicio</td>
    <td>$XX,XXX</td>
    </tr>
    <tr>
    <td>Capital Social</td>
    <td>$XX,XXX</td>
    </tr>
    <tr>
      <th>Total de Patrimonio</th>
      <td>$XXX,XXX</td>
    </tr>
  </div>
  `
})