import { useRouter } from 'next/router';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import * as Yup from 'yup';

import { citaService, alertService } from 'services';
import Calendar from 'components/Calendar';

export { AddEdit };

function AddEdit(props) {
    const cliente = props?.clientId;
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        cita: Yup.string()
            .required('Fecha is required'),
    });

    const formOptions = {
        resolver: yupResolver(validationSchema),
        defaultValues: cliente ? { ...cliente } : {}
    };

    // set default form values if in edit mode
    if (cliente) {
        formOptions.defaultValues = props.cliente;
    }

    // get functions to build form with useForm() hook
    const { control, register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = async (data) => {
        alertService.clear();
        try {
            let message;
            if (cliente) {
                await citaService.update(cliente.id, data);
                message = 'Cita updated';
            } else {
                await citaService.register(data);
                message = 'Cita added';
            }
            router.push('/clientes');
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <input type="hidden" value={clientId}  />
           <div className="mb-3">
              <label className="form-label">Cita</label>
              <Controller
                control={control}
                name="appointment"
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Select date"
                    className={`form-control ${errors.appointment ? 'is-invalid' : ''}`}
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    showIcon
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeSelect
                    timeFormat="p"
                    locale="es-VE"
                  />
                )}
              />
              <div className="invalid-feedback">{errors.appointment?.message}</div>
            </div>
          </div>

          <div className="mb-3">
            <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
              {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
              Save
            </button>
            <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
            <Link href="/clientes" className="btn btn-link">Cancel</Link>
          </div>
        </form>
      );
}


   