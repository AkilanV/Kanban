import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const CardDeleteModal: React.FC<Props> = ({ open, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent dividers>
        <Typography>Are you sure you want to delete this task?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
        <Button onClick={onCancel} color="secondary" variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardDeleteModal;
