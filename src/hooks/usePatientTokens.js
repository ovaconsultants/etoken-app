import { useQuery } from '@tanstack/react-query';
import { FetchTokensRequest } from '../services/tokenService';

export const usePatientTokens = (doctor_id, clinic_id, onSuccess, pause = false) => {
  return useQuery({
    queryKey: ['tokens', doctor_id, clinic_id],
    queryFn: () => FetchTokensRequest(doctor_id, clinic_id),
    staleTime: 20 * 60 * 1000,
    refetchInterval: pause ? false : 5 * 1000,
    enabled: !!doctor_id && !!clinic_id && !pause,
    select: (data) => data.tokens,
    onSuccess: (tokens) => {
      if (onSuccess) { onSuccess(tokens); }
    },
  });
};
