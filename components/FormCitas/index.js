import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormCitas = ({ clientId, existingAppointments, createCitas }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isAppointmentAlreadyAdded = () => {
    return existingAppointments.some(appointment => appointment === selectedDate);
  };

  const handleFormSubmit = () => {
    if (isAppointmentAlreadyAdded()) {
      alert('La cita seleccionada ya ha sido agregada anteriormente.');
      return;
    }

    const formData = {
      clientId: clientId,
      cita: selectedDate
    };
    createCitas(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label htmlFor="appointment">Cita</label>
        <DatePicker
          id="appointment"
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="p"
          timeIntervals={15}
          dateFormat="Pp"
        />
        {errors.appointment && <span className="error">Debe seleccionar una fecha y hora válida</span>}
      </div>
      <button type="submit">Guardar cita</button>
    </form>
  );
};

export default FormCitas;