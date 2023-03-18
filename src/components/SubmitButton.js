import React from 'react';
import Button from '@mui/material/Button';

const SubmitButton = (props) => {
  const { children, clickFunction } = props;
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={clickFunction}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
