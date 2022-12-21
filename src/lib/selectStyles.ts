import type { ITheme } from 'theme/ITheme';

interface StylesProps {
  menuWidth?: string;
  menuLeft?: string;
  menuHeight?: number;
  theme: ITheme;
  error?: boolean;
}

export const selectStyles = ({
  menuWidth,
  menuLeft,
  menuHeight,
  theme,
  error,
}: StylesProps) => ({
  container: (provided: any, state: any) => {
    return {
      ...provided,
      'height': 'auto',
      'borderRadius': '8px',
      'overflow': 'hodden',
      'backgroundColor': theme.cmp.input.bg,
      'border': `1px solid ${
        error
          ? theme.cmp.input.border.error
          : state.isFocused && state.selectProps.menuIsOpen
          ? theme.cmp.input.border.active
          : theme.cmp.input.border.default
      }`,
      'outline': `1px solid ${
        error
          ? 'none'
          : state.isFocused && state.selectProps.menuIsOpen
          ? theme.cmp.input.outline
          : 'none'
      }`,
      ':hover': {
        borderColor: error
          ? theme.cmp.input.border.error
          : !state.isFocused
          ? theme.cmp.input.border.hover
          : theme.cmp.input.border.default,
      },
    };
  },
  menu: (styles: any) => ({
    ...styles,
    width: menuWidth ?? '100%',
    left: menuLeft ?? 0,
    backgroundColor: theme.background.dark.secondary,
    boxShadow: theme.shadows.M,
    borderRadius: '8px',
    zIndex: 9999,
    padding: '8px 0',
    height: 'auto',
  }),
  menuList: (styles: any) => ({
    ...styles,
    height: menuHeight ?? '325px',
    maxHeight: '325px',
  }),
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
  option: (provided: any, state: any) => {
    return {
      ...provided,
      'width': '100%',
      'height': '47px',
      'borderBottom': 'none',
      'cursor': 'pointer',
      'color': theme.palette.Basic.White,
      'backgroundColor': state.isSelected ? theme.palette.Brand[500] : 'none',
      'padding': '8px 16px',
      'margin': '2px 0',
      'fontSize': theme.typography.fontSize.body.S,
      'borderRadius': '8px',
      'display': 'flex',
      ':active': {
        ...provided[':active'],
        'backgroundColor': theme.palette.Brand[700],
        ':hover': {
          ...provided[':hover'],
          backgroundColor: theme.palette.Brand[700],
        },
      },
      ':hover': {
        ...provided[':hover'],
        backgroundColor: !state.isSelected && theme.palette.Neutral[500],
      },
    };
  },
  input: (styles: any) => ({
    ...styles,
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: '8px',
    marginTop: 0,
    color: theme.cmp.input.color,
    caretColor: theme.cmp.input.placeholder,
    margin: 0,
  }),
  valueContainer: (styles: any) => ({
    ...styles,
    padding: '2px 8px',
    margin: 0,
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: theme.cmp.input.placeholder,
    fontSize: theme.typography.fontSize.body.M,
    margin: 0,
  }),
  control: (styles: any) => ({
    ...styles,
    'width': '100%',
    'minHeight': '44px',
    'height': 'auto',
    'backgroundColor': 'none',
    'border': 'none',
    'padding': '0 10px',
    'boxShadow': 'none',
    '&:hover': {
      border: 'none',
    },
    '& span': {
      color: theme.cmp.input.color,
    },
    'borderRadius': '8px',
    'display': 'flex',
    'justifyContent': 'space-between',
    'alignitems': 'center',
  }),
  dropdownIndicator: (styles: any) => ({
    ...styles,
    'color': theme.palette.Neutral[400],
    '&:hover': {
      color: theme.palette.Neutral[400],
    },
    'cursor': 'pointer',
  }),
  clearIndicator: (styles: any) => ({
    ...styles,
    'cursor': 'pointer',
    'color': theme.palette.Neutral[400],
    ':hover': {
      color: theme.palette.Neutral[400],
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    opacity: state.isDisabled ? 0.5 : 1,
    transition: 'opacity 300ms',
    color: theme.cmp.input.color,
    margin: 0,
  }),
});
