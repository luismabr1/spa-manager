import React from 'react';
import jsPDF from 'jspdf';

function ExportToPDF({ clientes, clientId }) {
  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Estilos personalizados
    const titleStyle = {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    };

    const contentStyle = {
      fontSize: 12,
      marginBottom: 5,
    };

    // Coordenadas iniciales
    let x = 10;
    let y = 20;

    // Agregar título al PDF
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Lista de Clientes', x, y);
    y += 10;

    // Agregar información de cada cliente
    clientes.forEach((client) => {
      // Agregar nombre
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Nombre: ${client.firstName} ${client.lastName}`, x, y);
      y += 10;

      // Agregar username
      doc.text(`Username: ${client.username}`, x, y);
      y += 10;

      // Separador
      doc.setLineWidth(0.5);
      doc.line(x, y, 200, y);
      y += 10;
    });

    // Guardar el archivo PDF
    doc.save('clientes.pdf');
  };

  return (
    <button onClick={handleExportPDF} className="btn btn-primary">
      Exportar a PDF
    </button>
  );
}

export default ExportToPDF;