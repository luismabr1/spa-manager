import { useRouter } from 'next/router';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import * as Yup from 'yup';

import { clientService, alertService } from 'services';
import Calendar from 'components/Calendar';

export { AddEdit };

function AddEdit(props) {
    const cliente = props?.cliente;
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        username: Yup.string()
            .required('Username is required'),
        cita: Yup.string()
            .required('Fecha is required'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            // password optional in edit mode
            .concat(cliente ? null : Yup.string().required('Password is required'))
            .min(6, 'Password must be at least 6 characters')
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
                await clientService.update(cliente.id, data);
                message = 'Client updated';
            } else {
                await clientService.register(data);
                message = 'Client added';
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
            <div className="mb-3 col">
              <label className="form-label">First Name</label>
              <input
                name="firstName"
                type="text"
                {...register('firstName')}
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
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
            <div className="col-md-4">
              <label htmlFor="validationServerUsername" className="form-label">Correo</label>
              <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend3">@</span>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="validationServerUsername"
                  aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                  required
                  {...register('email')}
                />
                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                  Ingrese un correo electrónico válido.
                </div>
              </div>
            </div>
            <div className="mb-3 col">
              <label className="form-label">Cómo se enteró</label>
              <select
                className={`form-control ${errors.how ? 'is-invalid' : ''} form-select`}
                name="how"
                aria-label="Default select example"
                {...register('how')}
              >
                <option selected >Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <div className="invalid-feedback">{errors.how?.message}</div>
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
                name="birthdate"
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Select date"
                    className={`form-control ${errors.birthdate ? 'is-invalid' : ''}`}
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
              <div className="invalid-feedback">{errors.birthdate?.message}</div>
            </div>
      
            <div className="mb-3 col">
              <label className="form-label">Edad</label>
              <input
                name="age"
                type="text"
                {...register('age')}
                className={`form-control ${errors.age ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.age?.message}</div>
            </div>
            <div className="mb-3 col">
              <label className="form-label">Sexo</label><br/>
              <input type="radio" id="h" name="gender" value="Hombre" {...register('gender')} />
              <label htmlFor="h">Hombre</label><br/>
              <input type="radio" id="m" name="gender" value="Mujer" {...register('gender')} />
              <label htmlFor="m">Mujer</label><br/>
              <div className="invalid-feedback">{errors.gender?.message}</div>
            </div>
            <div className="mb-3 col">
              <label className="form-label">Teléfono</label>
              <input
                name="phone"
                type="text"
                {...register('phone')}
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.phone?.message}</div>
            </div>
            <div className="mb-3 col">
              <label className="form-label">Celular</label>
              <input
                name="cellphone"
                type="text"
                {...register('cellphone')}
                className={`form-control ${errors.cellphone ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.cellphone?.message}</div>
            </div>
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
          <div className="row">
            <div className="mb-3">
              <label className="form-label">
                Password
                {cliente && <em className="ms-1">(Leave blank to keep the same password)</em>}
              </label>
              <input
                name="password"
                type="password"
                {...register('password')}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
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


   