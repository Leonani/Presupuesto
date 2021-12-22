import React, {useState, useEffect} from "react";
import Pregunta from './componentes/Preguntas.js'
import Formulario from "./componentes/Formulario.js";
import Listado from "./componentes/listado.js";
import Control from "./componentes/control.js";

function App() {

  //definir el state
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  const [mostrarpregunta, actualizarPregunta] = useState(true);
  const [gastos, guardarGastos] = useState([]);
  const [gasto, guardarGasto] = useState({});
  const [creargasto, guardarCearGasto] = useState(false);

  //useEffect actualiza restante
  useEffect(() => {
    if(creargasto) {
      //agrega presupuesto
      guardarGastos([
        ...gastos,
        gasto
      ]); 

      //resta el presupuesto
      const presupuestoRestante = restante - gasto.cantidad;
      guardarRestante(presupuestoRestante);

      //resetear a false
      guardarCearGasto(false);
    }
  }, [gasto, creargasto, gastos, restante]);


  

  return (
    <div className="container"> 
      <header>
        <h1> Gasto Semanal </h1>
        <div className="contenido-principal contenido">
          { mostrarpregunta ? 
            ( <Pregunta
                guardarPresupuesto={guardarPresupuesto}
                guardarRestante={guardarRestante}
                actualizarPregunta={actualizarPregunta}
              /> 
            ): 
            (
              <div className="row">

                <div className="one-half column">
                  <Formulario
                    guardarGasto={guardarGasto}
                    guardarCearGasto={guardarCearGasto}
                  />
                </div>

                <div className="one-half column">
                  <Listado
                    gastos= {gastos}
                  />
                  <Control
                    presupuesto = {presupuesto}
                    restante = {restante}
                  />
                </div>

              </div>
            )
          }
 
        </div>
      </header>
    </div>
  );
}

export default App;
