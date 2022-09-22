import { useState, useEffect } from 'react'
import { generarId } from '../helpers'

import Filtros from './components/Filtros';
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';


import IconoNuevoGasto from './img/nuevo-gasto.svg';


function App() {
  const [gastos, setGastos] = useState(
   localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [presupuesto, setPresupuesto] = useState( 
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro]= useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if( Object.keys(gastoEditar).length > 0  ){
      //console.log('Editando gastos');
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
  
    }
  }, [gastoEditar])
  

  const handleNuevoGasto = () => {
    // console.log('Diste click para agg un new gasto')
    setModal(true)
    setGastoEditar({})
    
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);

  }

  useEffect( ()=> {
    localStorage.setItem('presupuesto', presupuesto)
  }, [presupuesto] )

  useEffect( ()=> {
    localStorage.setItem('gastos', JSON.stringify(gastos) )
  }, [gastos] )

  useEffect( ()=>{
   // console.log('Filtrando...', filtro)
   //Filtrar datos por categoria

    if (filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro )
      setGastosFiltrados(gastosFiltrados);
    }

  }, [filtro])

  useEffect( ()=> {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if (presupuestoLS > 0 ) {
      setIsValidPresupuesto(true)
    }
  }, [] )

  const guardarGasto = gasto => {

    if (gasto.id  ) {
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState )
      setGastos(gastosActualizados); 
      setGastoEditar({});
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false);
    }, 500);

  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id );

    setGastos(gastosActualizados)
  }

  return (
    <div className={modal && 'fijar'}>
      <Header
        presupuesto={presupuesto}
        setGastos = {setGastos}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
      />

      {isValidPresupuesto && (
        <>
        <main>
          <Filtros 
            filtro= {filtro}
            setFiltro = {setFiltro}
          />
          <ListadoGastos
            gastos={gastos}
            setGastoEditar= {setGastoEditar}
            eliminarGasto = {eliminarGasto}
            filtro={filtro}
            gastosFiltrados= {gastosFiltrados}
          />
        </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt="Icono Nuevo Gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar = {gastoEditar}
          setGastoEditar= {setGastoEditar}
        />
      )}

    </div>
  )
}

export default App
