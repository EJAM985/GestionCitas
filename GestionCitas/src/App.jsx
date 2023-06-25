import { useEffect, useState } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {

  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? []);
  const [paciente, setPaciente] = useState({});
  const [checkDeleteButton, setCheckDeleteButton] = useState(false);

  //Local Storage
  useEffect( () => {
    localStorage.setItem('pacientes', JSON.stringify( pacientes ));
  }, [pacientes] )

  //Funcion para eliminar un paciente de la BD a partir de su ID
  const eliminarPaciente = id => {
    const pacienteEliminar = pacientes.filter( paciente => paciente.id !== id );
    setPacientes(pacienteEliminar);
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Formulario 
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
          setCheckDeleteButton={setCheckDeleteButton}
        />
        <ListadoPacientes 
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
          checkDeleteButton={checkDeleteButton}
          setCheckDeleteButton={setCheckDeleteButton}
        />
      </div>
    </div>
  )
}

export default App
