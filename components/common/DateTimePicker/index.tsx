import React, { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import Button from '@mui/material/Button'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {
  DateTimePicker,
  DateTimePickerProps,
} from '@mui/x-date-pickers/DateTimePicker'
import { UseDateFieldProps } from '@mui/x-date-pickers/DateField'
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from '@mui/x-date-pickers/models'

interface ButtonFieldProps
  extends UseDateFieldProps<Dayjs>,
    BaseSingleInputFieldProps<
      Dayjs | null,
      Dayjs,
      FieldSection,
      DateValidationError
    > {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

function ButtonField(props: ButtonFieldProps) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { 'aria-label': ariaLabel } = {},
  } = props

  return (
    <Button
      variant='outlined'
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
      sx={{
        color: 'white',
        outline: 'none',
        border: 'none',
        padding: `0px 0px 0px 0px`,
        height: 'auto',
        fontSize: '16px',
        ':hover': {
          outline: 'none',
          border: 'none',
        },
      }}
    >
      {label ? `${label}` : 'Pick a date'}
    </Button>
  )
}

function ButtonDatePicker(
  props: Omit<DateTimePickerProps<Dayjs>, 'open' | 'onOpen' | 'onClose'>
) {
  const [open, setOpen] = React.useState(false)

  return (
    <DateTimePicker
      slots={{ field: ButtonField, ...props.slots }}
      slotProps={{
        field: { setOpen } as any,
        popper: {
          placement: 'left',
        },
      }}
      ampm={false}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  )
}

export default function PickerWithButtonField({
  date,
  handleChange,
}: {
  date: string
  handleChange: (value: Dayjs) => void
}) {
  const [value, setValue] = useState<Dayjs | null>(null)

  useEffect(() => {
    if (date) {
      const dayjsValue = dayjs(date)
      setValue(dayjsValue)
    }
  }, [date])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ButtonDatePicker
        label={
          value == null
            ? null
            : `${value.format('YYYY-MM-DD')} at ${value.format('h:mm')}`
        }
        value={value}
        onChange={(newValue) => handleChange(newValue)}
      />
    </LocalizationProvider>
  )
}
