import { default as MuiDialog, DialogProps } from '@mui/material/Dialog'
import useMediaQuery from '@mui/material/useMediaQuery'

import { Box, Button, DialogContent, DialogTitle, Divider } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

type Props = {
  open: boolean
  handleClose: () => void
  handleContinue: () => void
  title: string
} & DialogProps

const Dialog = ({
  open,
  handleClose,
  handleContinue,
  title,
  ...dialogProps
}: Props) => {
  const isMobileScreen = useMediaQuery('(max-width:768px)')
  const closeIcon = (
    <CloseIcon
      sx={{
        position: 'absolute',
        right: '16px',
        top: '20px',
        width: '24px',
        height: '24px',
        color: '#868686',
        cursor: 'pointer',
      }}
      onClick={handleClose}
    />
  )

  return (
    <MuiDialog
      open={open}
      onClose={(_event, reason) => {
        if (reason !== 'backdropClick') {
          handleClose()
        }
      }}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      maxWidth={'lg'}
      PaperProps={{
        style: {
          border: '2px solid #C8C8C8',
          padding: 0,
          minWidth: isMobileScreen ? 'auto' : '600px',
        },
      }}
      {...dialogProps}
    >
      <DialogTitle
        id='dialog-title'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          gap: '10px',
          fontSize: '20px',
          fontWeight: 500,
          padding: '20px 48px 20px 12px',
        }}
      >
        {title}
        {closeIcon}
      </DialogTitle>

      <Divider
        sx={{
          height: '1px',
          bgcolor: '#C8C8C8',
          width: { xs: '90%', md: '80%' },
        }}
      />
      <DialogContent sx={{ postion: 'relative', padding: 0 }}>
        <Box>
          <Box
            sx={{
              margin: 'auto',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginTop: '12px',
              gap: '20px',
              padding: '16px 24px',
            }}
          >
            <Button
              variant='contained'
              sx={{
                background: '#6C757D',
                color: 'white',
                ':hover': {
                  background: '#dc2626',
                },
                padding: { xs: '8px 20px', md: '10px 20px' },
                borderRadius: '6px',
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              sx={{
                background: '#0085FC',
                padding: { xs: '8px 20px', md: '10px 20px' },
                borderRadius: '6px',
              }}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </MuiDialog>
  )
}

export default Dialog
