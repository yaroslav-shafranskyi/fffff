import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  IForm100,
  useCreateForm100,
  useGetForm100,
  useUpdateForm100,
} from "../../api";
import { form100Url } from "../../constants";

import { Form100Page } from "./Form100Page";

export const Form100 = () => {
  const location = useLocation();
  const { pathname, state } = location;
  const readonly = state?.readonly;

  const navigate = useNavigate();

  const [personId, formId] = useMemo(
    () =>
      (pathname.split(`${form100Url}/`)[1]?.split("/") ?? []).map(decodeURI),
    [pathname]
  );

  const { form100: initialForm100 } = useGetForm100(personId, formId);

  const handleSuccess = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const { mutate: updateForm } = useUpdateForm100({
    onSuccess: handleSuccess,
  });
  const { mutate: createForm } = useCreateForm100({
    onSuccess: handleSuccess,
  });

  const saveForm = useCallback(
    ({ id, ...form }: IForm100) => {
      if (formId === undefined || formId === "create") {
        createForm(form);
        return;
      }
      updateForm({ id, ...form });
    },
    [formId, createForm, updateForm]
  );

  const submitForm = useCallback(
    (form: IForm100) => {
      if (form.person.birthDate) {
        saveForm(form);
        return;
      }

      const { tokenNumber } = form.person;
      const tokenNumberWithoutSpaces = tokenNumber.split(" ").join("");
      const birthDate = new Date(tokenNumberWithoutSpaces);
      const isValidDate = !Number.isNaN(birthDate.getTime());
      saveForm({
        ...form,
        person: {
          ...form.person,
          birthDate: isValidDate ? birthDate : undefined,
        },
      });
    },
    [saveForm]
  );

  return (
    <Form100Page
      initialForm100={initialForm100}
      readonly={readonly}
      onSubmit={submitForm}
    />
  );
};
