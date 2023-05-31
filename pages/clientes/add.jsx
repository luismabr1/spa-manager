import { Layout, AddEdit } from 'components/clientes';

export default Add;

function Add() {
    return (
        <Layout>
            <h1>Agregar Cliente</h1>
            <AddEdit />
        </Layout>
    );
}