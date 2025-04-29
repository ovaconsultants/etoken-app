import {useState, useEffect, useRef} from 'react';
import {UpdateTokenRequest, RecallTokenRequest} from '../services/tokenService';
import {usePatientTokens} from './usePatientTokens';

export const usePatientTokenManager = (clinic_id, doctor_id) => {
  const [patientTokens, setPatientTokens] = useState([]);
  const [selectedTokenId, setSelectedTokenId] = useState(null);
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
    setSelectedTokenId(tokenId);
    selectedTokenRef.current = tokenId;
  };

  const handleNext = async () => {
    const currentTokenId = selectedTokenRef.current;
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

        setIsNextDone(true);
      } catch (updateError) {
        console.error('Error updating token status:', updateError);
        setPatientTokens(tokens);
      } finally {
        setPauseQuery(false);
        await refetchTokens();
      }
    }
  };

  const handleDone = async () => {
    const currentTokenId = selectedTokenRef.current; // Use ref value
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
        setIsNextDone(false);
      } catch (completionError) {
        console.error('Error completing token:', completionError);
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
      } catch (recallError) {
        console.error('Error recalling token:', recallError);
      } finally {
        setPauseQuery(false);
        await refetchTokens();
      }
    }
  };

  return {
    patientTokens,
    selectedTokenId,
    isNextDone,
    handleSelectToken,
    handleNext,
    handleRecall,
    handleDone,
    refetchTokens,
    isFetching,
    error,
    isError,
  };
};
