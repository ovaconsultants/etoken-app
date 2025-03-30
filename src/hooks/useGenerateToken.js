import { GenerateTokenRequest } from '../services/tokenService';

export const useGenerateToken = async (patientTokenDataObj) => {
   const data = GenerateTokenRequest(patientTokenDataObj);
   return data;
};
