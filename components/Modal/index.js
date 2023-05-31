import React, {useEffect,useState} from 'react';
import  moment from 'moment';
import ExportToPDF from 'components/ExportToPDF';
import { AddEdit } from 'components/citas';
import { citaService } from 'services';


const Modal = ({clientId, clientes}) => {
  const [appointment, setCitas] = useState('')
  useEffect(() => {
    async function fetchCitas() {
      try {
/*         console.log('cliente que pido cita',clientId) */
        const citas = await citaService.getCitaByClientId(clientId);

/*          console.log('modal fetchcita', citas) */
        setCitas(citas); 
        /*  */
      } catch (error) {
        console.error('Error fetching citas:', error);
      }
    }
  
    fetchCitas();
  }, [clientId]);  

    return (
        <>


<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={'#modal'+ clientId}>
Consultar
</button>

<div className="modal fade" id={'modal'+ clientId} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Consultar</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        { appointment 
         ? moment.utc(appointment).format('MMMM/Do/YYYY, h:mm:ss a')
         :
         <AddEdit clientId={clientId} citaId={appointment}/>
        }

      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <ExportToPDF clientes={clientes} id={clientId} />
      </div>
    </div>
  </div>
</div>
        </>
    );
};

export default Modal; 
