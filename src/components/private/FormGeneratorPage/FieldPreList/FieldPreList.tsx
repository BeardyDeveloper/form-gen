import { useFormGeneration } from 'hooks/useFormGeneration';
import { useAtom } from 'jotai';
import type { FC } from 'react';
import type {
  DraggableProvided,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { formFieldsDataAtom } from 'store/formGenerationStore';
import styled, { css } from 'styled-components';

import { FieldItemCard } from './FieldItemCard/FieldItemCard';

export const FieldsPreList: FC = () => {
  const [fields, setFields] = useAtom(formFieldsDataAtom);
  const { onSelectPreField, onDeletePreField } = useFormGeneration();

  const onDragEnd = (result: DropResult) => {
    const newFields = [...fields];
    const [removed] = newFields.splice(result.source.index, 1);
    newFields.splice(result.destination!.index, 0, removed!);
    setFields(newFields);
  };

  if (fields.length > 0) {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppableInputs">
          {(dropProvided: DroppableProvided) => (
            <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
              {fields.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(dragProvided: DraggableProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      <FieldItemCard
                        name={item.fieldName}
                        onEdit={() => onSelectPreField(item.id)}
                        onDelete={() => onDeletePreField(item.id)}
                      />
                      {dropProvided.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  } else {
    return <NoCardMessage>There is no Field</NoCardMessage>;
  }
};

const NoCardMessage = styled.span`
  ${({ theme }) => css`
    color: ${theme.text.light.secondary};
    font-weight: ${theme.typography.fontWeight.medium};
    font-size: ${theme.typography.fontSize.body.M};
  `}
`;
