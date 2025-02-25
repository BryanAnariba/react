import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { DraftPatient, Patient } from "../interfaces/patients.interfaces";

interface PatientState {
  patients: Patient[];
  activeId: string;
  addPatient: (patient: DraftPatient) => void;
  deletePatient: (id: Patient["id"]) => void;
  getPatientById: (id: Patient["id"]) => void;
  updatePatient: (patient: DraftPatient) => void;
}

const createPatient = (patient: DraftPatient): Patient => {
  return {
    ...patient,
    id: uuid(),
  };
};

export const usePatientStore = create<PatientState>()(
  devtools(
    persist((set) => ({
      patients: [],
      activeId: "",
      addPatient: (patient) => {
        set((state) => ({
          patients: [...state.patients, { ...createPatient(patient) }],
        }));
      },
      deletePatient: (id: Patient["id"]) => {
        set((state) => ({
          patients: state.patients.filter((patient) => patient.id !== id),
        }));
      },
      getPatientById: (id: Patient["id"]) => {
        set(() => ({ activeId: id }));
      },
      updatePatient: (data) => {
        set((state) => ({
          patients: state.patients.map((patient) => {
            if (patient.id === state.activeId) {
              return {
                ...data,
                id: state.activeId,
              };
            }
            return patient;
          }),
          activeId: "",
        }));
      },
    }), {name: 'patient-storage', storage: createJSONStorage(() => localStorage)}),
  )
);
