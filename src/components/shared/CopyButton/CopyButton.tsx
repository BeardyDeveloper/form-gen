import { DocumentCopy } from 'iconsax-react';
import type { FC, MouseEvent } from 'react';
import styled, { css } from 'styled-components';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

export const CopyButton: FC<CopyButtonProps> = props => {
  const { textToCopy, className } = props;

  const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <Container className={className} onClick={clickHandler}>
      <DocumentCopy size={24} />
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  ${({ theme }) => css`
    & > svg {
      color: ${theme.palette.Basic.White};
    }
  `}
`;
