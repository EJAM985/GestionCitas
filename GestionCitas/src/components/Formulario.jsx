import {useState, useEffect} from "react";
import {Toaster, toast} from 'react-hot-toast';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [datosAdicionales, setDatosAdicionales] = useState('');

  //Editamos los datos del cliente
  useEffect( () => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setDatosAdicionales(paciente.datosAdicionales);
    }
    else{
      console.log('No hay nada');
    }
  }, [paciente])

  // Funcion para generar un ID aleatorio
  const generateID = () => {
    const random = Math.random().toString(36);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    //Validacion del formulario
    if([nombre, propietario, email, fecha, datosAdicionales].includes('')){
      toast.error("Algunos de los Campos está Vacio");
      return;
    }

    //Objeto del paciente
    const objetoPaciente = {
      nombre, 
      propietario,
      email,
      fecha,
      datosAdicionales
    }

    if(paciente.id){
      //Editando el registro
      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map( pacientesState => pacientesState.id ===
        paciente.id ? objetoPaciente : pacientesState)

      Swal.fire({
        title: `¿Quieres editar los siguientes datos?`,
        text: `Actualizarás los datos de ${paciente.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: 'rgb(59 130 246)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Edítalo!'
      }).then((result) => {
        if (result.isConfirmed) {
            setPacientes(pacientesActualizados); //Se actualiza el cliente editado
            toast.success('Cliente Editado!')
            
            Swal.fire(
              'Editado!',
              'Se han editado los datos correctamente',
              'success'
              )
            } 
          })
          
          setPaciente({});
          
          
          
        }
        else{
          //Nuevo Registro
          objetoPaciente.id = generateID();
          setPacientes(pacientes => [...pacientes, objetoPaciente]);
          toast.success('Cliente Agregado!');
        }
        
    //Resetear el Formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setDatosAdicionales('');
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mb-10">
      <Toaster/>
      <h2 className="font-black text-xl text-center">Seguimiento Clientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''} 
        <span className="text-blue-500 font-bold">Administralos</span>
      </p>

      <form 
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-slate-100 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombreMascota">
            Nombre:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombreMascota"
            type="text"
            placeholder="Nombre del cliente . . ."
            value={nombre}
            onChange={ (e) => setNombre(e.target.value) }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="propietario">
            Nombre de la empresa:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="propietario"
            type="text"
            placeholder="Nombre de la empresa . . ."
            value={propietario}
            onChange={ (e) => setPropietario(e.target.value) }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Correo electrónico:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="e-mail . . ."
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Fecha:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            value={fecha}
            onChange={ (e) => setFecha(e.target.value) }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="datosAdicionales">
            Datos Adicionales:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="datosAdicionales"
            placeholder="Añade datos adicionales . . ."
            value={datosAdicionales}
            onChange={ (e) => setDatosAdicionales(e.target.value) }
          ></textarea>
        </div>
        <input
          type="submit"    
          className={ paciente.id ? "bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-full" 
          : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"}
          value={ paciente.id ? 'Editar Cliente' : 'Agregar Cliente'}
        />
      </form>
    </div>
  )
}

export default Formulario