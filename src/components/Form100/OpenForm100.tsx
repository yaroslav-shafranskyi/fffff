import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseOpenFormComponentType } from '../../interfaces';
import { form100Url } from '../../constants';
import { IPerson } from '../../api';

import { OpenFormDialog } from '../OpenForm';

export const OpenForm100Dialog: UseOpenFormComponentType = ({ onClose }) => {
    const navigate = useNavigate();

    const goToUpdateMode = useCallback((person?: IPerson) => () => {
        if (!person) {
            return;
        }
        const lastForm100Id = person.lastRecords.form100?.id;
        const formIdUrl = lastForm100Id !== undefined ? '/' + lastForm100Id : '';
        const url = `${form100Url}/${person.id}${formIdUrl}`;
        navigate(url, { state: { readonly: true } });
    }, [navigate]);

    const goToCreateMode = useCallback((personId?: string) => () => {

        const url = !personId ? form100Url : `${form100Url}/${personId}`;
        navigate(url);
    }, [navigate]);

    const title = 'Ви бажаєте створити нову Форму 100 чи переглянути існуючу?'

    return (
        <OpenFormDialog
            title={title}
            goToUpdateMode={goToUpdateMode}
            goToCreateMode={goToCreateMode}
            onClose={onClose}
        />
    );
};
