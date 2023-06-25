import Paciente from "./Paciente";

const ListadoPacientes = ({pacientes, setPaciente, eliminarPaciente, checkDeleteButton, setCheckDeleteButton}) => {
  
  return (
    <div className="md:w-1/2 lg:w-3/5">
      {pacientes && pacientes.length ? (
        <>
          <h2 className="font-black text-xl text-center">Listado de Clientes</h2>

          <p className="text-lg mt-5 text-center mb-10">
            Administra tus {''}
            <span className="text-blue-500 font-bold">Clientes y Citas</span>
          </p>


          <div className="md:h-screen overflow-y-scroll">

            {pacientes.slice().reverse().map( paciente => (
              
                <Paciente 
                  key={paciente.id}
                  paciente={paciente}
                  setPaciente={setPaciente}
                  eliminarPaciente={eliminarPaciente}
                  checkDeleteButton={checkDeleteButton}
                  setCheckDeleteButton={setCheckDeleteButton}
                />
            
            ))}   

          </div>
        </>

      ) : (
        
        <>

          <h2 className="font-black text-xl text-center">No hay ningún registro</h2>

          <p className="text-lg mt-5 text-center mb-10">
            Añádelos con el  {''}
            <span className="text-blue-500 font-bold">Formulario</span>
          </p>

        </>
      )}

    </div>
  )
}

export default ListadoPacientes