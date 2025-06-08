import React from 'react';
import type { Task } from '../types/types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from '@mui/material';

interface Props {
  task: Task;
  setOpen: (open: boolean) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const CardDetailModal: React.FC<Props> = ({ task, setOpen, setTasks }) => {
  const handleDelete = () => {
    setTasks((prev: Task[]) => prev.filter((t: Task) => t.id !== task.id));
    setOpen(false);
  };

  return (
    <Dialog open={true} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>{task.title}</DialogTitle>
      <DialogContent dividers>
        <Box mb={1}>
          <Typography variant="subtitle2" component="span">
            Description:{' '}
          </Typography>
          <Typography component="span">{task.description}</Typography>
        </Box>
        <Box mb={1}>
          <Typography variant="subtitle2" component="span">
            Tag:{' '}
          </Typography>
          <Typography component="span">{task.tag}</Typography>
        </Box>
        <Box mb={1}>
          <Typography variant="subtitle2" component="span">
            Created At:{' '}
          </Typography>
          <Typography component="span">{task.createdAt}</Typography>
        </Box>
        <Box mb={1}>
          <Typography variant="subtitle2" component="span">
            Created By:{' '}
          </Typography>
          <Typography component="span">{task.createdBy}</Typography>
        </Box>
        <Box mb={1}>
          <Typography variant="subtitle2" component="span">
            Assignee:{' '}
          </Typography>
          <Typography component="span">{task.assignee}</Typography>
        </Box>
        <Box mb={1}>
          <Typography variant="subtitle2" component="span">
            Estimation:{' '}
          </Typography>
          <Typography component="span">{task.estimation}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
        <Button onClick={() => setOpen(false)} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardDetailModal;
