import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { IPerson, useCreatePerson, useGetPerson, useUpdatePerson } from '../../api';
import { PersonPage } from '.';

export const PersonComponent = () => {
    const { pathname } = useLocation() ?? {};

    const personId = useMemo(() => decodeURI(pathname?.split('/persons/')?.[1]), [pathname]);

    const { person } = useGetPerson(personId);
    const { mutate: updatePerson } = useUpdatePerson();
    const { mutate: createPerson } = useCreatePerson();

    const submitUserChanges = ({id, ...newPerson}: IPerson) => {
        if (personId === 'create') {
            createPerson(newPerson);
            return;
        }
        updatePerson({ id, ...newPerson });
    };

    return <PersonPage person={person} onSubmit={submitUserChanges} />
};
