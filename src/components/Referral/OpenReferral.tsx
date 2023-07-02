import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseOpenFormComponentType } from '../../interfaces';
import { referralUrl } from '../../constants';
import { IPerson } from '../../api';

import { OpenFormDialog } from '../OpenForm';

export const OpenReferralForm: UseOpenFormComponentType = ({ onClose }) => {
    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    const goToUpdateMode = useCallback((person?: IPerson) => () => {
        if (!person) {
            return;
        }
        const lastReferralId = person.lastRecords.referral?.id;
        if (!lastReferralId) {
            setError('По цьому військовослужбовцю немає збережених направлень.');
            return;
        }
        navigate(`${referralUrl}/${person.id}/${lastReferralId}`, { state: { readonly: true } });
    }, [navigate]);

    const goToCreateMode = useCallback((personId?: string) => () => {
        const url = !personId ? `${referralUrl}/create` : `${referralUrl}/${personId}/create`
        navigate(url);
    }, [navigate]);

    const title = 'Ви бажаєте створити нове направлення чи переглянути існуюче?'

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
