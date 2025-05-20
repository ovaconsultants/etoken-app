import {useState, useRef, useMemo} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {UpdateTokenRequest, RecallTokenRequest} from '../services/tokenService';
import {usePatientTokens} from './usePatientTokens';
import {showToast} from '../components/toastMessage/ToastMessage';

export const usePatientTokenManager = (clinic_id, doctor_id) => {
  const queryClient = useQueryClient();
  const selectedTokenRef = useRef(null);

  const [isMutating, setIsMutating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    data: patientTokens = [],
    refetch: refetchTokens,
    isFetching,
    error,
    isError,
  } = usePatientTokens(doctor_id, clinic_id, {
    refetchInterval: isMutating ? false : 3000,
  });

  // Auto-select first token and calculate stats
const { stats, hasTokenInProgress  , inProgressToken} = useMemo(() => {
  const inProgressToken = (patientTokens.find(t => t.status === 'In Progress'));
  const hasTokenInProgressBool = Boolean(inProgressToken);
  if (inProgressToken) {
    selectedTokenRef.current = inProgressToken.token_id;
  } 
  else if (patientTokens.length > 0 && !selectedTokenRef.current) {
    selectedTokenRef.current = patientTokens[0].token_id;
  }

  return {
    inProgressToken : inProgressToken,
    hasTokenInProgress : hasTokenInProgressBool,
    stats: {
      total: patientTokens.length,
      attended: patientTokens.filter(t => t.status === 'Completed').length,
      inQueue: patientTokens.filter(t => t.status === 'Waiting').length,
      onHold: patientTokens.filter(t => t.status === 'On Hold').length,
    },
  };
}, [patientTokens]);

  const handleSelectToken = tokenId => {
    selectedTokenRef.current = tokenId;
  };

  const updateToken = async updates => {
    if (!selectedTokenRef.current) {
      return;
    }

    setIsMutating(true);
    try {
      await UpdateTokenRequest({
        token_id: selectedTokenRef.current,
        ...updates,
      });

      await queryClient.invalidateQueries(['tokens', doctor_id, clinic_id]);
      if (updates.status === 'Completed') {
        selectedTokenRef.current = null;
      }
    } catch (tokenUpdateError) {
      console.error('Update failed:', tokenUpdateError);
      showToast(tokenUpdateError, 'error');
    } finally {
      setIsMutating(false);
    }
  };

  const handleNext = () => updateToken({status: 'In Progress'});
  const handleDone = () =>  { selectedTokenRef.current === inProgressToken.token_id ?  updateToken({status: 'Completed'}) : updateToken({status: 'In Progress'});}

  const handleRecall = async () => {
    if (!selectedTokenRef.current) {return;}

    setIsMutating(true);
    try {
      await RecallTokenRequest({
        token_id: selectedTokenRef.current,
        modified_by: 'Receptionist',
      });
      await refetchTokens();
    } catch (refetchTokensError) {
      console.error('Recall failed:', refetchTokensError);
      showToast('Recall failed', 'error');
    } finally {
      setIsMutating(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await refetchTokens();
      showToast('Tokens refreshed');
    } catch (refreshTokenError) {
      console.error('Refresh failed:', refreshTokenError);
      showToast('Refresh failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    patientTokens,
    selectedTokenId: selectedTokenRef.current,
    handleSelectToken,
    handleNext,
    handleDone,
    handleRecall,
    handleRefresh,
    updateToken,
    isFetching: isFetching,
    isMutating,
    isError,
    isLoading,
    error,
    ...stats,
    inProgressToken,
    hasTokenInProgress,
  };
};
