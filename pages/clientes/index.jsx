import Link from 'next/link';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Spinner } from 'components';
import { Layout } from 'components/clientes';
import Modal from 'components/Modal'
import { clientService } from 'services';
export default Index;

function Index() {
    const [clients, setClients] = useState('');
    const [searchTerm, setSearchTerm] = useState(null);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [debounceTimer, setDebounceTimer] = useState(null);

    const handleChangeSearchTerm = useCallback((e) => {
        const value = e.target.value;
        setSearchTerm(value);
    // Cancelar el temporizador existente
    if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

          // Iniciar un nuevo temporizador
    const timer = setTimeout(() => {
        setDebouncedSearchTerm(value);
      }, 300);
    
      setDebounceTimer(timer);
    }, []);

    const filteredClients = useMemo(() => {
        if (searchTerm) {
          return clients.filter((client) => {
            const idNumber = client.id_number ? client.id_number.toString() : ''; // Convertir a cadena si existe, de lo contrario usar cadena vacía
            return(
                client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                idNumber.includes(searchTerm.toLowerCase())
            )
          }
          );
        } else {
          return clients;
        }
      }, [searchTerm, clients]);

        
      useEffect(() => {
    // Obtener los clientes cuando cambia el debouncedSearchTerm
    if (debouncedSearchTerm !== null) {
        clientService.getAll().then((x) => setClients(x));
      }
    }, [debouncedSearchTerm]);

const deleteClient = useCallback((id) => {
  setClients((prevClients) => {
    return prevClients.map((client) => {
      if (client.id === id) {
        return { ...client, isDeleting: true };
      }
      return client;
    });
  });

  clientService.delete(id).then(() => {
    setClients((prevClients) => prevClients.filter((client) => client.id !== id));
  });
}, [clients]); // Agregar "clients" como dependencia

    return (
        
        <>
        <div className='container-sm' style={{ width: '300px' }}>
        <h1>Clients</h1>

                    <Link href="/clientes/add" className="btn btn-sm btn-success mb-2">Add Client</Link><br/>
                    <form className="d-flex">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleChangeSearchTerm}
                        />
                    </form>

        </div>
<Layout>

<div id="accordion">
{filteredClients && filteredClients.map(client =>

                <div className="card" key={client.id} style={{ width: '500px' }}>
                <div className="card-header" >

                    <a className="btn" style={{ width: '100%' }} data-bs-toggle="collapse" href={"#collapse" + client.id} >
                    <span >
                                <h4 className="blockquote" >
                                    {client.id_number}
                                </h4>
                    </span>
                    </a>
                </div>
                <div id={"collapse" + client.id}  className="collapse" data-bs-parent="#accordion">
                    <div className="card-body" >
                    <table className="table table-striped" >
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
                                                        <td>{client.id_number}</td>
                                                        <td>{  <Modal clientId={client.id} />  }</td>
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





)}
                </div> 

{!filteredClients &&
    <Spinner />
}

{filteredClients && !filteredClients.length &&
    <div className="text-center">
        <div className="p-2">No Clients To Display</div>
    </div>
}
</Layout>


        
        </>
        

    )



} 