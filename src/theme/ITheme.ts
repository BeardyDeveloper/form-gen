/* eslint-disable @typescript-eslint/naming-convention */
type Color = string;
type Gradient = string;
type Value = number;
type FontFamily = string;
type FontSize = string;
type BoxShadow = string;

interface Pallete {
  50: Color;
  100: Color;
  200: Color;
  300: Color;
  400: Color;
  500: Color;
  600: Color;
  700: Color;
  800: Color;
  900: Color;
}

export interface IGradients {
  glass: {
    toRight: Gradient;
    center: Gradient;
    toBottom: Gradient;
  };
  brand: {
    toBottom: Gradient;
  };
}

export interface IPalette {
  Neutral: Pallete;
  Brand: Pallete;
  Status: {
    Rose: {
      50: Color;
      400: Color;
      600: Color;
    };
    Amber: {
      100: Color;
      400: Color;
      600: Color;
    };
    Teal: {
      50: Color;
      400: Color;
      600: Color;
    };
  };
  Basic: {
    Black: Color;
    White: Color;
  };
}

export interface ITheme {
  palette: IPalette;
  gradients: IGradients;
  RGBA: {
    layout: Color;
  };
  opacity: {
    low: Value;
    medium: Value;
    high: Value;
    full: Value;
  };
  shadows: {
    S: BoxShadow;
    Default: BoxShadow;
    M: BoxShadow;
    L: BoxShadow;
    XL: BoxShadow;
    XXL: BoxShadow;
    Inner: BoxShadow;
  };
  background: {
    main: {
      primary: Color;
    };
    light: {
      primary: Color;
    };
    dark: {
      primary: Color;
      secondary: Color;
      ternary: Color;
    };
  };
  border: {
    main: {
      primary: Color;
    };
    dark: {
      primary: Color;
      secondary: Color;
      ternary: Color;
    };
  };
  box: {
    background: Color;
    highlight: Color;
    shadow: Color;
  };
  cmp: {
    input: {
      bg: Color;
      label: Color;
      placeholder: Color;
      color: Color;
      outline: Color;
      error: Color;
      border: {
        default: Color;
        hover: Color;
        active: Color;
        error: Color;
      };
      disabled: {
        bg: Color;
        label: Color;
      };
    };
    button: {
      primary: {
        default: Color;
        active: Color;
        loading: Color;
        text: {
          default: Color;
          loading: Color;
        };
      };
      secondary: {
        default: Color;
        active: Color;
        loading: Color;
        text: {
          default: Color;
          loading: Color;
        };
      };
      tertiary: {
        default: Color;
        active: Color;
        loading: Color;
        text: {
          default: Color;
          loading: Color;
        };
      };
      error: {
        default: Color;
        active: Color;
        loading: Color;
        text: {
          default: Color;
          loading: Color;
        };
      };
      disabled: {
        default: Color;
        text: Color;
      };
    };
    selection: {
      active: Color;
      deActive: Color;
      alpha: Color;
      color: Color;
      disabled: {
        active: Color;
        text: Color;
        tick: Color;
        bg: Color;
      };
    };
  };
  text: {
    light: {
      primary: Color;
      secondary: Color;
    };
    dark: {
      primary: Color;
      secondary: Color;
      ternary: Color;
      quaternary: Color;
    };
  };
  typography: {
    fontFamily: { [key: string]: FontFamily[] };
    fontWeight: {
      slim: Value;
      regular: Value;
      medium: Value;
      semiBold: Value;
      bold: Value;
      extraBold: Value;
    };
    lineHeight: {
      XXS: string;
      XS: string;
      S: string;
      M: string;
      L: string;
      XL: string;
      XXL: string;
    };
    fontSize: {
      heading: {
        S: FontSize;
        M: FontSize;
        L: FontSize;
        XL: FontSize;
        XXL: FontSize;
      };
      body: {
        XS: FontSize;
        S: FontSize;
        M: FontSize;
        L: FontSize;
      };
    };
    fontStyle: string;
    fontDisplay: string;
  };
}
