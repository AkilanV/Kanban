import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ItemTypes } from '../types/itemTypes';
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Chip,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface CardProps {
  card: {
    id: string;
    title: string;
    dueDate: string;
    assignee: string;
    tag: string;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ card, onEdit, onDelete }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id: card.id, card },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Frontend':
        return 'primary';
      case 'Backend':
        return 'secondary';
      case 'Design':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box
      ref={drag}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        backgroundColor: '#fff',
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        mb: 2,
        transition: '0.2s ease',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="start">
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {card.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Due: {card.dueDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Assignee: {card.assignee}
          </Typography>
          <Chip
            label={card.tag}
            size="small"
            color={getTagColor(card.tag)}
            sx={{ mt: 1 }}
          />
        </Box>

        {/* Edit and Delete Icon */}

        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => onEdit?.(card.id)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={() => onDelete?.(card.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Card;
