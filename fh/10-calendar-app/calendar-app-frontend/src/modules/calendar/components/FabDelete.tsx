import { useCalendarStore } from "../../../core"

export const FabDelete = (): JSX.Element => {
  const { startDeleteEvent, hasEventSelected } = useCalendarStore();

  const handleDeleteEvent = (): void => {
    startDeleteEvent();
  }

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDeleteEvent} style={{display: hasEventSelected ? '' : 'none'}}>
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}