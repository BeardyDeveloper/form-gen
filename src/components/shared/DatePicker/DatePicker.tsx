/* eslint-disable max-lines-per-function */
import type { MutableRefObject } from 'react';
import { FC, forwardRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import type { DateObject, Value } from 'react-multi-date-picker';
import DatePickerInput from 'react-multi-date-picker';
import styled, { css } from 'styled-components';

interface DatePickerProps {
  label?: string;
  value?: Value;
  placeholder?: string;
  rangeSelector?: boolean;
  weekSelector?: boolean;
  monthSelector?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  validationText?: string;
  tooltip?: JSX.Element | string;
  className?: string;
  onChange: (selectedDates: any) => void;
}

type Filan = MutableRefObject<any>;

export const DatePicker = forwardRef<Filan, DatePickerProps>(
  (props, forwardedRef) => {
    const {
      label,
      value,
      placeholder,
      rangeSelector,
      weekSelector,
      monthSelector,
      multiple,
      disabled,
      validationText,
      tooltip,
      className,
      onChange,
    } = props;

    return (
      <Container className={className} error={validationText != null}>
        {label ? <Label disabled={disabled}>{label}</Label> : null}
        <FieldBox
          data-html
          data-tip={
            typeof tooltip === 'object'
              ? ReactDOMServer.renderToString(tooltip)
              : tooltip
          }
          disabled={disabled}
        >
          <StyledDatePickerInput
            ref={forwardedRef as any}
            value={value}
            placeholder={placeholder}
            showOtherDays
            range={!weekSelector && rangeSelector}
            weekPicker={!monthSelector && !rangeSelector && weekSelector}
            onlyMonthPicker={!weekSelector && monthSelector}
            multiple={multiple ?? false}
            disabled={disabled}
            onChange={onChange}
          />
        </FieldBox>
        {validationText && !disabled ? (
          <ValidationText error={validationText != null}>
            {validationText}
          </ValidationText>
        ) : null}
      </Container>
    );
  },
);

interface StyledProps {
  error?: boolean;
  disabled?: boolean;
}

const Container = styled.div<StyledProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .rmdp-container {
    width: 100%;
    .rmdp-input {
      font-size: inherit;
      width: 100%;
      height: 46px;
      border-radius: 8px;
      overflow: hidden;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      ${({ theme, error, disabled }) => {
        let borderColor: string;

        if (error) {
          borderColor = theme.cmp.input.border.error;
        } else {
          borderColor = theme.cmp.input.border.default;
        }

        return css`
          cursor: ${disabled ? 'no-drop' : 'normal'};
          background-color: ${theme.cmp.input.bg};
          padding: 0 10px;
          border: ${`1px solid ${borderColor}`};
          outline: none;
          &::placeholder {
            color: ${theme.cmp.input.placeholder};
            font-size: ${theme.typography.fontSize.body.M};
            padding-left: 8px;
          }
          &:hover {
            border-color: ${
              !error && !disabled && theme.cmp.input.border.hover
            };
          }
          &:focus {
            border-color: ${
              !error && !disabled && theme.cmp.input.border.active
            };
            outline ${
              !error && !disabled && `2px solid ${theme.cmp.input.outline}`
            } !important;
          }
        `;
      }};
    }
  }

  ${({ theme }) => css`
    .ep-arrow,
    .rmdp-ep-arrow {
      display: none;
    }

    .rmdp-wrapper {
      background-color: ${theme.background.dark.secondary};
      border-radius: 8px;
      border: 0;
      box-shadow: none;
    }
    .rmdp-month-picker,
    .rmdp-year-picker {
      background-color: ${theme.background.dark.secondary};
      box-shadow: none;
    }

    .rmdp-calendar {
      padding: 20px;
    }

    .rmdp-header-values {
      color: ${theme.text.light.primary};
      & > span {
        cursor: pointer !important;
      }
    }

    .rmdp-arrow-container,
    .rmdp-arrow-container:hover {
      background-color: transparent;
      border: none;
      box-shadow: none;
      display: flex;
      justify-content: center;
      align-items: center;
      & > i {
        border-color: ${theme.text.light.primary};
      }
    }

    .rmdp-week {
      :first-child {
        padding: 0 8px;
        margin-bottom: 6px;
      }
    }

    .rmdp-day-picker {
      .rmdp-week-day {
        color: ${theme.text.dark.ternary};
        font-size: ${theme.typography.fontSize.body.S};
        line-height: ${theme.typography.lineHeight.XS};
        font-weight: ${theme.typography.fontWeight.regular};
      }

      .rmdp-day {
        color: ${theme.text.light.primary};
        font-size: ${theme.typography.fontSize.body.S};
        line-height: ${theme.typography.lineHeight.XS};
        font-weight: ${theme.typography.fontWeight.regular};
        width: 40px;
        height: 40px;
        box-shadow: none;
        border-radius: 50%;
        margin: 0.32rem;
        &.rmdp-deactive {
          color: ${theme.text.dark.ternary};
        }
        &:hover {
          color: ${theme.text.light.primary};
          background-color: ${theme.palette.Brand[900]};
          border: 1px solid ${theme.palette.Brand[400]};
          & > span {
            background-color: transparent;
          }
        }
        & > span {
          background-color: transparent;
          &:hover {
            background-color: transparent;
          }
        }
      }

      .rmdp-day.rmdp-selected span:not(.highlight),
      .rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden) span:hover {
        background-color: transparent;
        box-shadow: none;
      }

      .rmdp-today:not(.rmdp-range):not(.rmdp-selected):not(.start):not(.end) {
        color: ${theme.text.light.primary};
        font-size: ${theme.typography.fontSize.body.S};
        line-height: ${theme.typography.lineHeight.XS};
        font-weight: ${theme.typography.fontWeight.regular};
        background-color: ${theme.palette.Neutral[700]} !important;
        border: none !important;
        &:hover {
          color: ${theme.text.light.primary};
          background-color: ${theme.palette.Neutral[700]} !important;
          border: none !important;
        }
      }

      .rmdp-range,
      .rmdp-selected {
        box-shadow: none;
        color: ${theme.text.light.primary} !important;
        font-size: ${theme.typography.fontSize.body.S};
        line-height: ${theme.typography.lineHeight.XS};
        font-weight: ${theme.typography.fontWeight.regular};
        background-color: ${theme.palette.Brand[900]} !important;
        border: 1px solid ${theme.palette.Brand[400]};
        &:hover {
          color: ${theme.text.light.primary} !important;
          background-color: ${theme.palette.Brand[900]} !important;
          border: 1px solid ${theme.palette.Brand[400]} !important;
        }
      }
    }

    .rmdp-year-picker {
      .rmdp-week-day {
        color: ${theme.text.dark.ternary};
        font-size: ${theme.typography.fontSize.body.S};
        line-height: ${theme.typography.lineHeight.XS};
        font-weight: ${theme.typography.fontWeight.regular};
      }
      .rmdp-day {
        text-align: center;
        color: ${theme.text.light.primary};
        font-size: ${theme.typography.fontSize.body.S};
        line-height: ${theme.typography.lineHeight.XS};
        font-weight: ${theme.typography.fontWeight.regular};
        width: 105px;
        height: 40px;
        box-shadow: none;
        border-radius: 6px;
        margin: auto 0.42rem;
        border: 1px solid ${theme.palette.Brand[400]};
        background-color: transparent;
        &.rmdp-selected,
        &.rmdp-range,
        &.start,
        &.end {
          color: ${theme.text.light.primary} !important;
          background-color: ${theme.palette.Brand[900]} !important;
          & > span {
            background-color: transparent !important;
            border: none !important;
          }
        }
        &:hover {
          color: ${theme.text.light.primary};
          background-color: ${theme.palette.Brand[900]};
          & > span {
            background-color: transparent;
            box-shadow: none;
          }
        }
        & > span {
          background-color: transparent;
          box-shadow: none;
          &:hover {
            background-color: transparent;
          }
        }
      }

      .rmdp-day.rmdp-selected span:not(.highlight),
      .rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden) span:hover {
        background-color: transparent;
        box-shadow: none;
      }

      .rmdp-today:not(.rmdp-range):not(.rmdp-selected):not(.start):not(.end) {
        color: ${theme.text.light.primary};
        font-size: ${theme.typography.fontSize.body.S};
        line-height: ${theme.typography.lineHeight.XS};
        font-weight: ${theme.typography.fontWeight.regular};
        background-color: ${theme.palette.Neutral[700]} !important;
        border: none !important;
        &:hover {
          color: ${theme.text.light.primary};
          background-color: ${theme.palette.Neutral[700]} !important;
          border: none !important;
        }
      }
    }

    .rmdp-month-picker {
      .rmdp-week-day {
        color: ${theme.text.dark.ternary};
        font-size: ${theme.typography.fontSize.body.S};
        line-height: ${theme.typography.lineHeight.XS};
        font-weight: ${theme.typography.fontWeight.regular};
      }
      .rmdp-day {
        text-align: center;
        color: ${theme.text.light.primary};
        font-size: ${theme.typography.fontSize.body.S};
        line-height: ${theme.typography.lineHeight.XS};
        font-weight: ${theme.typography.fontWeight.regular};
        width: 105px;
        height: 40px;
        box-shadow: none;
        border-radius: 6px;
        margin: auto 0.42rem;
        border: 1px solid ${theme.palette.Brand[400]};
        background-color: transparent;
        &.rmdp-selected,
        &.rmdp-range,
        &.start,
        &.end {
          color: ${theme.text.light.primary} !important;
          background-color: ${theme.palette.Brand[900]} !important;
          & > span {
            background-color: transparent !important;
            border: none !important;
          }
        }
        &:hover {
          color: ${theme.text.light.primary};
          background-color: ${theme.palette.Brand[900]};
          & > span {
            background-color: transparent;
            box-shadow: none;
          }
        }
        & > span {
          background-color: transparent;
          box-shadow: none;
          &:hover {
            background-color: transparent;
          }
        }
      }

      .rmdp-day.rmdp-selected span:not(.highlight),
      .rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden) span:hover {
        background-color: transparent;
        box-shadow: none;
      }

      .rmdp-today:not(.rmdp-range):not(.rmdp-selected):not(.start):not(.end) {
        color: ${theme.text.light.primary};
        font-size: ${theme.typography.fontSize.body.S};
        line-height: ${theme.typography.lineHeight.XS};
        font-weight: ${theme.typography.fontWeight.regular};
        background-color: ${theme.palette.Neutral[700]} !important;
        border: none !important;
        &:hover {
          color: ${theme.text.light.primary};
          background-color: ${theme.palette.Neutral[700]} !important;
          border: none !important;
        }
      }
    }

    .only.rmdp-month-picker,
    .only.rmdp-year-picker {
      width: auto;
    }
  `}
`;

const FieldBox = styled.div<StyledProps>`
  width: 100%;
  cursor: ${({ disabled }) => (disabled ? 'no-drop' : 'pointer')};
`;

const Label = styled.label<StyledProps>`
  ${({ theme, disabled }) => css`
    color: ${disabled ? theme.cmp.input.disabled.label : theme.cmp.input.label};
    line-height: ${theme.typography.lineHeight.XS};
    font-size: ${theme.typography.fontSize.body.S};
    font-weight: ${theme.typography.fontWeight.semiBold};
    margin-bottom: 5px;
  `}
`;

const ValidationText = styled.div<StyledProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme, error }) => css`
    margin-top: 2px;
    color: ${error ? theme.cmp.input.error : theme.cmp.input.error};
    font-size: ${theme.typography.fontSize.body.XS};
    line-height: ${theme.typography.lineHeight.XXS};
  `}
`;

const StyledDatePickerInput = styled(DatePickerInput)<StyledProps>``;
