/* import React, {useEffect,useState} from 'react';
import  moment from 'moment';
import ExportToPDF from 'components/ExportToPDF';
import { AddEdit } from 'components/citas';
import { citaService } from 'services';


const Modal = ({clientId, clientes}) => {
  const [appointment, setCitas] = useState('')
  useEffect(() => {
    async function fetchCitas() {
      try {

        const citas = await citaService.getCitaByClientId(clientId);


        setCitas(citas); 

      } catch (error) {
        console.error('Error fetching citas:', error);
      }
    }
  
    fetchCitas();
  }, [clientId]); 
  
  const handleAddEditSuccess = () => {
    const modalElement = document.getElementById(`modal${clientId}`);
    const modalInstance = new bootstrap.Modal(modalElement);

    modalInstance.hide(); // Cerrar el modal

    const backdropElement = document.querySelector('.modal-backdrop');
    backdropElement.remove(); // Eliminar el modal-backdrop
  };

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
         <AddEdit clientId={clientId} citaId={appointment} onSuccess={handleAddEditSuccess} />
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

export default Modal;   */

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ExportToPDF from 'components/ExportToPDF';
import { AddEdit } from 'components/citas';
import { citaService } from 'services';

const Modal = ({ clientId, clientes }) => {
  const [appointment, setCitas] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchCitas() {
      try {
        const citas = await citaService.getCitaByClientId(clientId);
        setCitas(citas);
      } catch (error) {
        console.error('Error fetching citas:', error);
      }
    }

    fetchCitas();
  }, [clientId]);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddEditSuccess = () => {
    handleToggleModal(); // Cerrar el modal
  };

  const handleCloseModal = () => {
    const modalElement = document.getElementById(`modal${clientId}`);
    modalElement.style.display = 'none'; // Ocultar el modal

    const backdropElement = document.getElementsByClassName('modal-backdrop')[0];
    backdropElement.parentNode.removeChild(backdropElement); // Eliminar el modal-backdrop del DOM
  };

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={handleToggleModal}>
        Consultar
      </button>

      <div className={`modal fade ${showModal ? 'show' : ''}`} id={`modal${clientId}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Consultar</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {appointment ? (
                moment.utc(appointment).format('MMMM/Do/YYYY, h:mm:ss a')
              ) : (
                <AddEdit clientId={clientId} citaId={appointment} onSuccess={handleAddEditSuccess} />
              )}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>
                Close
              </button>
              <ExportToPDF clientes={clientes} id={clientId} />
            </div>
          </div>
        </div>
      </div>

      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default Modal;
