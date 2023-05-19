import Link from 'next/link';
import { useState, useEffect } from 'react';
import  moment from 'moment';
import { Spinner } from 'components';
import { Layout } from 'components/clientes';
import Modal from 'components/Modal'
import { clientService } from 'services';

export default Index;

function Index() {
    const [clients, setClients] = useState(null);

    useEffect(() => {
        clientService.getAll().then(x => setClients(x));
    }, []);

    function deleteClient(id) {
        setClients(clients.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        clientService.delete(id).then(() => {
            setClients(clients => clients.filter(x => x.id !== id));
        });
    }

    return (
        <Layout>
            <h1>Clients</h1>

            <Link href="/clientes/add" className="btn btn-sm btn-success mb-2">Add Client</Link><br/>
 {clients && clients.map(client =>
            <div className='container-sm align-items-center pe-auto btn btn-outline-primary' id='accordion' data-bs-toggle="collapse" data-bs-target={'#collapse'+client.id} aria-expanded="true" aria-controls="collapseOne" key={client.id}>
                <div className='col' id="headingOne">
                    <span>
                        <h5 className="blockquote" >
                            {client.username}
                        </h5>
                    </span>
                </div>
            <div className="card row align-items-start">

            <div id= {'collapse'+ client.id}   className="collapse" aria-labelledby="headingOne" data-bs-parent="#accordion" >
                <div className="card-body">
                <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th style={{ width: '22%' }}>First Name</th>
                                    <th style={{ width: '22%' }}>Last Name</th>
                                    <th style={{ width: '22%' }}>Username</th>
                                    <th style={{ width: '22%' }}>Cita</th>
                                    <th style={{ width: '2%' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                          
                                    <tr key={client.id}>
                                        <td>{client.firstName}</td>
                                        <td>{client.lastName}</td>
                                        <td>{client.username}</td>
                                        <td>{/* {moment.utc(client.cita).format('MMMM/Do/YYYY, h:mm:ss a')} */}<Modal citas={client.cita} id={client.id} /></td>
                                        <td style={{ whiteSpace: 'nowrap' }}>
                                            <Link href={`/clientes/edit/${client.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                                            <button onClick={() => deleteClient(client.id)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={client.isDeleting}>
                                                {client.isDeleting
                                                    ? <span className="spinner-border spinner-border-sm"></span>
                                                    : <span>Delete</span>
                                                }
                                            </button>
                                        </td>
                                    </tr>
          
                                {!clients &&
                                    <tr>
                                        <td colSpan="4">
                                            <Spinner />
                                        </td>
                                    </tr>
                                }
                                {clients && !clients.length &&
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            <div className="p-2">No Clients To Display</div>
                                        </td>
                                    </tr>
                                }


                            </tbody>
                        </table>
                </div>
                </div>
            </div>

            </div>

)}      

        </Layout>
    );



}
 <div id="accordion">

  <div class="card">
    <div class="card-header">
      <a class="btn" data-bs-toggle="collapse" href="#collapseOne">
        Collapsible Group Item #1
      </a>
    </div>

    <div id="collapseOne" class="collapse show" data-bs-parent="#accordion">
      <div class="card-body">
        Lorem ipsum..
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <a class="collapsed btn" data-bs-toggle="collapse" href="#collapseTwo">
        Collapsible Group Item #2
      </a>
    </div>
    <div id="collapseTwo" class="collapse" data-bs-parent="#accordion">
      <div class="card-body">
        Lorem ipsum..
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <a class="collapsed btn" data-bs-toggle="collapse" href="#collapseThree">
        Collapsible Group Item #3
      </a>
    </div>
    <div id="collapseThree" class="collapse" data-bs-parent="#accordion">
      <div class="card-body">
        Lorem ipsum..
      </div>
    </div>
  </div>

</div> 