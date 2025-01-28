import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../../core"

export const FabAddNew = (): JSX.Element => {

  const { openDateModal } = useUiStore();
  const { handleSetActiveEvent } = useCalendarStore();

  const handleNewEvent = (): void => {
    handleSetActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      user: {
        _id: 'adsdadas',
        name: 'Maria'
      },
      bgColor: '#fafafa',
    })
    openDateModal();
  }

  return (
    <button className="btn btn-primary fab" onClick={handleNewEvent}>
      <i className="fas fa-plus"></i>
    </button>
  )
}