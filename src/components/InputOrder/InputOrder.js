import React, { useEffect, useState } from "react";
import { Form } from 'semantic-ui-react';

function InputOrder({name, label, placeholder, onChange, validation, check_valid, onValid}) {

  const[value, setValue] = useState('');
  const[error, setError] = useState(false);

  const handleChange = (e, {value}) => {
    setValue(value)
    onChange(name, value)
  }

  useEffect(() => {
    let is_valid = false;
    let valid = value.match(validation)
    valid ? setError(false) : setError(true);

    if(valid !== null){
      if(valid[0] !== ''){ is_valid = true; }
    }
    onValid(is_valid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check_valid])

  return(
    <Form.Input required value={value} error={error} fluid label={label} placeholder={placeholder} onChange={handleChange} />
  );
}

export default InputOrder;
