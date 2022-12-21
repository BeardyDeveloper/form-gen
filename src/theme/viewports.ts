// defines the resolutions of different devices (according to Material UI & Bootstrap)
/**
 * google chrome responsive sizes, these are the max width for each device type
 */
export const breakPoints = {
  mobileS: 410,
  mobileL: 600,
  tabletS: 768,
  tabletL: 1024,
  desktopS: 1232,
  desktopL: 1440,
};

export const device = {
  mobileS: `(max-width: ${breakPoints.mobileS}px)`,
  mobile: `(max-width: ${breakPoints.mobileL}px)`,
  tabletS: `(min-width: ${breakPoints.mobileL + 1}px) and (max-width: ${
    breakPoints.tabletS
  }px)`,
  tablet: `(min-width: ${breakPoints.tabletS + 1}px) and (max-width: ${
    breakPoints.tabletL
  }px)`,
  desktopS: `(min-width: ${breakPoints.tabletL + 1}px) and (max-width: ${
    breakPoints.desktopS
  }px)`,
  desktopL: `(min-width: ${breakPoints.desktopS + 1}px) and (max-width: ${
    breakPoints.desktopL
  }px)`,
};

export const below = {
  mobileS: `(max-width: ${breakPoints.mobileS}px)`, // includes      mobile small
  mobileL: `(max-width: ${breakPoints.mobileL}px)`, // includes      all mobiles
  tabletS: `(max-width: ${breakPoints.tabletS}px)`, // includes      mobile & tablet small
  tabletL: `(max-width: ${breakPoints.tabletL}px)`, // includes      mobile & all tablets
  desktopS: `(max-width: ${breakPoints.desktopS}px)`, // includes    mobile & tablet & desktop small
  desktopL: `(max-width: ${breakPoints.desktopL}px)`, // includes     mobile & tablet & all descktops
};

export const above = {
  mobileS: `(min-width: ${breakPoints.mobileS + 1}px)`, // includes       mobile & tablet & desktop
  mobileL: `(min-width: ${breakPoints.mobileL + 1}px)`, // includes       tablet & desktop
  tabletS: `(min-width: ${breakPoints.tabletS + 1}px)`, // includes       tablet large & desktop
  tabletL: `(min-width: ${breakPoints.tabletL + 1}px)`, // includes       desktop small & desktop large
  desktopS: `(min-width: ${breakPoints.desktopS + 1}px)`, // includes     desktop large
  desktopL: `(min-width: ${breakPoints.desktopL + 1}px)`, // includes     > desktop
};
