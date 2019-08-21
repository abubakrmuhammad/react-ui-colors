import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';

function DraggableColorList({ colors, removeColor }) {
  return (
    <div className='DraggableColorList'>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.name}
          {...color}
          removeBox={removeColor}
        />
      ))}
    </div>
  );
}

export default SortableContainer(DraggableColorList);
