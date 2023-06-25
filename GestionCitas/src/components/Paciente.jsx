import {Toaster, toast} from 'react-hot-toast';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

const Paciente = ({paciente, setPaciente, eliminarPaciente, checkDeleteButton, setCheckDeleteButton}) => {

    const {nombre, propietario, email, fecha, datosAdicionales, id} = paciente

    const handleEliminar = ({nombre}) => {
        if(!checkDeleteButton)
        {
            Swal.fire({
                title: `¿Quieres eliminar a ${nombre}?`,
                text: "Esta acción no se puede revertir!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: 'rgb(59 130 246)',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminalo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarPaciente(id);  //llamar el prop y envia el id
                    setCheckDeleteButton(false);
                    Swal.fire(
                    'Eliminado!',
                    'El cliente ha sido eliminado correctamente',
                    'success'
                    )
                }
            })
        }
        else
        {
            toast.error('No puedes eliminar un cliente mientras estás editando!');
        }
    }

    return (
        <div className="w-full mx-auto p-6 bg-slate-100 rounded-lg shadow-lg mb-5 flex">
            <Toaster/>
            <div className="h-full w-4/5">
                <p className="text-gray-700 text-sm font-bold mb-2 uppercase">
                    Nombre: {''}
                    <span className="font-normal normal-case">{nombre}</span>
                </p>
                <p className="text-gray-700 text-sm font-bold mb-2 uppercase">
                    Propietario: {''}
                    <span className="font-normal normal-case">{propietario}</span>
                </p>
                <p className="text-gray-700 text-sm font-bold mb-2 uppercase">
                    Correo Electrónico: {''}
                    <span className="font-normal normal-case">{email}</span>
                </p>
                <p className="text-gray-700 text-sm font-bold mb-2 uppercase">
                    Fecha: {''}
                    <span className="font-normal normal-case">{fecha}</span>
                </p>
                <p className="text-gray-700 text-sm font-bold mb-2 uppercase">
                    Datos Adicionales: {''}
                    <span className="font-normal normal-case">{datosAdicionales}</span>
                </p>
            </div>
            <div className="flex flex-col h-full w-1/5 mt-6">
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-xl shadow mb-3" 
                    type="button"
                    onClick={ () => { setPaciente(paciente); setCheckDeleteButton(true); }}
                >Editar</button>

                <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-10 rounded-xl shadow"
                    type="button"
                    onClick={ () => handleEliminar({nombre}) }
                >Eliminar</button>
            </div>
        </div>
    )
}

export default Paciente
