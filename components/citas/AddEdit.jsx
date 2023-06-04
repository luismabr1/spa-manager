/*  import { useRouter } from 'next/router';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import * as Yup from 'yup';

import { citaService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {

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

      alertService.clear();
      try {

            let message;

                await citaService.register(data);
                message = 'Cita added';

               props.onSuccess(); // Cerrar el modal
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
                    <input name="clientId" value={clienteId} type="hidden" {...register('clientId')} className={`form-control ${errors.clientId ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.clientId?.message}</div>
                </div>
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
}  */

/* 
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from 'yup';
import { citaService } from 'services';
import { Tooltip as ReactTooltip } from 'react-tooltip'

export { AddEdit };

const AddEdit = (props) => {
  const [disabledDates, setDisabledDates] = useState([]);
  const [citas, setCitas] = useState([]);
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    async function fetchCitas() {
      try {
        const citas = await citaService.getAll();
        const disabledDates = citas.map(cita => new Date(cita.cita));
        setDisabledDates(disabledDates);
        setCitas(citas);
      } catch (error) {
        console.error('Error fetching citas:', error);
      }
    }

    fetchCitas();
  }, []);

  const validationSchema = Yup.object().shape({
    cita: Yup.date()
      .required('Fecha is required'),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: props.clienteId ? { ...props.clienteId } : {}
  };

      // get functions to build form with useForm() hook
      const { control, register, handleSubmit, reset, formState } = useForm(formOptions);
      const { errors } = formState;
  
      async function onSubmit(data) {
  
        alertService.clear();
        try {
  
              let message;
  
                  await citaService.register(data);
                  message = 'Cita added';
  
                 props.onSuccess(); // Cerrar el modal
                 router.push('/clientes');  
  
              alertService.success(message, true);
          } catch (error) {
              alertService.error(error);
              console.error(error);
          }
      };
      useEffect(() => {
        const disableTooltips = () => {
          const tooltipNodes = document.querySelectorAll('.tooltip-trigger');
          tooltipNodes.forEach((node) => {
            node.setAttribute('data-tip-disable', true);
          });
        };
      
        disableTooltips();
      
        return () => {
          const tooltipNodes = document.querySelectorAll('.tooltip-trigger');
          tooltipNodes.forEach((node) => {
            node.removeAttribute('data-tip-disable');
          });
        };
      }, []);

      useEffect(() => {
        const fetchClientIdByDate = async (formattedDate) => {
          try {
            const clientId = await getCitaByDate(formattedDate);
            setClientId(clientId);
          } catch (error) {
            console.error('Error fetching clientId:', error);
          }
        };
    
        const tooltipNodes = document.querySelectorAll('.tooltip-trigger');
        tooltipNodes.forEach((node) => {
          const formattedDate = node.textContent;
          fetchClientIdByDate(formattedDate);
        });
      }, []);

      return (
        <>
          <ReactTooltip multiline={true} effect="solid" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Cita</label>
              <Controller
                control={control}
                name="cita"
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Select date"
                    className={`form-control ${errors.cita ? 'is-invalid' : ''}`}
                    dayClassName={(date) =>
                      disabledDates.includes(date.toDateString()) ? 'disabled-date' : ''
                    }
                    renderDayContents={(day, date) => {
                      const formattedDate = date.toDateString();
                      const tooltipId = `tooltip-${formattedDate}`;
                      const showTooltip = clientId !== '' && tooltipId === `tooltip-${formattedDate}`;
                      
                      return (
                        <div
                          className="tooltip-trigger"
                          data-tip={clientId}
                          data-for={tooltipId}
                          onMouseEnter={() => {
                            if (showTooltip) {
                              ReactTooltip.rebuild();
                            }
                          }}
                        >
                          {day}
                          {showTooltip && <ReactTooltip id={tooltipId} />}
                        </div>
                      );
                    }}
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    showIcon
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeSelect
                    timeFormat="p"
                    excludeDates={disabledDates}
                  />
                )}
              />
              <div className="invalid-feedback">{errors.cita?.message}</div>
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
        </>
      );
}; */

import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import { citaService } from 'services';

export { AddEdit };

const AddEdit = (props) => {
  const [disabledDates, setDisabledDates] = useState([]);
  const [citas, setCitas] = useState([]);
  const [hoveredDate, setHoveredDate] = useState(null);

  useEffect(() => {
    async function fetchCitas() {
      try {
        const citas = await citaService.getAll();
        const disabledDates = citas.map((cita) => new Date(cita.cita));
        setDisabledDates(disabledDates);
        setCitas(citas);
      } catch (error) {
        console.error('Error fetching citas:', error);
      }
    }

    fetchCitas();
  }, []);

  const validationSchema = Yup.object().shape({
    cita: Yup.date().required('Fecha is required'),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: props.clienteId ? { ...props.clienteId } : {},
  };

  const { control, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const handleHover = (date) => {
    setHoveredDate(date);
  };

  const handleResetHover = () => {
    setHoveredDate(null);
  };

  const renderDayContents = (day, date) => {
    const formattedDate = date.toDateString();
    const isDisabled = disabledDates.some(disabledDate =>
      disabledDate.toDateString() === formattedDate
    );
  
    const dayClass = isDisabled ? 'disabled-date' : '';
    const hoveredClass = isDisabled && hoveredDate === formattedDate ? 'hovered' : '';
  
    return (
      <div
        className={`calendar-day ${dayClass} ${hoveredClass}`}
        onMouseEnter={() => handleHover(formattedDate)}
        onMouseLeave={handleResetHover}
      >
        {day}
      </div>
    );
  };

  const onSubmit = async (data) => {
    alertService.clear();
    try {
      await citaService.register(data);
      const message = 'Cita added';
      props.onSuccess();
      router.push('/clientes');
      alertService.success(message, true);
    } catch (error) {
      alertService.error(error);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">Cita</label>
        <Controller
          control={control}
          name="cita"
          render={({ field }) => (
            <DatePicker
              placeholderText="Select date"
              className={`form-control ${errors.cita ? 'is-invalid' : ''}`}
              dayClassName={(date) =>
                disabledDates.includes(date) ? 'disabled-date' : ''
              }
              renderDayContents={renderDayContents}
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              showIcon
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeSelect
              timeFormat="p"
              excludeDates={disabledDates}
            />
          )}
        />
        <div className="invalid-feedback">{errors.cita?.message}</div>
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
};

