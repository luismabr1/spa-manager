 import { useRouter } from 'next/router';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import * as Yup from 'yup';
import Modal from 'components/Modal';

import { citaService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
/*     console.log('estoy en el addedit de citas',props) */
    const clienteId = props?.clientId;
    const citaId = props?.citaId
    const router = useRouter();

    const validationSchema = Yup.object().shape({
      cita: Yup.string()
      .required('Fecha is required'),
    });

    const formOptions = {
        resolver: yupResolver(validationSchema),
        defaultValues: clienteId ? { ...clienteId } : {} 
    };

    // set default form values if in edit mode
    if (clienteId) {
        formOptions.defaultValues = props.clienteId;
    }

    // get functions to build form with useForm() hook
    const { control, register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    async function onSubmit(data) {
/*       console.log('estoy en addEdit', clienteId, citaId) */
      alertService.clear();
      try {
/*           console.log('del form addedit', data) */
            let message;
/*             if (await citaService.getById(clienteId)) { */
                /*await citaService.update(citaId, data);
                message = 'Cita updated'; */
                const add = await citaService.register(data);
                message = 'Cita added';
/*             } */
Modal.hide()
if(add){
  router.reload
}
/* router.push('/clientes'); */
            /* router.push('/clientes'); */
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row"> 
          <div className="mb-3 col">
                    <input name="clientId" value={clienteId} type="hidden" {...register('clientId')} className={`form-control ${errors.clientId ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.clientId?.message}</div>
                </div>
            {/* <input type="hidden" value={clienteId} name="clientId" {...register('clientId')} /> */}
           <div className="mb-3">
              <label className="form-label">Cita</label>
              <Controller
                control={control}
                name="cita"
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Select date"
                    className={`form-control ${errors.cita ? 'is-invalid' : ''}`}
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    showIcon
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeSelect
                    timeFormat="p"
                    /* locale="es-VE" */
                  />
                )}
              />
              <div className="invalid-feedback">{errors.cita?.message}</div>
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


   