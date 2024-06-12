import React from 'react'
import { TextField } from '@mui/material'

type CustomTextFieldProps = {
  field?: string
  name: string
  value?: string | number
  scale?: number
  mainFontSize?: string
  toggleChange: (value: string) => void
  sxStyle?: object
  type?: string
  onBlur?: () => void
}

const CustomTextField = ({
  field,
  name,
  value,
  scale,
  mainFontSize,
  toggleChange,
  sxStyle,
  type,
  onBlur,
}: CustomTextFieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleChange(event.target.value)
  }

  return (
    <TextField
      value={value}
      name={name}
      sx={{
        height: 'auto',
        width: 'auto',
        fontSize: mainFontSize,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: 'none',
            outline: 'none',
          },
          '&.Mui-focused fieldset': {
            border: '1px solid white !important',
          },
        },
        '& .MuiInputBase-input': {
          padding: '0px 4px 0px 0px',
          textAlign: 'right',
        },
        color: 'inherit',
        textAlign: 'right',

        // display:'inline'
        ...sxStyle,
      }}
      inputProps={{
        style: {
          color: 'white',
        },
      }}
      // type={type ? type : 'text'}
      onBlur={onBlur}
      onChange={handleChange}
      placeholder='-'
    />
  )
}

export default CustomTextField
