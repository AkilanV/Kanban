import React, { useState } from 'react';
import type { Task } from '../types/types';
import type { ColumnType, Tag } from '../types/types';
import { v4 as uuid } from 'uuid';
import {
  Button,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

interface Props {
  onAdd: (task: Task) => void;
}

const CreateCardModal: React.FC<Props> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    tag: 'Frontend',
    assignee: '',
    dueDate: '',
    createdAt: new Date().toISOString().split('T')[0],
    createdBy: '',
    estimation: '1 point',
    column: 'Open',
  });

  const handleSubmit = () => {
    onAdd({ id: uuid(), ...form });
    setForm({ ...form, title: '', description: '', assignee: '', createdBy: '', dueDate: '' });
    setOpen(false);
  };

  return (
    <>
      <Container maxWidth="md">
        <Box display="flex" justifyContent="flex-end" py={2}>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Create Card
          </Button>
        </Box>
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <TextField
            label="Assignee"
            fullWidth
            margin="normal"
            value={form.assignee}
            onChange={(e) => setForm({ ...form, assignee: e.target.value })}
          />
          <TextField
            label="Created By"
            fullWidth
            margin="normal"
            value={form.createdBy}
            onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
          />
          <TextField
            label="Due Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="tag-label">Tag</InputLabel>
            <Select
              labelId="tag-label"
              value={form.tag}
              label="Tag"
              onChange={(e) => setForm({ ...form, tag: e.target.value as Tag })}
            >
              <MenuItem value="Frontend">Frontend</MenuItem>
              <MenuItem value="Backend">Backend</MenuItem>
              <MenuItem value="Design">Design</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="column-label">Column</InputLabel>
            <Select
              labelId="column-label"
              value={form.column}
              label="Column"
              onChange={(e) => setForm({ ...form, column: e.target.value as ColumnType })}
            >
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Estimation"
            fullWidth
            margin="normal"
            value={form.estimation}
            onChange={(e) => setForm({ ...form, estimation: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add
          </Button>
          <Button onClick={() => setOpen(false)} color="secondary" variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateCardModal;
