import { Box, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'

type Props = {
  options: {
    value: string
    text: string
  }[]
  value: any
  scale: number
  mainFontSize: string
  name: string
  paddingLeft?: string
  paddingRight?: string
  handleChange: (value: string) => void
}

const CustomDropDown = ({
  options,
  value,
  mainFontSize,
  handleChange,
  paddingLeft,
  paddingRight
}: Props) => {
  return (
    <Select
      value={value}
      renderValue={(selectedValue) => {
        const selectedOption = options.find(
          (option) =>
            option.value === selectedValue || option.text == selectedValue
        )
        return (
          <InputLabel
            sx={{
              mb: 0,
              cursor: 'pointer',
              color: 'white',
              display: 'flex',
              justifyContent: 'flex-end',
              paddingLeft: `${paddingLeft}`,
              paddingRight: `${paddingRight}`,
            }}
          >
            {selectedOption ? selectedOption.text : 'META LITE'}
          </InputLabel>
        )
      }}
      sx={{
        height: 'auto',
        width: 'auto',
        fontSize: mainFontSize,
        '& .MuiInputBase-input': {
          padding: '0px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
          outline: 'none',
        },
        '& .MuiSelect-icon': {
          color: 'white',
        },
        '& .MuiOutlinedInput-input': {
          paddingRight: '2px !important',
        },
        border: 'none',
        outline: 'none',
        color: 'inherit',
      }}
      inputProps={{ IconComponent: () => null }}
      onChange={(e) => handleChange(e.target.value)}
    >
      {options?.map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.text}
        </MenuItem>
      ))}
    </Select>
  )
}

export default CustomDropDown
