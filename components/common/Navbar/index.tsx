import React, { useEffect, useState } from 'react'
import { Box, MenuItem, Select, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { useDispatch } from 'react-redux'
import { setAlertSide } from '../../../redux/slice/signalSlice'
import Dialog from '../Dialog'
import { toast } from 'react-toastify'

type Props = {
  alertSide: string
  visible: boolean
}

const Navbar = ({ alertSide, visible }: Props) => {
  const dispatch = useDispatch()

  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false)
  const [valueToChange, setValueToChange] = useState<string>('')

  const handleChangeAlertSide = (value: string) => {
    setOpenAlertDialog(true)
    setValueToChange(value)
  }

  const renderValue = (selected: string) => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {selected === 'LONG' ? (
        <PersonIcon
          fontSize='small'
          sx={{
            color: '#253858',
          }}
        />
      ) : (
        <PersonIcon
          fontSize='small'
          sx={{
            color: '#253858',
          }}
        />
      )}
      <Typography
        sx={{
          fontSize: { xs: '13px', md: '16px' },
          paddingLeft: '6px',
          paddingTop: '2px',
          color: '#253858',
        }}
      >
        {selected}
      </Typography>
    </Box>
  )

  const handleContinue = () => {
    dispatch(setAlertSide(valueToChange))
    setOpenAlertDialog(false)
    toast('Alert Side Changed', { type: 'success', autoClose: 800 })
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingX: {
            xs: '8px',
            md: '40px',
          },
          gap: '8px',
          paddingY: '10px',
          position: 'sticky',
          top: '0px',
          zIndex: 999,
          bgcolor: '#363538',
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <Box
          sx={{
            width: { xs: '110px', md: '132px' },
            height: { xs: '42px', md: '50px' },
          }}
        >
          <img
            src='/logo.png'
            alt=''
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: '2px', md: '10px' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: '2px', md: '10px' },
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                color: 'white',
                fontSize: { xs: '13px', md: '16px' },
              }}
            >
              Choose Side
            </Typography>
            <Select
              value={alertSide}
              renderValue={() => renderValue(alertSide)}
              sx={{
                width: { xs: '100px', md: '200px' },
                height: { xs: '36px', md: '48px' },

                '& .MuiOutlinedInput-input ': {
                  padding: { xs: '8px 8px 8px 8px', md: '8px 18px 8px 18px' },
                  color: '#253858 !important',
                },
                '& .MuiSelect-icon': {
                  color: '#253858',
                },
                bgcolor: 'white',
                color: '#253858',
              }}
              inputProps={{
                color: '#253858',
              }}
              onChange={(e) => {
                handleChangeAlertSide(e.target.value)
              }}
            >
              <MenuItem value={'LONG'}> LONG</MenuItem>
              <MenuItem value={'SHORT'}>SHORT</MenuItem>
            </Select>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Box
              sx={{
                bgcolor: 'white',
                borderRadius: 99999,
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PersonIcon
                fontSize='small'
                sx={{
                  color: '#253858',
                }}
              />
            </Box>
            <Typography
              sx={{
                fontWeight: 600,
                color: 'white',
                fontSize: { xs: '14px', md: '16px' },
              }}
            >
              User Name{' '}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={openAlertDialog}
        title={'Are You Sure?'}
        handleClose={() => setOpenAlertDialog(false)}
        handleContinue={handleContinue}
      />
    </>
  )
}

export default Navbar
