import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEdit } from 'components/clientes';
import { Spinner } from 'components';
import { clientService, alertService } from 'services';

export default Edit;

function Edit() {
    const router = useRouter();
    const [client, setClient] = useState(null);

    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // fetch user and set default form values if in edit mode
        clientService.getById(id)
            .then(x => setClient(x))
            .catch(alertService.error)
    }, [router]);

    return (
        <Layout>
            <h1>Edit Client</h1>
            {client ? <AddEdit client={client} /> : <Spinner />}
        </Layout>
    );
}