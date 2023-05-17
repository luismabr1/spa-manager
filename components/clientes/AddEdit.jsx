import { useRouter } from 'next/router';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css// 
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import * as Yup from 'yup';

import { clientService, alertService } from 'services';
import Calendar from 'components/Calendar';

export { AddEdit };

function AddEdit(props) {
    const cliente = props?.cliente;
    const router = useRouter();

    // form validation rules 
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
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (cliente) {
        formOptions.defaultValues = props.cliente;
    }

    // get functions to build form with useForm() hook
    const { control, register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    async function onSubmit(data) {
        alertService.clear();
        try {
            // create or update user based on user prop
            let message;
            if (cliente) {
                await clientService.update(cliente.id, data);
                message = 'Client updated';
            } else {
                await clientService.register(data);
                message = 'Client added';
            }

            // redirect to user list with success message
            router.push('/clientes');
            alertService.success(message, true);
        } catch (error) {
            alertService.error(error);
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="mb-3 col">
                    <label className="form-label">First Name</label>
                    <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Ocupacion</label>
                    <input  name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Barrio</label>
                    <input  name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}  />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
                <div class="col-md-4">
                        <label for="validationServerUsername" className="form-label">Correo</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend3">@</span>
                            <input type="email" className="form-control is-invalid" id="validationServerUsername" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" required />
                            <div id="validationServerUsernameFeedback" className="invalid-feedback">
                                Ingrese un correo electronico valido.
                            </div>
                        </div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">Como se entero</label>
                   {/*  <input  name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}  /> */}
{/*                     <div className="invalid-feedback">{errors.lastName?.message}</div> */}
                    <select className={`form-control ${errors.lastName ? 'is-invalid' : ''} form-select size="7"`} name="how"  aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                    </select>
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">Tipo de consulta</label>
{/*                     <input  name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.lastName?.message}</div> */}
                    <select className={`form-control ${errors.lastName ? 'is-invalid' : ''} form-select size="7"`} name="how"  aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                    </select>
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Fecha de nacimiento</label>
 {/*                    <Calendar name='cita' className={`form-control ${errors.cita ? 'is-invalid' : ''}` } {...register('cita')}/>
                    <input name="cita" type="text" {...register('cita')}  />  */}
                    <Controller
                        control={control}
                        name='cita'
                        /* {...register('cita')} */
                        render={({ field }) => (
                        <DatePicker
                            placeholderText='Select date'
                            className={`form-control ${errors.cita ? 'is-invalid' : ''}` }
                           /*  onChange={(date) => field.onChange(date)} */
                            selected={field.value}
                            showIcon        
                            dateFormat="MM/dd/yyyy h:mm aa"      
                            showTimeSelect        
                            timeFormat="p"
                            locale="es-VE"
                        />
                    )}
                    />
            
                    <div className="invalid-feedback">{errors.cita?.message}</div>
                </div>



{/*                 <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input  name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}  />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div> */}
                
                <div className="mb-3 col">
                    <label className="form-label">Edad</label>
                    <input  name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}  />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
                <div className="mb-3 col">
{/*                 <input type="radio" id="html" name="sexo" value="HTML"/> */}
                    <label className="form-label">Sexo</label><br/>
                        <input type="radio" id="h" name="sexo" value="CSS" />
                        <label for="h">Hombre</label><br/>
                        <input type="radio" id="m" name="sexo" value="JavaScript" />
                        <label for="m">Mujer</label><br/>

                    {/* <input  name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}  /> */}
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">Telefono</label>
                    <input  name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}  />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">Celular</label>
                    <input  name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}  />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Cita</label>
 {/*                    <Calendar name='cita' className={`form-control ${errors.cita ? 'is-invalid' : ''}` } {...register('cita')}/>
                    <input name="cita" type="text" {...register('cita')}  />  */}
                    <Controller
                        control={control}
                        name='cita'
                        {...register('cita')}
                        render={({ field }) => (
                        <DatePicker
                            placeholderText='Select date'
                            className={`form-control ${errors.cita ? 'is-invalid' : ''}` }
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
            
                    <div className="invalid-feedback">{errors.cita?.message}</div>
                </div>
  
            </div>
            <div className="row">
{/*                 <div className="mb-3 input-group has-validation">
                    <label className="form-label">Username2</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''} is-invalid`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div> */}

                <div className="mb-3">
                    <label className="form-label">
                        Password
                        {cliente && <em className="ms-1">(Leave blank to keep the same password)</em>}
                    </label>
                    <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
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