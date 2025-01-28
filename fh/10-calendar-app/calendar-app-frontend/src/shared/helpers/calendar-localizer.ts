
import { dateFnsLocalizer } from 'react-big-calendar';
import { getDay, startOfWeek, parse, format,  } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
//  import { enES } from 'date-fns/locale/es';

const locales = {
  'en-US': enUS,
}

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const getESMessages = () => {
  return {
    allDay: 'Todo el día',
    previous: '<',
    next: '>',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango',
    showMore: (total: any) => `+ Ver más (${total})`
  };
}
