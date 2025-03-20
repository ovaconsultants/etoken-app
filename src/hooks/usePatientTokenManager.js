import { useState, useEffect } from 'react';
import { UpdateTokenRequest, RecallTokenRequest } from '../services/tokenService';
import { usePatientTokens } from './usePatientTokens';

export const usePatientTokenManager = (clinic_id, doctor_id) => {
  const [patientTokens, setPatientTokens] = useState([]);
  const [selectedTokenId, setSelectedTokenId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecallEnabled, setIsRecallEnabled] = useState(false);
  const [isNextDone, setIsNextDone] = useState(false);
  const [pauseQuery, setPauseQuery] = useState(false);

  const { data: tokens = [], refetch: refetchTokens } = usePatientTokens(
    doctor_id,
    clinic_id,
    null,
    pauseQuery
  );

  useEffect(() => {
    if (tokens.length > 0) {
      setPatientTokens(tokens);
      setSelectedTokenId(tokens[0].token_id);
    }
  }, [tokens]);

  const handleSelectToken = (tokenId) => {
    setSelectedTokenId(tokenId);
  };

  const handleNext = async () => {
    if (selectedTokenId) {
      setPauseQuery(true);

      const updatedTokens = patientTokens.map((token) =>
        token.token_id === selectedTokenId ? { ...token, status: 'In Progress' } : token
      );
      setPatientTokens(updatedTokens);

      try {
        await updateTokenStatus(selectedTokenId, 'In Progress');
        setIsNextDone(true);
        setIsRecallEnabled(true);
      } catch (error) {
        console.error('Error updating token status:', error);
        setPatientTokens(tokens);
      } finally {
        setPauseQuery(false);
        await refetchTokens();
      }
    }
  };

  const updateTokenStatus = async (token_id, status) => {
    const updateTokenDataObj = { token_id, status };
    return await UpdateTokenRequest(updateTokenDataObj);
  };

  const handleRecall = async () => {
    if (selectedTokenId) {
      setPauseQuery(true);

      try {
        const recallTokenDataObj = { token_id: selectedTokenId, modified_by: 'Receptionist' };
        await RecallTokenRequest(recallTokenDataObj);
      } catch (error) {
        console.error('Error recalling token:', error);
      } finally {
        setPauseQuery(false);
        await refetchTokens();
      }
    }
  };

  const handleDone = async () => {
    if (selectedTokenId) {
      setPauseQuery(true);

      const updatedTokens = patientTokens.filter((token) => token.token_id !== selectedTokenId);
      setPatientTokens(updatedTokens);

      try {
        await updateTokenStatus(selectedTokenId, 'Completed');

        if (updatedTokens.length > 0) {
          const nextIndex = currentIndex % updatedTokens.length;
          setSelectedTokenId(updatedTokens[nextIndex].token_id);
          setCurrentIndex(nextIndex);
        } else {
          setSelectedTokenId(null);
        }

        setIsNextDone(false);
        setIsRecallEnabled(false);
      } catch (error) {
        console.error('Error updating token status:', error);
        setPatientTokens(tokens);
      } finally {
        setPauseQuery(false);
        await refetchTokens();
      }
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