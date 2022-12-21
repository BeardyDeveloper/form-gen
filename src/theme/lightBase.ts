import type { IGradients, IPalette, ITheme } from './ITheme';

export const palette: IPalette = {
  Neutral: {
    50: '#F8F9FC',
    100: '#F1F3F9',
    200: '#E2E6F0',
    300: '#CBD1E1',
    400: '#949EB8',
    500: '#646F8B',
    600: '#475169',
    700: '#333D55',
    800: '#141B2D',
    900: '#060B18',
  },
  Brand: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },
  Status: {
    Rose: {
      50: '#FFF1F2',
      400: '#FB7185',
      600: '#E11D48',
    },
    Amber: {
      100: '#FEF3C7',
      400: '#F59E0B',
      600: '#D97706',
    },
    Teal: {
      50: '#F0FDFA',
      400: '#2DD4BF',
      600: '#0D9488',
    },
  },
  Basic: {
    Black: '#000000',
    White: '#ffffff',
  },
};

export const gradients: IGradients = {
  glass: {
    toRight: 'linear-gradient(270deg, #3D3A78 -19.01%, #191E2A 103.29%)',
    center:
      'radial-gradient(50% 6823.24% at 50% 50%, #2F2B5C 0%, #13192A 100%)',
    toBottom:
      'radial-gradient(100% 100% at 50% 100%, #1E1D49 0%, #161B30 52.95%)',
  },
  brand: {
    toBottom:
      'radial-gradient(100% 100% at 50% 100%, rgba(30, 29, 73, 0.8) 0%, rgba(22, 27, 48, 0.8) 52.95%)',
  },
};

export const lightBase: ITheme = {
  palette,
  gradients,
  RGBA: {
    layout: 'rgba(20, 27, 45, 0.7)',
  },
  shadows: {
    S: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    Default: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    M: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    L: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
    XL: ' 0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    XXL: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    Inner: 'inset 0px 2px 4px rgba(0, 0, 0, 0.06)',
  },
  opacity: {
    low: 0.25,
    medium: 0.5,
    high: 0.75,
    full: 1,
  },
  background: {
    main: {
      primary: palette.Brand[600],
    },
    light: {
      primary: palette.Basic.White,
    },
    dark: {
      primary: palette.Neutral[900],
      secondary: palette.Neutral[800],
      ternary: palette.Neutral[700],
    },
  },
  border: {
    main: {
      primary: palette.Brand[600],
    },
    dark: {
      primary: palette.Neutral[900],
      secondary: palette.Neutral[800],
      ternary: palette.Neutral[700],
    },
  },
  box: {
    background: '#FDFDFD',
    highlight: '#F4F4F4',
    shadow: '#888888',
  },
  cmp: {
    input: {
      bg: palette.Neutral[800],
      label: palette.Basic.White,
      placeholder: palette.Neutral[400],
      color: palette.Basic.White,
      outline: palette.Brand[200],
      error: palette.Status.Rose[400],
      border: {
        default: palette.Neutral[400],
        hover: palette.Neutral[500],
        active: palette.Brand[500],
        error: palette.Status.Rose[400],
      },
      disabled: {
        bg: palette.Neutral[500],
        label: palette.Neutral[400],
      },
    },
    button: {
      primary: {
        default: palette.Brand[600],
        active: palette.Brand[700],
        loading: palette.Brand[400],
        text: {
          default: palette.Basic.White,
          loading: palette.Basic.White,
        },
      },
      secondary: {
        default: palette.Neutral[700],
        active: palette.Neutral[800],
        loading: palette.Neutral[700],
        text: {
          default: palette.Basic.White,
          loading: palette.Basic.White,
        },
      },
      tertiary: {
        default: 'transparent',
        active: palette.Neutral[100],
        loading: 'transparent',
        text: {
          default: palette.Neutral[600],
          loading: palette.Neutral[500],
        },
      },
      error: {
        default: palette.Status.Rose[600],
        active: '#E11D58',
        loading: palette.Status.Rose[600],
        text: {
          default: palette.Basic.White,
          loading: palette.Basic.White,
        },
      },
      disabled: {
        default: palette.Neutral[700],
        text: palette.Basic.White,
      },
    },
    selection: {
      active: palette.Brand[600],
      deActive: palette.Neutral[700],
      alpha: 'transparent',
      color: palette.Basic.White,
      disabled: {
        active: palette.Brand[900],
        text: palette.Neutral[400],
        tick: palette.Neutral[500],
        bg: palette.Neutral[700],
      },
    },
  },
  text: {
    light: {
      primary: palette.Basic.White,
      secondary: '#FFFFFF60',
    },
    dark: {
      primary: palette.Neutral[900],
      secondary: palette.Neutral[700],
      ternary: palette.Neutral[400],
      quaternary: palette.Neutral[300],
    },
  },
  typography: {
    fontFamily: { en: [`'Inter', sans-serif`] },
    fontWeight: {
      slim: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 700,
    },
    lineHeight: {
      XXS: '16px',
      XS: '20px',
      S: '24px',
      M: '28px',
      L: '32px',
      XL: '36px',
      XXL: '48px',
    },
    fontSize: {
      heading: {
        S: '20px',
        M: '24px',
        L: '30px',
        XL: '36px',
        XXL: '48px',
      },
      body: {
        XS: '12px',
        S: '14px',
        M: '16px',
        L: '18px',
      },
    },
    fontStyle: 'normal',
    fontDisplay: 'swap',
  },
};
