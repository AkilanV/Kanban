import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../types/itemTypes';
import Card from './Card';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
} from '@mui/material';

import InboxIcon from '@mui/icons-material/Inbox';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import type { Task } from '../types/types';
import EditModal from './CardEditModal';
import CardDeleteModal from './CardDeleteModal';

const columns = ['Open', 'In Progress', 'Done'];

interface BoardProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Board: React.FC<BoardProps> = ({ tasks, setTasks }) => {
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  const moveCard = (cardId: string, toColumn: string) => {
    setTasks((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, column: toColumn as Task['column'] } : card
      )
    );
  };

  const handleDeleteConfirm = () => {
    if (deleteTaskId) {
      setTasks((prev) => prev.filter((task) => task.id !== deleteTaskId));
      setDeleteTaskId(null);
    }
  };

  const handleEditSave = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditTask(null);
  };

  return (
    <Box mt={4} px={2}>
      <Grid container spacing={2}>
        {columns.map((column) => (
          <Grid item xs={12} sm={6} md={4} key={column}>
            <Column
              column={column}
              cards={tasks.filter((card) => card.column === column)}
              moveCard={moveCard}
              onEdit={(id) => setEditTask(tasks.find((task) => task.id === id) ?? null)}
              onDelete={(id) => setDeleteTaskId(id)}
            />
          </Grid>
        ))}
      </Grid>

      {editTask && (
        <EditModal
          open={Boolean(editTask)}
          task={editTask}
          onClose={() => setEditTask(null)}
          onSave={handleEditSave}
        />
      )}

      {deleteTaskId && (
        <CardDeleteModal
          open={Boolean(deleteTaskId)}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTaskId(null)}
        />
      )}
    </Box>
  );
};

interface ColumnProps {
  column: string;
  cards: Task[];
  moveCard: (cardId: string, toColumn: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

// ✅ Icons for each column
const columnIcons: Record<string, React.ReactNode> = {
  'Open': <InboxIcon fontSize="small" sx={{ mr: 1 }} />,
  'In Progress': <BuildIcon fontSize="small" sx={{ mr: 1 }} />,
  'Done': <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />,
};

// ✅ Background colors per column
const columnColors: Record<string, string> = {
  'Open': '#E3F2FD',         // Light Blue
  'In Progress': '#FFF3E0',  // Light Orange
  'Done': '#E8F5E9',         // Light Green
};

const Column: React.FC<ColumnProps> = ({ column, cards, moveCard, onEdit, onDelete }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item: { id: string }) => moveCard(item.id, column),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  return (
    <Paper
      ref={drop}
      elevation={4}
      sx={{
        minHeight: '500px',
        minWidth: '300px',
        p: 2,
        borderRadius: 2,
        backgroundColor: columnColors[column] || '#fdfdfd',
        border: isActive ? '2px dashed #1976d2' : '2px solid transparent',
        transition: 'border 0.2s ease',
      }}
    >
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {columnIcons[column]} {column}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {cards.length === 0 ? (
        <Typography variant="body2" color="text.secondary" align="center">
          No tasks in this column.
        </Typography>
      ) : (
        cards.map((card) => (
          <Card key={card.id} card={card} onEdit={onEdit} onDelete={onDelete} />
        ))
      )}
    </Paper>
  );
};

export default Board;
