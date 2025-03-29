import {useState, useEffect, useRef} from 'react';
import {UpdateTokenRequest, RecallTokenRequest} from '../services/tokenService';
import {usePatientTokens} from './usePatientTokens';

export const usePatientTokenManager = (clinic_id, doctor_id) => {
  const [patientTokens, setPatientTokens] = useState([]);
  const [selectedTokenId, setSelectedTokenId] = useState(null);
  const [isRecallEnabled, setIsRecallEnabled] = useState(false);
  const [isNextDone, setIsNextDone] = useState(false);
  const [pauseQuery, setPauseQuery] = useState(false);

  const selectedTokenRef = useRef(null);
  const {
    data: tokens = [],
    refetch: refetchTokens,
    isFetching,
    error,
    isError,
  } = usePatientTokens(doctor_id, clinic_id, null, pauseQuery);

  useEffect(() => {
    if (tokens.length > 0) {
      setPatientTokens(tokens);
      if (!selectedTokenRef.current) {
        setSelectedTokenId(tokens[0].token_id);
        selectedTokenRef.current = tokens[0].token_id;
      }
    }
  }, [tokens]);

  const handleSelectToken = tokenId => {
    console.log('handleSelectToken', tokenId);
    setSelectedTokenId(tokenId);
    selectedTokenRef.current = tokenId; // Update the ref
    const selectedToken = patientTokens.find(t => t.token_id === tokenId);
    setIsRecallEnabled(selectedToken?.status === 'In Progress');
  };

  const handleNext = async () => {
    const currentTokenId = selectedTokenRef.current;
    console.log('handleNext', currentTokenId);

    if (currentTokenId) {
      setPauseQuery(true);

      try {
        await updateTokenStatus(currentTokenId, 'In Progress');

        setPatientTokens(prevTokens =>
          prevTokens.map(token =>
            token.token_id === currentTokenId
              ? {...token, status: 'In Progress'}
              : token,
          ),
        );

        setIsRecallEnabled(true);
        setIsNextDone(true);
      } catch (error) {
        console.error('Error updating token status:', error);
        setPatientTokens(tokens);
      } finally {
        setPauseQuery(false);
        await refetchTokens();
      }
    }
  };

  const handleDone = async () => {
    const currentTokenId = selectedTokenRef.current; // Use ref value
    console.log('handleDone', currentTokenId);

    if (currentTokenId) {
      setPauseQuery(true);

      try {
        await updateTokenStatus(currentTokenId, 'Completed');

        setPatientTokens(prevTokens =>
          prevTokens.filter(token => token.token_id !== currentTokenId),
        );

        // Reset selection
        setSelectedTokenId(null);
        selectedTokenRef.current = null;
        setIsRecallEnabled(false);
        setIsNextDone(false);
      } catch (error) {
        console.error('Error completing token:', error);
        setPatientTokens(tokens);
      } finally {
        setPauseQuery(false);
        await refetchTokens();
      }
    }
  };

  const updateTokenStatus = async (token_id, status) => {
    const updateTokenDataObj = {token_id, status};
    return await UpdateTokenRequest(updateTokenDataObj);
  };

  const handleRecall = async () => {
    if (selectedTokenId) {
      setPauseQuery(true);

      try {
        const recallTokenDataObj = {
          token_id: selectedTokenId,
          modified_by: 'Receptionist',
        };
        await RecallTokenRequest(recallTokenDataObj);
      } catch (error) {
        console.error('Error recalling token:', error);
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
    refetchTokens,
    isFetching,
    error,
    isError
  };
};
