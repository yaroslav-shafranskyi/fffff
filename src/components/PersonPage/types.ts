import { IPerson } from '../../api';

export interface IPersonPageProps {
    person: IPerson;
    onSubmit: (person: IPerson) => void;
}
