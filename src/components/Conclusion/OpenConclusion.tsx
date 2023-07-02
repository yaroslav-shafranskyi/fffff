import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseOpenFormComponentType } from '../../interfaces';
import { conclusionUrl } from '../../constants';
import { IPerson } from '../../api';

import { OpenFormDialog } from '../OpenForm';

export const OpenConclusionForm: UseOpenFormComponentType = ({ onClose }) => {
    const [error, setError] = useState<string>();
    
    const navigate = useNavigate();

    const goToViewMode = useCallback((person?: IPerson) => () => {
        if (!person) {
            return;
        }
        const lastConclusionId = person.lastRecords.conclusion?.id;
        if (!lastConclusionId) {
            setError('По цьому військовослужбовцю немає збережених консультаційних висновків.')
            return;
        }
        navigate(`${conclusionUrl}/${person.id}/${lastConclusionId}`, { state: { readonly: true } });
    }, [navigate]);

    const goToCreateMode = useCallback((personId?: string) => () => {
        const url = !personId ? `${conclusionUrl}/create` : `${conclusionUrl}/${personId}/create`
        navigate(url);
    }, [navigate]);

    const title = 'Ви бажаєте створити новий консультаційний висновок чи переглянути існуючий?'

    return (
        <OpenFormDialog
            title={title}
            error={error}
            goToUpdateMode={goToViewMode}
            goToCreateMode={goToCreateMode}
            onClose={onClose}
        />
    );

};
