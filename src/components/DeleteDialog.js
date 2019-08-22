import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

function DeleteDialog({ open, handleClose, deletePalette }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete this Palette?</DialogTitle>
      <List>
        <ListItem button onClick={deletePalette}>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
              <CheckIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>Delete</ListItemText>
        </ListItem>
        <ListItem button onClick={handleClose}>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
              <CloseIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>Cancel</ListItemText>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default DeleteDialog;
