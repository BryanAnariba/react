import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, onCloseDateModal, onOpenDateModal, RootState } from "../store";

export const useUiStore = () => {
  const { isDateModalOpen } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch<AppDispatch>();

  const openDateModal = (): void => {
    dispatch(onOpenDateModal());
  }

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  }

  return {
    isDateModalOpen,
    openDateModal,
    closeDateModal,
  };
}