import { useState } from 'react';
import Mensaje from './Mensaje';


const NuevoPresupuesto = ({ 
    presupuesto, 
    setPresupuesto,
    setIsValidPresupuesto
}) => {
    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault();
        // console.log('Enviando Formulario')

        if (!presupuesto || presupuesto < 0) {
            setMensaje('NO ES UN PRESUPUESTO VÁLIDO');
            return 
        }
        setMensaje('');
        setIsValidPresupuesto(true);
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={handlePresupuesto} className="formulario">
                <div className="campo">
                    <label >Definir Presupuesto</label>
                    <input
                        type="number"
                        className="nuevo-presupuesto"
                        placeholder="Anade tu Presupuesto"
                        value={presupuesto}
                        onChange={e => setPresupuesto( Number(e.target.value))}
                    />
                </div>
                <input type="submit" value="Anadir" />
               {mensaje && <Mensaje tipo="error"> {mensaje}</Mensaje>} 
            </form>

        </div>
    )
}

export default NuevoPresupuesto