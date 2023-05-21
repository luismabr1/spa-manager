import React, {useState, useEffect} from 'react';
import moment from 'moment';
import ExportToPDF from 'components/ExportToPDF';
import { clientsRepo } from 'helpers/api';

const Modal = ({ id, clientes }) => {
  const [citas, setCitas] = useState([]);

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

   const createCita = async () => {
    try {
      // Lógica para crear una nueva cita asociada al ID del cliente
      await clientsRepo.createCita(id);
      // Actualizar la lista de citas después de crear una nueva cita
      const updatedCitas = await clientsRepo.getCitasByClientId(id);
      setCitas(updatedCitas);
    } catch (error) {
      console.error('Error creating cita:', error);
    }
  };  

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
            {citas.length > 0 ? (
              <div className="modal-body">
                {citas.map((cita) => (
                  <div key={cita._id}>
                    {moment.utc(cita.fecha).format('MMMM/Do/YYYY, h:mm:ss a')}
                  </div>
                ))}
              </div>
            ) : (
              <div className="modal-body">
                No hay citas disponibles.
              </div>
            )}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              {citas.length > 0 && <ExportToPDF clientes={citas} id={id} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;