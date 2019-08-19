import React from 'react';
import chroma from 'chroma-js';
import { SortableElement } from 'react-sortable-hoc';
import DeleteIcon from '@material-ui/icons/Delete';

function DraggableColorBox({ color, name, removeBox }) {
  const luminance = chroma(color).luminance();
  const isLightColor = luminance >= 0.8;

  return (
    <div
      style={{ backgroundColor: color }}
      className={`DraggableColorBox ${isLightColor && 'dark-text'}`}
    >
      <p className='DraggableColorBox__name'>{name}</p>
      <span className='DraggableColorBox__remove'>
        <DeleteIcon onClick={() => removeBox(name)} />
      </span>
    </div>
  );
}

export default SortableElement(DraggableColorBox);
