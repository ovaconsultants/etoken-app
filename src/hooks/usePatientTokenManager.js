import { useState, useEffect, useMemo } from 'react';
import { UpdateTokenRequest,RecallTokenRequest} from '../services/tokenService';
import { usePatientTokens } from './usePatientTokens';

export const usePatientTokenManager = (clinic_id, doctor_id) => {
  const [patientTokens, setPatientTokens] = useState([]);
  const [selectedTokenId, setSelectedTokenId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecallEnabled, setIsRecallEnabled] = useState(false);
  const [isNextDone, setIsNextDone] = useState(false);

  // Fetch tokens using the usePatientTokens hook
  const {
    data: fetchedTokens = [],
  } = usePatientTokens(doctor_id, clinic_id);

  // Memoize tokens to avoid unnecessary re-renders
  const tokens = useMemo(() => fetchedTokens, [fetchedTokens]);

  // Update patientTokens when tokens change
  useEffect(() => {
    if (tokens.length > 0 && JSON.stringify(tokens) !== JSON.stringify(patientTokens)) {
      setPatientTokens(tokens);
    }
  }, [tokens, patientTokens]); // Only run this effect when `tokens` or `patientTokens` changes

  const handleSelectToken = (tokenId) => {
    setSelectedTokenId(tokenId);
  };

  const handleNext = () => {
    if (selectedTokenId) {
      updateTokenStatus(selectedTokenId, 'In Progress');
      setIsNextDone(true);
      setIsRecallEnabled(true);
    }
  };

  const updateTokenStatus = async (token_id, status) => {
    const updateTokenDataObj = {
      token_id: token_id,
      status: status,
    };
    const responseFromUpdateTokenRequest = await UpdateTokenRequest(updateTokenDataObj);
    console.log('response from update token request', responseFromUpdateTokenRequest);
  };

  const handleRecall = () => {
         const  recallTokenDataObj = {token_id : selectedTokenId , modified_by : 'Receptionist'};
         const data = RecallTokenRequest(recallTokenDataObj);
         console.log('recall token is trigerred in this component of with the help of usePatientToken Manager',data);
  };

  const handleDone = () => {
    if (selectedTokenId) {
      updateTokenStatus(selectedTokenId, 'Completed');
      const updatedTokens = patientTokens.filter(token => token.token_id !== selectedTokenId);
      setPatientTokens(updatedTokens);

      if (updatedTokens.length > 0) {
        const nextIndex = (currentIndex) % updatedTokens.length;
        setSelectedTokenId(updatedTokens[nextIndex].token_id);
        setCurrentIndex(nextIndex);
      } else {
        setSelectedTokenId(null);
      }

      setIsNextDone(false);
      setIsRecallEnabled(false);
    }
  };

  return {
    patientTokens,
    selectedTokenId,
    isRecallEnabled,
    isNextDone,
    handleSelectToken,
    handleNext,
    handleRecall,
    handleDone,
  };
};
