import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseOpenFormComponentType } from '../../interfaces';
import { referralUrl } from '../../constants';
import { IPerson } from '../../api';

import { OpenFormDialog } from '../OpenForm';

export const OpenReferralForm: UseOpenFormComponentType = ({ onClose }) => {
    const navigate = useNavigate();

    const goToUpdateMode = useCallback((person?: IPerson) => () => {
        if (!person) {
            return;
        }
        const lastReferralId = person.lastRecords.referral?.id;
        const formIdUrl = lastReferralId !== undefined ? '/' + lastReferralId : '';
        navigate(`${referralUrl}/${person.id}${formIdUrl}`, { state: { readonly: true } });
    }, [navigate]);

    const goToCreateMode = useCallback((personId?: string) => () => {
        const url = !personId ? `${referralUrl}/create` : `${referralUrl}/${personId}`
        navigate(url);
    }, [navigate]);

    const title = 'Ви бажаєте створити нове направлення чи переглянути існуюче?'

    return (
        <OpenFormDialog
            title={title}
            goToUpdateMode={goToUpdateMode}
            goToCreateMode={goToCreateMode}
            onClose={onClose}
        />
    );

};
