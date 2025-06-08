import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import type { Task } from '../types/types';

interface Props {
  open: boolean;
  task: Task;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

const CardEditModal: React.FC<Props> = ({ open, task, onClose, onSave }) => {
  const [form, setForm] = useState<Task>(task);

  useEffect(() => {
    setForm(task);
  }, [task]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent dividers>
        <TextField
          name="title"
          label="Title"
          value={form.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="description"
          label="Description"
          value={form.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          name="assignee"
          label="Assignee"
          value={form.assignee}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="createdBy"
          label="Created By"
          value={form.createdBy}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="dueDate"
          label="Due Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={form.dueDate}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Tag</InputLabel>
          <Select name="tag" value={form.tag} label="Tag" onChange={handleSelectChange}>
            <MenuItem value="Frontend">Frontend</MenuItem>
            <MenuItem value="Backend">Backend</MenuItem>
            <MenuItem value="Design">Design</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Column</InputLabel>
          <Select name="column" value={form.column} label="Column" onChange={handleSelectChange}>
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="estimation"
          label="Estimation"
          value={form.estimation}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={onClose} color="secondary" variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardEditModal;