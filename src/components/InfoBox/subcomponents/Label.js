import React, { useCallback, useContext } from 'react';
// MUI/@emotion imports
import styled from '@emotion/styled';
// ? Context
import { InfoBoxContext } from '../InfoBoxContext';

import PropTypes from 'prop-types';

const StyledLabelInput = styled('input')({
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20.02px',
  color: 'rgba(99, 99, 99, 1)',
  width: '650px',
  height: '20px',
  background: '#FAFAFA',
  letterSpacing: '0.15px',
  border: 'none',
  padding: 0,

  '&::placeholder': {
    color: 'rgba(99, 99, 99, 1)',
  },

  '&:focus': {
    outline: 'none',

    '&::placeholder': {
      color: 'rgba(0, 0, 0, 0.12)',
    },
  },
});
const Label = ({ setDisableToolbar }) => {
  const [state, dispatch] = useContext(InfoBoxContext);

  const handleLabelChange = useCallback((e) => {
    dispatch({
      func: 'CHANGE_LABEL',
      label: e.target.value,
    });
  }, []);

  return (
    <StyledLabelInput
      id="infoBox-label"
      type="text"
      placeholder="Type your label here"
      aria-label="InfoBox label"
      autocomplete="false"
      maxLength={50}
      multiline={false}
      value={state.infoBoxLabel}
      onChange={handleLabelChange}
      onFocus={() => {
        setDisableToolbar(true);
      }}
      onBlur={() => {
        setDisableToolbar(false);
      }}
    />
  );
};
Label.propTypes = {
  setDisableToolbar: PropTypes.func.isRequired,
};
export default Label;
