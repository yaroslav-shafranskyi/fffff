import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseOpenFormComponentType } from '../../interfaces';
import { dischargeUrl } from '../../constants';
import { IPerson } from '../../api';

import { OpenFormDialog } from '../OpenForm';

export const OpenDischargeForm: UseOpenFormComponentType = ({ onClose }) => {
    const navigate = useNavigate();

    const goToUpdateMode = useCallback((person?: IPerson) => () => {
        if (!person) {
            return;
        }
        const lastDischargeId = person.lastRecords.discharge?.id;
        const formIdUrl = lastDischargeId !== undefined ? '/' + lastDischargeId : '';
        navigate(`${dischargeUrl}/${person.id}${formIdUrl}`, { state: { readonly: true } });
    }, [navigate]);

    const goToCreateMode = useCallback((personId?: string) => () => {
        const url = !personId ? `${dischargeUrl}/create` : `${dischargeUrl}/${personId}`
        navigate(url);
    }, [navigate]);

    const title = 'Ви бажаєте створити нову виписку чи переглянути існуючу?'

    return (
        <OpenFormDialog
            title={title}
            goToUpdateMode={goToUpdateMode}
            goToCreateMode={goToCreateMode}
            onClose={onClose}
        />
    );

};
