import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarStore, useUiStore } from '../../../core';
import { Events } from '../../../core/store/calendar/calendarSlice';

registerLocale('es', es)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = (): JSX.Element => {

  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const [isSubmited, setIsSubmited] = useState<boolean>(false);

  const [form, setForm] = useState<Events>({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
    user: {
      _id: '',
      name: ''
    },
    bgColor: '#fafafa',
  });

  const titleClass = useMemo(() => {
    if (!isSubmited) return '';
    return (form.title.trim().length > 0) ? '' : 'is-invalid';
  }, [form.title, isSubmited]);

  useEffect(() => {
    if (activeEvent !== null) {
      setForm({ ...activeEvent });
    }
  }, [activeEvent]);

  const onCloseModal = () => {
    closeDateModal();
    console.log('Cerrando modal');
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  const onDateChange = (event: Date | null, changing: any) => {
    setForm({ ...form, [changing]: event });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmited(true);
    // Fecha final debe ser mayor a la inicial
    const diference = differenceInSeconds(form.end, form.start);
    // console.log(diference)
    if (isNaN(diference) || diference <= 0) {
      Swal.fire('Fechas incorrectas', 'Por favor revisar dichos campos del formulario', 'error');
      return;
    }
    if (form.title.trim().length === 0) return;
    console.log(form);
    await startSavingEvent(form);
    onCloseModal();
    setIsSubmited(false);
  }
  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className='modal'
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>

        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <br />
          <DatePicker
            selected={form.start}
            className='form-control'
            onChange={(event) => onDateChange(event, 'start')}
            showTimeSelect
            timeCaption='hora'
            locale={'es'}
            dateFormat={'Pp'}
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <br />
          <DatePicker
            minDate={form.start}
            selected={form.end}
            className='form-control'
            onChange={(event) => onDateChange(event, 'end')}
            showTimeSelect
            timeCaption='hora'
            locale={'es'}
            dateFormat={'Pp'} />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={form.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={form.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}
