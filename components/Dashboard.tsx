import React, { useEffect, useState } from 'react'

import { Box, Button, CircularProgress, Typography } from '@mui/material'

import TableOne from './TableOne'
import TableTwo from './TableTwo'

import { TemplateCardInterface } from '../interfaces'
import TemplateCard from './common/TemplateCard'
import PreviewCard from './common/PreviewCard'

import Dialog from './common/Dialog'
import PopupModal from './common/Modal'

import store, { RootState } from '../redux/store'
import {
  fetchSignals,
  setSignals,
  setUpdatedSignals,
} from '../redux/slice/signalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Navbar from './common/Navbar'

const Dashboard = () => {
  const defaultWidth = 480
  const scale = 0.7

  const dispatch = useDispatch()
  const { alertSide, updatedSignals, signals } = useSelector(
    (state: RootState) => state?.signals
  )

  const [visible, setvisible] = useState<boolean>(true)
  const [lastScrollY, setLastScrollY] = useState<number>(0)
  const [positionCard, setPositionCard] = useState<string>('')

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY == 0) {
        setvisible(true)
        setPositionCard('70px')
      } else if (window.scrollY > lastScrollY) {
        setvisible(false)
        setPositionCard('0px')
      } else {
        setvisible(true)
        setPositionCard('70px')
      }
      setLastScrollY(window.scrollY)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar)
      }
    }
  }, [lastScrollY])

  const [activeSignal, setActiveSignal] =
    useState<TemplateCardInterface | null>(null)
  const [previewTemplate, setPreviewTemplate] =
    useState<TemplateCardInterface | null>(null)
  const [warningDialogOpen, setWarningDialogOpen] = useState<boolean>(false)

  const [signalToBeSetActive, setsignalToBeSetActive] =
    useState<TemplateCardInterface | null>(null)

  const [selectedPage, setSelectedPage] = useState<number>(1)
  const [sortOrders, setSortOrders] = useState({
    id: 0,
    openTime: 1,
  })

  useEffect(() => {
    const fetchData = () => {
      try {
        const sortingParams = `page=${selectedPage}&size=50&order_by=${
          sortOrders.id == 1 ? 'asc' : 'desc'
        }(id)&order_by=${
          sortOrders.openTime == 1 ? 'asc' : 'desc'
        }(open_timestamp)`
        store.dispatch(fetchSignals(sortingParams))
      } catch (error) {
        console.log(error)
      }
    }

    if (sortOrders && selectedPage) fetchData()
  }, [sortOrders, selectedPage])

  const handlePreview = () => {
    setPreviewTemplate(activeSignal)
  }

  const handleCancel = () => {
    setPreviewTemplate(null)
  }

  const handleContinueChange = () => {
    const allSignals = signals
    const signalToUpdate = updatedSignals

    if (allSignals && signalToUpdate && signalToUpdate.length > 0) {
      let updatedItems = allSignals.items.map((signal) =>
        signal.id === signalToUpdate[0].id
          ? { ...signal, ...signalToUpdate[0] }
          : signal
      )
      const updatedSignals = {
        ...allSignals,
        items: updatedItems,
      }
      // Dispatch the setUpdatedSignals action with the updated signals
      dispatch(setSignals(updatedSignals))
      dispatch(setUpdatedSignals([]))
      setWarningDialogOpen(false)
      toast('Card Data Updated', { type: 'success', autoClose: 800 })
      setActiveSignal(signalToBeSetActive)
    }
  }

  return (
    <Box sx={{}}>
      <Navbar alertSide={alertSide} visible={visible} />
      <Box sx={{ padding: { xs: '8px', md: '10px 20px' } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: ' 1fr',
              md: `calc(${defaultWidth}px * ${scale}) 1fr`,
            },
            gap: {
              xs: '2px',
              md: '30px',
            },
            padding: { xs: '0px', md: '0px 10px' },
          }}
        >
          <Box
            sx={{
              width: {
                xs: '100%',
                md: `calc(${defaultWidth}px * ${scale})`,
              },
            }}
          >
            <Box
              sx={{
                position: 'sticky',
                top: '0px',
                transform:
                  positionCard == '70px'
                    ? 'translateY(70px)'
                    : 'translateY(0px)',
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              {activeSignal?.data ? (
                <TemplateCard
                  data={activeSignal.data}
                  handlePreview={handlePreview}
                  updatedSignals={updatedSignals}
                  width={300}
                  scale={scale}
                  alertSide={alertSide}
                />
              ) : (
                <Box
                  sx={{
                    paddingY: '200px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
            </Box>
          </Box>
          <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography sx={{ paddingX: { xs: '2px', md: '30px' } }}>
              <strong>Table-1 </strong> User's Signal
            </Typography>

            <TableOne
              setActiveSignal={setActiveSignal}
              alertSide={alertSide}
              activeSignal={activeSignal}
              setWarningDialogOpen={setWarningDialogOpen}
              setsignalToBeSetActive={setsignalToBeSetActive}
            />
            <Typography sx={{ paddingX: { xs: '2px', md: '30px' } }}>
              <strong>Table-2 </strong> Existing Signals
            </Typography>

            <TableTwo
              setActiveSignal={setActiveSignal}
              alertSide={alertSide}
              activeSignal={activeSignal}
              setWarningDialogOpen={setWarningDialogOpen}
              setsignalToBeSetActive={setsignalToBeSetActive}
            />
          </Box>
        </Box>

        {previewTemplate && (
          <PopupModal
            open={previewTemplate != null ? true : false}
            handleClose={() => setPreviewTemplate(null)}
            previewModal={true}
          >
            <PreviewCard
              data={previewTemplate.data}
              width={300}
              scale={0.65}
              handleCancel={handleCancel}
            />
          </PopupModal>
        )}
        {warningDialogOpen && (
          <Dialog
            title='Current Values on the card will be overwritten. Proceed?'
            open={warningDialogOpen}
            handleClose={() => setWarningDialogOpen(false)}
            handleContinue={handleContinueChange}
          ></Dialog>
        )}
      </Box>
    </Box>
  )
}

export default Dashboard
