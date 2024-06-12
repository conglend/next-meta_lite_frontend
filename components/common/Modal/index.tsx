import { memo } from 'react'
import Modal from '@mui/material/Modal'
import { Box, useMediaQuery } from '@mui/material'
import { motion } from 'framer-motion'

type Props = {
  open: boolean
  handleClose: () => void
  children?: React.ReactNode
  previewModal?: boolean
}

const PopupModal = ({ open, handleClose, children, previewModal }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      e.target instanceof Element &&
      (e.target.classList.contains('outside') ||
        e.target.classList.contains('rootoutside'))
    ) {
      handleClose()
    }
  }

  const isMobileScreen = useMediaQuery('(max-width:768px)')
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{
        height: '100vh',
        width: '100vw',
        bgcolor: 'rgba(25, 25, 25, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: previewModal ? 'hidden' : 'hidden',
      }}
      onClick={handleClick}
      className='rootoutside'
    >
      <Box
        sx={{
          width: '100%',
          height: '98vh',
          bgcolor: 'transparent',
          border: 'none !important',
          outline: 'none !important',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflowY: previewModal ? 'scroll' : 'auto',
        }}
        className='outside'
        onClick={handleClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{
            border: 'none !important',
            outline: 'none !important',
            width: isMobileScreen ? '100%' : '480px',
            margin: 'auto',
            backgroundColor: previewModal ? 'white' : '',
            zIndex: 9999,
          }}
        >
          {children}
        </motion.div>
      </Box>
    </Modal>
  )
}

export default memo(PopupModal)
