import React, {useEffect} from 'react';
import  moment from 'moment';
import ExportToPDF from 'components/ExportToPDF';
import { AddEdit } from 'components/citas';


const Modal = ({citas, id, clientes}) => {
   useEffect(() => {
    async function fetchCitas() {
      try {
        const citas = await clientsRepo.getCitasByClientId(id);
        setCitas(citas);
      } catch (error) {
        console.error('Error fetching citas:', error);
      }
    }
  
    fetchCitas();
  }, [id]);  

    return (
        <>


<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={'#modal'+ id}>
Consultar
</button>

<div className="modal fade" id={'modal'+ id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Consultar</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
         {moment.utc(citas).format('MMMM/Do/YYYY, h:mm:ss a')}
      </div>

         <AddEdit clientId={id}/>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <ExportToPDF clientes={clientes} id={id} />
      </div>
    </div>
  </div>
</div>
        </>
    );
};

export default Modal; 
