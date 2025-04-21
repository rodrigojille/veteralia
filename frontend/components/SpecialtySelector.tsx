import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";

interface SpecialtySelectorProps {
  value: string[];
  options: string[];
  language: string;
  onConfirm: (selected: string[]) => void;
}

export default function SpecialtySelector({ value, options, language, onConfirm }: SpecialtySelectorProps) {
  const [open, setOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState<string[]>(value || []);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setTempSelected(typeof value === 'string' ? value.split(',') : value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onConfirm(tempSelected);
    setOpen(false);
  };

  return (
    <Box mb={2}>
      <FormControl fullWidth>
        <InputLabel id="specialty-label">{language === "es" ? "Especialidad(es)" : "Specialty(ies)"}</InputLabel>
        <Select
          labelId="specialty-label"
          multiple
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          value={tempSelected}
          input={<OutlinedInput label={language === "es" ? "Especialidad(es)" : "Specialty(ies)"} />}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(selected as string[]).map((val) => (
                <Chip key={val} label={val} />
              ))}
            </Box>
          )}
          MenuProps={{ disableAutoFocusItem: true }}
        >
          {options.map((spec) => (
            <MenuItem key={spec} value={spec}>
              {spec}
            </MenuItem>
          ))}
          <MenuItem disabled divider />
          <MenuItem disableRipple disableGutters>
            <Stack direction="row" width="100%" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleConfirm}
                sx={{ mt: 1 }}
              >
                {language === "es" ? "Confirmar" : "Confirm"}
              </Button>
            </Stack>
          </MenuItem>
        </Select>
      </FormControl>
      <Box mt={1}>
        {value.length > 0 && (
          <Typography variant="body2" color="text.secondary">
            {language === "es" ? "Seleccionadas:" : "Selected:"}
          </Typography>
        )}
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {value.map((val) => (
            <Chip key={val} label={val} color="success" />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
