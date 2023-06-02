import { useRouter } from 'next/router';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import * as Yup from 'yup';

import { clientService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const cliente = props?.cliente;
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        id_number: Yup.string()
          .required('Identifier is required'),
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        ocupacion: Yup.string()
            .required('Ocupacion is required'),
        barrio: Yup.string()
            .required('Barrio is required'),
        email: Yup.string()
            .required('Correo is required'),
       howYouKnowIt: Yup.string()
            .required('Username is required'), 
            consultType: Yup.string()
            .required('Fecha is required'),
       birthDate: Yup.date()
            .required('Username is required'), 
       age: Yup.string()
            .required('Username is required'),
       gender: Yup.string()
            .required('Fecha is required'),
       phone: Yup.string()
            .required('Fecha is required'),
       cellphone: Yup.string()
            .required('Fecha is required'),
/*
        cellphone: Yup.string()
            .required('Fecha is required'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            // password optional in edit mode
            .concat(cliente ? null : Yup.string().required('Password is required'))
            .min(6, 'Password must be at least 6 characters')*/
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
    const onInvalid = (errors) => console.error(errors)
      const onSubmit = async (data) => {
        alertService.clear();
        try {
            let message;
/*             await clientService.update(cliente.id, data);
                message = 'Client updated'; 
            } else {   */
/*             if (cliente) {
                await clientService.update(cliente.id, data);
                message = 'Client updated';
            } else { */
                await clientService.register(data);
                message = 'Client added';
/*             } */
            router.push('/clientes');
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
        }
    }; 
 
/*      const onSubmit = async data => {console.log(data)};  */

    return (
        <form  onSubmit={handleSubmit(onSubmit, onInvalid)}   /* onSubmit = {event => console.log (event)} */ >
          <div className="row">
          <div className="mb-3 col">
              <label className="form-label">Numero de Identidad</label>
              <input
                name="id_number"
                type="text"
                className={`form-control ${errors.id_number ? 'is-invalid' : ''}`}
                {...register('id_number')}
              />
              <div className="invalid-feedback">{errors.id_number?.message}</div>
            </div>
            <div className="mb-3 col">
              <label className="form-label">First Name</label>
              <input
                name="firstName"
                type="text"
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                {...register('firstName')}
              />
              <div className="invalid-feedback">{errors.firstName?.message}</div>
            </div>
           <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                name="lastName"
                type="text"
                {...register('lastName')}
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.lastName?.message}</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Ocupacion</label>
              <input
                name="ocupacion"
                type="text"
                {...register('ocupacion')}
                className={`form-control ${errors.ocupacion ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.ocupacion?.message}</div>
            </div>
                      
            <div className="mb-3">
              <label className="form-label">Barrio</label>
              <input
                name="barrio"
                type="text"
                {...register('barrio')}
                className={`form-control ${errors.barrio ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.barrio?.message}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="validationServerMail" className="form-label">Correo</label>
              <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend3">@</span>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="validationServerMail"
                  aria-describedby="inputGroupPrepend3 validationServerMailFeedback"
                  required
                  {...register('email')}
                />
                <div id="validationServerMailFeedback" className="invalid-feedback">
                  Ingrese un correo electrónico válido.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Cómo se enteró</label>
              <select
                className={`form-control ${errors.how ? 'is-invalid' : ''} form-select`}
                name="howYouKnowIt"
                aria-label="Default select example"
                {...register('howYouKnowIt')}
              >
                <option selected >Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <div className="invalid-feedback">{errors.howYouKnowIt?.message}</div>
            </div>

            <div className="mb-3 col">
              <label className="form-label">Tipo de consulta</label>
              <select
                className={`form-control ${errors.consultType ? 'is-invalid' : ''} form-select`}
                name="consultType"
                aria-label="Default select example"
                {...register('consultType')}
              >
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <div className="invalid-feedback">{errors.consultType?.message}</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha de nacimiento</label>
              <Controller
                control={control}
                name="birthDate"
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Select date"
                    className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    showIcon
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeSelect
                    timeFormat="p"
                  />
                )}
              /> 
              <div className="invalid-feedback">{errors.birthDate?.message}</div>
            </div>

            <div className="mb-3">
                <select className={`form-control ${errors.consultType ? 'is-invalid' : ''} form-select`}{...register("gender")} aria-label="Default select example">
                  <option selected>Open this select menu</option>
                  <option value="female">female</option>
                  <option value="male">male</option>
                  <option value="other">other</option>
                </select>
              <div className="invalid-feedback">{errors.gender?.message}</div>
            </div>

            <div className="mb-md-2">
              <label className="form-label">Edad</label>
              <input
                name="age"
                type="text"
                {...register('age')}
                className={`form-control ${errors.age ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.age?.message}</div>
            </div>



            <div className="mb-2 col">
              <label className="form-label">Teléfono</label>
              <input
                name="phone"
                type="text"
                {...register('phone')}
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.phone?.message}</div>
            </div>

            <div className="mb-2 col">
              <label className="form-label">Celular</label>
              <input
                name="cellphone"
                type="text"
                {...register('cellphone')}
                className={`form-control ${errors.cellphone ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.cellphone?.message}</div>
            </div>
          </div>
          
          <div className="mb-3">
            <button  type="submit"  /* onClick={handleSubmit(onSubmit)} */  disabled={formState.isSubmitting} className="btn btn-primary me-2">
               {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
              Save
            </button>
            <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
            <Link href="/clientes" className="btn btn-link">Cancel</Link>
          </div>
        </form>
      );  
}



   