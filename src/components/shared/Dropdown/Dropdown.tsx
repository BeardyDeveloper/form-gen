import { AnimatePresence, motion } from 'framer-motion';
import { useOnClickOutside } from 'hooks/common/useOnClickOutside';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import styled, { css } from 'styled-components';

export interface DropdownMenuOptionProps {
  id: string;
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  options: DropdownMenuOptionProps[];
  selectedOptionId: string | undefined;
  centerOptions?: boolean;
  onSelectOption: (value: DropdownMenuOptionProps) => void;
}

export const Dropdown: FC<DropdownProps> = props => {
  const { label, options, selectedOptionId, centerOptions, onSelectOption } =
    props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const togglerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(menuRef, () => setIsMenuOpen(false), togglerRef);

  return (
    <Container>
      <Toggler ref={togglerRef} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Label>{label}</Label>
        {!isMenuOpen ? (
          <ArrowDown2 variant="Bold" size={20} />
        ) : (
          <ArrowUp2 variant="Bold" size={20} />
        )}
      </Toggler>
      <AnimatePresence>
        {isMenuOpen ? (
          <Menu
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {options.map(option => (
              <Option
                key={option.id}
                isActive={selectedOptionId === option.id}
                centerOptions={centerOptions}
                onClick={() => {
                  onSelectOption(option);
                  setIsMenuOpen(false);
                }}
              >
                {option.label}
              </Option>
            ))}
          </Menu>
        ) : null}
      </AnimatePresence>
    </Container>
  );
};

interface StyledProps {
  isActive?: boolean;
  centerOptions?: boolean;
}

const Container = styled.div`
  position: relative;
`;

const Toggler = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 4px;
  padding: 8px 10px;
  ${({ theme }) => css`
    background-color: ${theme.palette.Brand[900]};
  `}
`;

const Label = styled.span`
  ${({ theme }) => css`
    margin-right: 8px;
    font-weight: ${theme.typography.fontWeight.semiBold};
  `}
`;

const Menu = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(-100%);
  width: auto;
  min-width: 234px;
  padding: 8px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  ${({ theme }) => css`
    background-color: ${theme.background.dark.secondary};
  `}
`;

const Option = styled.div<StyledProps>`
  width: 100%;
  padding: 8px 16px;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  transition: 150ms all ease-in;
  ${({ theme, isActive, centerOptions }) => css`
    justify-content: ${centerOptions ? 'center' : 'flex-start'};
    background-color: ${isActive
      ? theme.background.dark.ternary
      : theme.background.dark.secondary};
    font-weight: ${theme.typography.fontWeight.regular};

    &:hover {
      background-color: ${theme.background.dark.ternary};
      transition: 150ms all ease-in;
    }
  `}
`;
