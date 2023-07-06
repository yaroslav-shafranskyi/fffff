import {
  ChangeEvent,
  useCallback,
  useState,
  MouseEvent,
  Fragment,
  FC,
  useMemo,
} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
} from "@mui/lab";
import {
  ArrowRight as OpenMenuIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { ArmyRank, Forms, Gender, IBriefRecord, IPerson } from "../../api";
import { Select, Input, ControlBar, DatePicker } from "../../shared";
import {
  conclusionUrl,
  dischargeUrl,
  form100Url,
  referralUrl,
  createUrl,
  defaultPersonData,
} from "../../constants";
import { REQUIRED_FIELD_MESSAGE, personPageSchema } from "../../schemas";
import { convertNullOrNumberToDate, formatDate } from "../../helpers";

import { Header } from "../Header";

import {
  cardStyles,
  inputPropsSx,
  radioStyles,
  genderWrapperStyles,
  fullWidthStyles,
  infoWrapperStyles,
  infoLeftSectionRowStyles,
  infoLeftSectionStyles,
  containerStyles,
  historyTitleWrapper,
  getMenuIconStyles,
  timelineContentWrapperStyles,
  recordDiagnosisStyles,
  formIconStyles,
} from "./styles";
import { IPersonPageProps } from "./types";

const options = Object.values(Forms);

const getFormURL = (option: Forms) => {
  if (option === Forms.FORM_100) {
    return form100Url;
  }
  if (option === Forms.DISCHARGE) {
    return dischargeUrl;
  }
  if (option === Forms.REFERRAL) {
    return referralUrl;
  }
  if (option === Forms.CONCLUSION) {
    return conclusionUrl;
  }
};

export const PersonPage: FC<IPersonPageProps> = ({ person, onSubmit }) => {
  const navigate = useNavigate();

  const {
    formState,
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    clearErrors,
  } = useForm<IPerson>({
    defaultValues: defaultPersonData,
    values: person,
    resolver: yupResolver(personPageSchema),
  });

  const records = watch("records");
  const id = watch("id");
  const gender = watch("gender");

  const { errors } = formState;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const toggleMenuOpen = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl((prevAnchor) => {
      if (!prevAnchor) {
        return event.currentTarget;
      }
      return null;
    });
  }, []);

  const handleGenderChange = useCallback(
    (value: Gender) =>
      (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (checked) {
          setValue("gender", value);
          clearErrors("gender");
        }
      },
    [setValue, clearErrors]
  );

  const handleDateChange = useCallback(
    (date?: Date) => {
      if (!date) {
        return;
      }
      date.setHours(12);
      setValue("birthDate", date.getTime());
      clearErrors("birthDate");
    },
    [setValue, clearErrors]
  );

  const handleMenuOptionSelect = useCallback(
    (form: Forms) => () => {
      const formUrl = getFormURL(form);
      if (!formUrl) {
        return;
      }
      navigate(`${formUrl}/${id}${createUrl}`);
    },
    [navigate, id]
  );

  const goToForm = useCallback(
    ({ type, formId }: IBriefRecord) =>
      () => {
        const formUrl = getFormURL(type);
        if (!formUrl) {
          return;
        }
        navigate(`${formUrl}/${id}/${formId}`, { state: { readonly: true } });
      },
    [id, navigate]
  );

  const sortedRecords = useMemo(
    () => [...(records ?? [])].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [records]
  );

  return (
    <>
      <Header />
      <Container maxWidth={false} sx={containerStyles}>
        <Card sx={cardStyles}>
          <ControlBar
            title="Швидкий пошук військовослужбовця"
            onClear={reset}
            onSubmit={handleSubmit(onSubmit)}
          />
          <Typography variant="h5">
            Особиста інформація війсковослужбовця
          </Typography>
          <Box sx={infoWrapperStyles}>
            <Box sx={infoLeftSectionStyles}>
              <Box sx={infoLeftSectionRowStyles}>
                <Box sx={fullWidthStyles}>
                  <Input
                    label="ПІБ"
                    variant="outlined"
                    inputProps={{ sx: inputPropsSx }}
                    error={errors.fullName?.message}
                    fullWidth={true}
                    {...register("fullName")}
                    value={watch("fullName") ?? ""}
                  />
                </Box>
                <Box sx={fullWidthStyles}>
                  <Select
                    label="Звання"
                    variant="outlined"
                    inputProps={{ sx: inputPropsSx }}
                    options={Object.values(ArmyRank)}
                    error={errors.rank?.message}
                    {...register("rank")}
                    value={watch("rank") ?? ""}
                  />
                </Box>
              </Box>
              <Box sx={infoLeftSectionRowStyles}>
                <Box sx={fullWidthStyles}>
                  <Input
                    label="Посвідчення особи"
                    variant="outlined"
                    inputProps={{ sx: inputPropsSx }}
                    error={errors.personalId?.message}
                    fullWidth={true}
                    {...register("personalId")}
                    value={watch("personalId") ?? ""}
                  />
                </Box>
                <Box sx={fullWidthStyles}>
                  <Input
                    label="Особистий номер"
                    variant="outlined"
                    inputProps={{ sx: inputPropsSx }}
                    error={errors.tokenNumber?.message}
                    fullWidth={true}
                    {...register("tokenNumber")}
                    value={watch("tokenNumber") ?? ""}
                  />
                </Box>
              </Box>
              <Box sx={infoLeftSectionRowStyles}>
                <Box sx={fullWidthStyles}>
                  <DatePicker
                    label="Дата народження"
                    value={convertNullOrNumberToDate(watch("birthDate"))}
                    sx={fullWidthStyles}
                    onChange={handleDateChange}
                  />
                  {errors.birthDate?.message !== undefined && (
                    <Typography color="error">
                      {REQUIRED_FIELD_MESSAGE}
                    </Typography>
                  )}
                </Box>
                <Box sx={fullWidthStyles}>
                  <Input
                    label="Телефон"
                    variant="outlined"
                    inputProps={{ sx: inputPropsSx }}
                    fullWidth={true}
                    {...register("phoneNumber")}
                    value={watch("phoneNumber") ?? ""}
                  />
                </Box>
              </Box>
            </Box>
            <Box>
              <Box sx={fullWidthStyles}>
                <Input
                  label="Військова частина"
                  variant="outlined"
                  inputProps={{ sx: inputPropsSx }}
                  error={errors.militaryBase?.message}
                  fullWidth={true}
                  {...register("militaryBase")}
                  value={watch("militaryBase") ?? ""}
                />
              </Box>
              <Box sx={genderWrapperStyles}>
                <Typography>Стать</Typography>
                <RadioGroup>
                  <FormControlLabel
                    value={Gender.MALE}
                    control={
                      <Radio
                        checked={gender === Gender.MALE}
                        onChange={handleGenderChange(Gender.MALE)}
                      />
                    }
                    label="Чоловік"
                    sx={radioStyles}
                  />
                  <FormControlLabel
                    value={Gender.FEMALE}
                    control={
                      <Radio
                        checked={gender === Gender.FEMALE}
                        onChange={handleGenderChange(Gender.FEMALE)}
                      />
                    }
                    label="Жінка"
                    sx={radioStyles}
                  />
                </RadioGroup>
                {errors.gender?.message && (
                  <Typography color="error">
                    {REQUIRED_FIELD_MESSAGE}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Box sx={historyTitleWrapper}>
            <Typography variant="h5">Історія хвороби</Typography>
            <Button
              variant="contained"
              color="inherit"
              onClick={toggleMenuOpen}
            >
              ДОДАТИ ДОКУМЕНТИ
              <OpenMenuIcon sx={getMenuIconStyles(isMenuOpen)} />
            </Button>
          </Box>
          {!records?.length && (
            <Typography color="textSecondary">Немає записів</Typography>
          )}
          <Timeline position="alternate">
            {sortedRecords.map((record, idx) => {
              const { id, date, fullDiagnosis, type } = record;
              const shouldHaveConnector = idx < records.length - 1;
              return (
                <Fragment key={`person${id}`}>
                  <TimelineItem>
                    <TimelineOppositeContent>
                      <Typography>
                        {formatDate(convertNullOrNumberToDate(date))}
                      </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      {shouldHaveConnector && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Box sx={timelineContentWrapperStyles}>
                        <Button
                          sx={{
                            width: "fit-content",
                            alignSelf: idx % 2 ? "end" : "start",
                          }}
                          variant="contained"
                          color={
                            type === Forms.FORM_100 ? "primary" : "secondary"
                          }
                          onClick={goToForm(record)}
                        >
                          {type}
                          <ArrowForwardIosIcon sx={formIconStyles} />
                        </Button>
                        <Box sx={recordDiagnosisStyles}>
                          <Typography color="textSecondary">
                            {fullDiagnosis}
                          </Typography>
                        </Box>
                      </Box>
                    </TimelineContent>
                  </TimelineItem>
                </Fragment>
              );
            })}
          </Timeline>
        </Card>
      </Container>
      <Menu open={isMenuOpen} anchorEl={anchorEl} onClose={handleCloseMenu}>
        {options.map((op) => (
          <MenuItem key={op} value={op} onClick={handleMenuOptionSelect(op)}>
            {op}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
