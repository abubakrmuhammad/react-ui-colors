import React from 'react';
import chroma from 'chroma-js';
import DeleteIcon from '@material-ui/icons/Delete';

function DraggableColorBox({ color, name }) {
  const styles = {
    backgroundColor: color,
    color: '#fff',
    display: 'inline-block',
    height: '25%',
    width: '20%'
  };

  const luminance = chroma(color).luminance();
  const isLightColor = luminance >= 0.8;

  return (
    <div
      style={styles}
      className={`DraggableColorBox ${isLightColor && 'dark-text'}`}
    >
      <p className='DraggableColorBox__name'>{name}</p>
      <span className='DraggableColorBox__remove'>
        <DeleteIcon />
      </span>
    </div>
  );
}

export default DraggableColorBox;
