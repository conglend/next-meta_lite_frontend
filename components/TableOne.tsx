import React, { useEffect, useState } from 'react'
import { RootState } from '../redux/store'
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Item, TableComponentProps } from '../interfaces'
import { getCardData } from '../utils/helpers'
import { useSelector } from 'react-redux'

const TableOne = ({
  setActiveSignal,
  alertSide,
  activeSignal,
  setWarningDialogOpen,
  setsignalToBeSetActive,
}: TableComponentProps) => {
  const [sortOrders, setSortOrders] = useState({
    id: 0,
    openTime: 1,
  })
  const [changedSorting, setChangedSorting] = useState<string>('')

  const signalData = useSelector((state: RootState) => state?.signals)

  useEffect(() => {
    if (alertSide && signalData?.signals?.items?.[0] && !activeSignal) {
      const activeData = getCardData(signalData.signals.items[0], alertSide)
      setActiveSignal(activeData)
    }
  }, [alertSide, signalData.signals])

  const handleSort = (key: string) => {
    setChangedSorting(key)
    setSortOrders((prevSortOrders) => ({
      ...prevSortOrders,
      [key]: prevSortOrders[key] === 0 ? 1 : 0,
    }))
  }

  function formatDate(timestamp: any) {
    const date = new Date(timestamp)
    const formattedDate = date.toLocaleDateString()
    const formattedTime = date.toLocaleTimeString()
    return (
      <div>
        <div>{formattedDate}</div>
        <div>{formattedTime}</div>
      </div>
    )
  }

  const handleRowClick = (signal: Item) => {
    if (signalData?.updatedSignals.length > 0) {
      const nextActiveSignal = getCardData(signal, alertSide)
      setWarningDialogOpen(true)
      setsignalToBeSetActive(nextActiveSignal)
    } else {
      const activeData = getCardData(signal, alertSide)
      setActiveSignal(activeData)
    }
  }

  return (
    <div>
      <div className='user-info-wrp'>
        <Box>
          {signalData ? (
            <>
              {signalData?.signals && (
                <div className='user-info-data mt-4'>
                  {signalData?.signals?.items?.length === 0 ? (
                    <>Table is empty!</>
                  ) : (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{ fontSize: '16px', fontWeight: '700' }}
                            >
                              ID
                              <button
                                onClick={() => handleSort('id')}
                                style={{ position: 'relative' }}
                                disabled={signalData.status == 'loading'}
                              >
                                {sortOrders?.id === 0 ? (
                                  <KeyboardArrowDownIcon />
                                ) : (
                                  <KeyboardArrowUpIcon />
                                )}
                                {signalData.status == 'loading' &&
                                  changedSorting == 'id' && (
                                    <CircularProgress
                                      sx={{
                                        position: 'absolute',
                                        top: '2px',
                                        left: '2px',
                                        zIndex: 1,
                                      }}
                                      color={'error'}
                                      size={28}
                                    />
                                  )}
                              </button>
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: '16px', fontWeight: '700' }}
                            >
                              Strategy Name
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: '16px', fontWeight: '700' }}
                            >
                              Rule ID
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: '16px', fontWeight: '700' }}
                            >
                              Candle Type Id
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: '16px', fontWeight: '700' }}
                            >
                              Pair
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: '16px', fontWeight: '700' }}
                            >
                              Created Time
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: '16px', fontWeight: '700' }}
                            >
                              Open Time
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: '16px', fontWeight: '700' }}
                            >
                              Close Time
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: '16px', fontWeight: '700' }}
                            >
                              Entry Price
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: '16px', fontWeight: '700' }}
                            >
                              Stoploss
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: '16px', fontWeight: '700' }}
                            >
                              tp1
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: '16px', fontWeight: '700' }}
                            >
                              tp2
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: '16px', fontWeight: '700' }}
                            >
                              tp3
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: '16px', fontWeight: '700' }}
                            >
                              rr1
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: '16px', fontWeight: '700' }}
                            >
                              rr2
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: '16px', fontWeight: '700' }}
                            >
                              rr3
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: '16px', fontWeight: '700' }}
                            >
                              Duplicate
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: '16px', fontWeight: '700' }}
                            >
                              Status
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {signalData?.signals?.items?.map((item, index) => (
                            <TableRow
                              key={index}
                              onClick={() => handleRowClick(item)}
                              sx={{
                                cursor: 'pointer',
                                bgcolor:
                                  activeSignal?.data?.id == item.id &&
                                  '#bec1c4',
                              }}
                            >
                              <TableCell>{item.id || '-'}</TableCell>
                              <TableCell
                                onDoubleClick={() => console.log('double')}
                              >
                                <Typography onDoubleClick={() => 'double'}>
                                  {item.strategy_name || '-'}x
                                </Typography>
                              </TableCell>
                              <TableCell>{item.rule_id || '-'}</TableCell>
                              <TableCell>
                                {item.candle_type_id || '-'}
                              </TableCell>
                              <TableCell>{item.pair || '-'}</TableCell>
                              <TableCell>
                                <div className='event-wrap'>
                                  {item.created_timestamp
                                    ? formatDate(item.created_timestamp)
                                    : '-'}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className='event-wrap'>
                                  {item.open_timestamp
                                    ? formatDate(item.open_timestamp)
                                    : '-'}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className='event-wrap'>
                                  {item.close_timestamp
                                    ? formatDate(item.close_timestamp)
                                    : '-'}
                                </div>
                              </TableCell>
                              <TableCell>{item.entry_price || '-'}</TableCell>
                              <TableCell>{item.stoploss || '-'}</TableCell>
                              <TableCell>{item.tp1 || '-'}</TableCell>
                              <TableCell>{item.tp2 || '-'}</TableCell>
                              <TableCell>{item.tp3 || '-'}</TableCell>
                              <TableCell>{item.rr1 || '-'}</TableCell>
                              <TableCell>{item.rr2 || '-'}</TableCell>
                              <TableCell>{item.rr3 || '-'}</TableCell>
                              <TableCell>
                                {item.is_duplicate != null
                                  ? `${item.is_duplicate}`
                                  : '-'}
                              </TableCell>
                              <TableCell>
                                <div className='event-wrap'>
                                  <strong>19:</strong>status
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                  <br />
                </div>
              )}
            </>
          ) : (
            <p>404!</p>
          )}
        </Box>
      </div>
    </div>
  )
}

export default TableOne
