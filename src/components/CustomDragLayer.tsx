import React from 'react';
import { useDragLayer } from 'react-dnd';
import { Paper, Typography, Chip, Stack } from '@mui/material';

const layerStyles: React.CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 1300,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(currentOffset: { x: number; y: number } | null) {
  if (!currentOffset) return { display: 'none' };
  const { x, y } = currentOffset;
  return {
    transform: `translate(${x}px, ${y}px)`,
  };
}

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

const CustomDragLayer: React.FC = () => {
  const { item, isDragging, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem() as any,
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging || !item) return null;

  const { card } = item;

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(currentOffset)}>
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            width: 280,
            backgroundColor: '#fff',
            boxShadow: 6,
            opacity: 0.9,
          }}
          elevation={6}
        >
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {card.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Due: {card.dueDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Assignee: {card.assignee}
          </Typography>
          <Stack direction="row" spacing={1} mt={1}>
            <Chip label={card.tag} color={getTagColor(card.tag)} size="small" />
          </Stack>
        </Paper>
      </div>
    </div>
  );
};

export default CustomDragLayer;
