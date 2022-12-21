import { ReactComponent as CloseSVG } from 'assets/icons/Close.svg';
import { ArrowDown2 } from 'iconsax-react';
import type { CSSProperties, ReactElement } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import type {
  ClearIndicatorProps,
  ControlProps,
  DropdownIndicatorProps,
  MenuListProps,
} from 'react-select';
import { components } from 'react-select';
import styled, { css } from 'styled-components';

export const MenuList = ({ children, ...props }: MenuListProps) => {
  return (
    <components.MenuList {...props}>
      <Scrollbar>
        <ScrollableMenu>{children}</ScrollableMenu>
      </Scrollbar>
    </components.MenuList>
  );
};

export const customControl = (icon?: ReactElement) => {
  const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const Control = ({ children, ...props }: ControlProps) => {
    return (
      <components.Control {...props} {...styles}>
        {icon ? (
          <ControlIcon isFocused={props.isFocused}>{icon}</ControlIcon>
        ) : null}
        {children}
      </components.Control>
    );
  };

  return Control;
};

export const Group = (args: any) => (
  <div>
    <components.Group {...args} />
  </div>
);

export const customOption = () => {
  const styles = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const Option = (props: any) => {
    return (
      <>
        <components.Option {...props} {...styles}>
          <OptionBox>
            {props.data.icon ? (
              <IconBox isSelected={props.isSelected}>{props.data.icon}</IconBox>
            ) : null}
            <Values>
              <label>{props.value}</label>
              <Helper>{props.data.helper}</Helper>
            </Values>
          </OptionBox>
        </components.Option>
      </>
    );
  };

  return Option;
};

export const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <IndicatorBox>
        <ArrowDown2 size={20} variant="Bold" />
      </IndicatorBox>
    </components.DropdownIndicator>
  );
};

export const ClearIndicator = (props: ClearIndicatorProps) => {
  const {
    children = <CloseSVG />,
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;

  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props) as CSSProperties}
    >
      <IndicatorBox isDark>{children}</IndicatorBox>
    </div>
  );
};

interface StyledProps {
  isSelected?: boolean;
  isFocused?: boolean;
  isDark?: boolean;
}

const IconBox = styled.div<StyledProps>`
  & > svg {
    width: 20px;
    height: 20px;
    ${({ theme, isSelected }) => css`
      color: ${isSelected ? theme.cmp.input.color : theme.cmp.input.color};
    `};
  }
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  @include row-center;
  margin-right: 8px;
`;

const ControlIcon = styled.span<StyledProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme, isFocused }) => css`
    & > svg {
      width: 20px;
      height: 20px;
      color: ${isFocused
        ? theme.cmp.input.placeholder
        : theme.cmp.input.placeholder};
    }
  `}
`;

const Scrollbar = styled(PerfectScrollbar)<StyledProps>`
  & .ps__rail-y {
    border-radius: 4px !important;
  }
  & .ps .ps__rail-y,
  & .ps .ps--clicking {
    background: ${({ theme }) => theme.palette.Neutral[50]} !important;
    width: 10px !important;
  }
  & .ps .ps__rail-y:hover,
  & .ps .ps--clicking {
    background: ${({ theme }) => theme.palette.Neutral[50]} !important;
    width: 10px !important;
  }
  & .ps__thumb-y {
    width: 10px !important;
    background: ${({ theme }) => theme.palette.Neutral[200]} !important;
    cursor: pointer;
  }
`;

const ScrollableMenu = styled.div<StyledProps>`
  width: 100%;
  height: 100%;
  padding: 8px 8px;
`;

const OptionBox = styled.div<StyledProps>`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`;

const Values = styled.div<StyledProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Helper = styled.span<StyledProps>`
  ${({ theme }) => css`
    color: ${theme.text.light.primary};
  `}
`;

const IndicatorBox = styled.span<StyledProps>`
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  & > svg {
    color: ${({ theme }) => theme.palette.Neutral[400]};
  }
`;
