import React from 'react';

function DraggableColorBox({ color }) {
  const styles = {
    backgroundColor: color,
    display: 'inline-block',
    height: '25%',
    width: '20%'
  };
  return (
    <div style={styles} className='DraggableColorBox'>
      <h5>{color}</h5>
    </div>
  );
}

export default DraggableColorBox;
