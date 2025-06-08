import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useMediaQuery,
  useTheme,
} from '@mui/material';

interface FilterPanelProps {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters }) => {
  const [assignee, setAssignee] = useState('');
  const [tag, setTag] = useState('');
  const [dueDate, setDueDate] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const addFilter = (filter: string) => {
    if (filter && !filters.includes(filter)) {
      setFilters([...filters, filter]);
    }
  };

  const removeFilter = (index: number) => {
    const updated = [...filters];
    updated.splice(index, 1);
    setFilters(updated);
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom textAlign="center">
        Filter Tasks
      </Typography>

      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={2}
        flexWrap="wrap"
        alignItems="stretch"
        justifyContent="center"
        mb={2}
      >
        {/* Assignee Field */}
        <Stack direction={isMobile ? 'column' : 'row'} spacing={1} alignItems="center">
          <TextField
            label="Assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            size="small"
            fullWidth={isMobile}
          />
          <Button
            variant="contained"
            onClick={() => {
              addFilter(`Assignee:${assignee}`);
              setAssignee('');
            }}
            disabled={!assignee.trim()}
          >
            Add
          </Button>
        </Stack>

        {/* Tag Dropdown */}
        <Stack direction={isMobile ? 'column' : 'row'} spacing={1} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 120 }} fullWidth={isMobile}>
            <InputLabel id="tag-label">Tag</InputLabel>
            <Select
              labelId="tag-label"
              label="Tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <MenuItem value="Frontend">Frontend</MenuItem>
              <MenuItem value="Backend">Backend</MenuItem>
              <MenuItem value="Design">Design</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={() => {
              addFilter(`Tag:${tag}`);
              setTag('');
            }}
            disabled={!tag}
          >
            Add
          </Button>
        </Stack>

        {/* Due Date */}
        <Stack direction={isMobile ? 'column' : 'row'} spacing={1} alignItems="center">
          <TextField
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            size="small"
            fullWidth={isMobile}
          />
          <Button
            variant="contained"
            onClick={() => {
              addFilter(`Due:${dueDate}`);
              setDueDate('');
            }}
            disabled={!dueDate}
          >
            Add
          </Button>
        </Stack>
      </Stack>

      {/* Active Filters */}
      <Box>
        <Typography variant="subtitle1" textAlign="center">
          Active Filters:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" mt={1}>
          {filters.map((f, i) => (
            <Chip
              key={i}
              label={f}
              onDelete={() => removeFilter(i)}
              color="primary"
              variant="outlined"
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default FilterPanel;
