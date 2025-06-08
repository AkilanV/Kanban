import { useState } from 'react';
import Board from './components/Board';
import CreateCardModal from './components/CreateCardModal';
import FilterPanel from './components/FilterPanel';
import { dummyTasks } from './data/dummyTasks';
import { Container, Typography, Box } from '@mui/material';
import type { Task } from './types/types';
import CustomDragLayer from './components/CustomDragLayer';
function App() {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [filters, setFilters] = useState<string[]>([]);

  const filteredTasks = tasks.filter((task) => {
    if (filters.length === 0) return true;
    return filters.every((filter) => {
      if (filter.startsWith('Assignee:')) {
        const value = filter.replace('Assignee:', '');
        return task.assignee.includes(value);
      }
      if (filter.startsWith('Tag:')) {
        const value = filter.replace('Tag:', '');
        return task.tag.includes(value);
      }
      if (filter.startsWith('Due:')) {
        const value = filter.replace('Due:', '');
        return task.dueDate === value;
      }
      return true;
    });
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F5F5F5', // ✅ light gray background
        py: 4,
      }}
    >
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Kanban Board
        </Typography>
        <FilterPanel filters={filters} setFilters={setFilters} />
        <CreateCardModal onAdd={(newCard) => setTasks([...tasks, newCard])} />
        <Board tasks={filteredTasks} setTasks={setTasks} />
      </Container>
       <CustomDragLayer />
    </Box>
  );
}

export default App;
