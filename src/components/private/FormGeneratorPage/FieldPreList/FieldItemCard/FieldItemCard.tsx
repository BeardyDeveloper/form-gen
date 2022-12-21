import { Edit2, TextalignJustifycenter, Trash } from 'iconsax-react';
import type { FC } from 'react';
import styled, { css } from 'styled-components';

interface FieldItemCardProps {
  name: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const FieldItemCard: FC<FieldItemCardProps> = props => {
  const { name, onEdit, onDelete } = props;

  return (
    <Container>
      <Content>
        <DragDropIcon size={32} />
        <Title>{name}</Title>
      </Content>
      <Actions>
        <EditIcon size={24} onClick={onEdit} />
        <DeleteIcon size={24} onClick={onDelete} />
      </Actions>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 6px;
  border-radius: 6px;
  ${({ theme }) => css`
    background-color: ${theme.background.dark.secondary};
    font-size: ${theme.typography.fontSize.body.S};
    font-weight: ${theme.typography.fontWeight.regular};
  `}
`;

const Content = styled.div`
  width: calc(100% - 60px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.span`
  ${({ theme }) => css`
    margin-left: 8px;
    color: ${theme.text.light.primary};
    font-size: ${theme.typography.fontSize.body.M};
    font-weight: ${theme.typography.fontWeight.regular};
  `}
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const DragDropIcon = styled(TextalignJustifycenter)`
  ${({ theme }) => css`
    color: ${theme.palette.Neutral[600]};
  `}
`;

const EditIcon = styled(Edit2)`
  ${({ theme }) => css`
    color: ${theme.palette.Status.Teal[600]};
    margin-right: 12px;
    cursor: pointer;
  `}
`;

const DeleteIcon = styled(Trash)`
  ${({ theme }) => css`
    color: ${theme.palette.Status.Rose[600]};
    cursor: pointer;
  `}
`;
