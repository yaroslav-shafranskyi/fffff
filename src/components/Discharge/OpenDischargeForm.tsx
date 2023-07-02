import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseOpenFormComponentType } from '../../interfaces';
import { dischargeUrl } from '../../constants';
import { IPerson } from '../../api';

import { OpenFormDialog } from '../OpenForm';

export const OpenDischargeForm: UseOpenFormComponentType = ({ onClose }) => {
    const [error, setError] = useState<string>();
    
    const navigate = useNavigate();

    const goToUpdateMode = useCallback((person?: IPerson) => () => {
        if (!person) {
            return;
        }
        const lastDischargeId = person.lastRecords.discharge?.id;
        if (!lastDischargeId) {
            setError('По цьому військовослужбовцю немає збережених виписок.');
            return;
        }
        navigate(`${dischargeUrl}/${person.id}/${lastDischargeId}`, { state: { readonly: true } });
    }, [navigate]);

    const goToCreateMode = useCallback((personId?: string) => () => {
        const url = !personId ? `${dischargeUrl}/create` : `${dischargeUrl}/${personId}/create`
        navigate(url);
    }, [navigate]);

    const title = 'Ви бажаєте створити нову виписку чи переглянути існуючу?'

    return (
        <OpenFormDialog
            title={title}
            error={error}
            goToUpdateMode={goToUpdateMode}
            goToCreateMode={goToCreateMode}
            onClose={onClose}
        />
    );

};
