import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseOpenFormComponentType } from '../../interfaces';
import { personsUrl } from '../../constants';

import { OpenFormDialog } from '../OpenForm';

export const OpenPersonDialog: UseOpenFormComponentType = ({ onClose }) => {
    const navigate = useNavigate();

    const goToUpdateMode = useCallback((personId?: string) => () => {
        if (!personId) {
            return;
        }
        navigate(`${personsUrl}/${personId}`);
    }, [navigate]);

    const goToCreateMode = useCallback(() => () => {
        navigate(`${personsUrl}/create`);
    }, [navigate]);

    const title = 'Ви бажаєте внести інформацію про нового військовослужбовця чи переглянути вже існуючого?'

    return (
        <OpenFormDialog
            title={title}
            goToUpdateMode={goToUpdateMode}
            goToCreateMode={goToCreateMode}
            onClose={onClose}
        />
    );
};
