import Link from 'next/link';
import { useState, useEffect } from 'react';
import  moment from 'moment';
import { Spinner } from 'components';
import { Layout } from 'components/clientes';
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
            <Link href="/clientes/add" className="btn btn-sm btn-success mb-2">Add Client</Link>

 {clients && clients.map(client =>
            <div id="accordion" key={client.id}>
            <div class="card">
                <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                    <button class="btn btn-link" data-bs-toggle="collapse" data-bs-target={'#collapse'+client.id} aria-expanded="true" aria-controls="collapseOne">
                    {client.username}
                    </button>
                </h5>
                </div>

            <div id= {'collapse'+ client.id}   class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">
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
                                        <td>{moment.utc(client.cita).format('MMMM/Do/YYYY, h:mm:ss a')}</td>
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
