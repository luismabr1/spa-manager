import React from 'react';
import  moment from 'moment';

const Modal = ({citas, id}) => {
    return (
        <>


<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={'#modal'+ id}>
Consultar
</button>

<div className="modal fade" id={'modal'+ id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Imprimir</button>
      </div>
    </div>
  </div>
</div>
        </>
    );
};

export default Modal;