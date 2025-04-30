import { useState,  useRef, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { UpdateTokenRequest, RecallTokenRequest } from '../services/tokenService';
import { usePatientTokens } from './usePatientTokens';
import { showToast } from '../components/toastMessage/ToastMessage';

export const usePatientTokenManager = (clinic_id, doctor_id) => {
  const queryClient = useQueryClient();
  const [isMutating, setIsMutating] = useState(false);
  const selectedTokenRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    data: patientTokens = [],
    refetch: refetchTokens,
    isFetching,
    error,
    isError,
  } = usePatientTokens(doctor_id, clinic_id, {
    refetchInterval: isMutating ? false : 3000
  });

  // Auto-select first token and calculate stats
  const { stats, hasTokenInProgress } = useMemo(() => {
    if (patientTokens.length > 0 && !selectedTokenRef.current) {
      selectedTokenRef.current = patientTokens[0].token_id;
    }

    const inProgress = patientTokens.filter(t => t.status === 'In Progress');
    return {
      hasTokenInProgress: inProgress.length > 0,
      stats: {
        total: patientTokens.length,
        attended: inProgress.length,
        inQueue: patientTokens.filter(t => t.status === 'Waiting').length,
        onHold: patientTokens.filter(t => t.status === 'On Hold').length,
      }
    };
  }, [patientTokens]);

  const handleSelectToken = (tokenId) => {
    selectedTokenRef.current = tokenId;
  };

  const updateToken = async (updates) => {
    if (!selectedTokenRef.current) return;
    
    setIsMutating(true);
    try {
      await UpdateTokenRequest({ 
        token_id: selectedTokenRef.current, 
        ...updates 
      });
      
      await queryClient.invalidateQueries(['tokens', doctor_id, clinic_id]);
      showToast('Update successful');
      
      if (updates.status === 'Completed') {
        selectedTokenRef.current = null;
      }
    } catch (error) {
      console.error('Update failed:', error);
      showToast('Update failed', 'error');
    } finally {
      setIsMutating(false);
    }
  };

  const handleNext = () => updateToken({ status: 'In Progress' });
  const handleDone = () => updateToken({ status: 'Completed' });

  const handleRecall = async () => {
    if (!selectedTokenRef.current) return;
    
    setIsMutating(true);
    try {
      await RecallTokenRequest({
        token_id: selectedTokenRef.current,
        modified_by: 'Receptionist'
      });
      await refetchTokens();
    } catch (error) {
      console.error('Recall failed:', error);
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
    } catch (error) {
      console.error('Refresh failed:', error);
      showToast('Refresh failed', 'error');
    }
    finally {
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
    isFetching: isFetching || isMutating,
    isError,
    isLoading,
    error,
    ...stats,
    hasTokenInProgress
  };
};