import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../modules/auth/services/auth.service";

export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    retry: 1, // esto evita que se vuelva a hacer la peticion si falla puede ser false tambien para que sea mas rapido
    refetchOnWindowFocus: false, // esto evita que se vuelva a hacer la peticion cuando cambio de pestana de chrome o navegador esto no se si es bueno o malo
  });
  return {
    data,
    isError,
    isLoading,
  };
};
