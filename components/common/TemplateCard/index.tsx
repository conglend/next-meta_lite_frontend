import {
  Box,
  Button,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CurrencyIcon } from '../currency-icon-scalable'
import CustomTextField from '../TextField'
import PickerWithButtonField from '../DateTimePicker'
import CustomDropDown from '../DropDown'
import { TemplateCardInterface, Item } from '../../../interfaces'

import { useDispatch } from 'react-redux'
import { setUpdatedSignals } from '../../../redux/slice/signalSlice'
import { Dayjs } from 'dayjs'
import { toast } from 'react-toastify'
import Dialog from '../Dialog'

type ExtendedProps = TemplateCardInterface & {
  alertSide: string
  updatedSignals: Item[]
}

const TemplateCard = (props: ExtendedProps) => {
  const defaultWidth = 480
  const scale = props?.scale || (props?.width as number) / defaultWidth || 1
  const [resetDefaultData, setResetDefaultData] = useState<
    TemplateCardInterface['data']
  >(props.data)

  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false)

  const [data, setData] = useState<TemplateCardInterface['data'] | null>(null)
  const [dataUpdated, setDataUpdated] = useState<boolean>(false)

  const secondary = props?.alertSide == 'LONG' ? '#00ff84' : '#F29b9b'
  const background = props?.alertSide == 'LONG' ? '#008c44' : '#f05253'
  const mainFontSize = `calc(22px * ${scale})`
  const rowHeight = `calc(30px * ${scale})`
  const borderRadius = `calc(30px * ${scale})`

  const dispatch = useDispatch()

  useEffect(() => {
    if (props.data) {
      const updatedData = { ...props.data }

      for (const key in updatedData) {
        if (
          Object.prototype.hasOwnProperty.call(updatedData, key) &&
          updatedData[key] == null
        ) {
          updatedData[key] = ''
        }
      }

      setData(updatedData)
      setResetDefaultData(updatedData)
    }
  }, [props.data, props.alertSide])

  // Function to toggle the editable state of a field
  const handleFieldChange = (
    field: string,
    newValue: string | number,
    regexCheck?: true
  ) => {
    // Type check and convert number to string
    const inputString =
      typeof newValue === 'number' ? newValue.toString() : newValue

    // regex to check the decimal and input values
    const regex = /^(?!.*\..*\.)\d+(\.\d*)?$/

    if (regexCheck) {
      const isValidInput =
        inputString === '' || inputString === '-' || regex.test(inputString)

      if (!isValidInput) return
    }
    setData((prevData) => ({
      ...prevData,
      [field]: inputString,
    }))

    if (field === 'asset_1' || field === 'asset_2') {
      setData((prevData) => ({
        ...prevData,
        ['pair']: `${prevData.asset_1}/${prevData.asset_2}`,
      }))
    }
    console.log(field)
    setDataUpdated(true)
  }

  const updateDataOnStoreOnBlur = () => {
    if (dataUpdated) {
      dispatch(setUpdatedSignals([data]))
    }
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [selected, setSelected] = React.useState<any | null>(null)

  const handleClick = (
    value: string,
    event?: React.MouseEvent<HTMLElement>
  ) => {
    if (event) {
      setAnchorEl(event.currentTarget)
      setSelected(value)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSelected(null)
  }

  const handleMenuSelect = (value: string) => {
    if (anchorEl) {
      handleFieldChange(selected, value)
    }
    // Close the menu
    handleClose()
  }

  const assetsOptions = [
    {
      value: 'USDT',
      text: 'USDT',
    },
    {
      value: 'ETH',
      text: 'ETH',
    },
    {
      value: 'ETC',
      text: 'ETC',
    },
    {
      value: 'BTC',
      text: 'BTC',
    },
  ]

  const timeframeOptions: Array<{ text: string; value: string }> = Array.from(
    Array(24),
    (_, i) => ({
      text: `${i + 1}h`,
      value: `${i + 1}h`,
    })
  )

  const handleReset = () => {
    if (props.updatedSignals.length < 1) return
    setOpenAlertDialog(true)
    setDataUpdated(false)
  }

  const handleContinue = () => {
    setData(resetDefaultData)
    dispatch(setUpdatedSignals([]))
    setDataUpdated(false)
    setOpenAlertDialog(false)
    toast('Values Reset Successfully', { type: 'success', autoClose: 800 })
  }

  return (
    <>
      <Box sx={{ height: '100%' }}>
        <Box
          sx={{
            margin: 'auto',
            background: props?.alertSide == 'LONG' ? '#094047' : '#4C3348',
            width: {
              xs: '100%',
              md: `calc(${defaultWidth}px * ${scale})`,
            },
            maxWidth: { xs: '310px', md: 'auto' },
            height: `auto`,
            borderRadius: borderRadius,
            padding: {
              xs: `calc(20px * ${scale})`,
              // md: borderRadius,
            },
            color: 'white',
          }}
        >
          {data ? (
            <Box
              sx={{
                background: background,
                width: '100%',
                height: '100%',
                borderRadius: borderRadius,
                textTransform: 'uppercase',
              }}
            >
              <Typography
                sx={{
                  fontSize: mainFontSize,
                  letterSpacing: `calc(-1.2px * ${scale})`,
                  width: '100%',
                  textAlign: 'center',
                  paddingTop: mainFontSize,
                  color: secondary,
                }}
              >
                metasignals.io/lite
              </Typography>
              <Typography
                sx={{
                  fontSize: `calc(36px * ${scale})`,
                  margin: 'auto',
                  letterSpacing: `calc(-1.2px * ${scale})`,
                  width: '85%',
                  textAlign: 'center',
                }}
              >
                POTENTIAL {props.alertSide}
              </Typography>
              <Grid
                item
                xs={12}
                sx={{
                  paddingRight: `calc(24px * ${scale})`,
                  paddingLeft: `calc(20px * ${scale})`,
                  my: '4px',
                }}
              >
                <Divider
                  sx={{
                    borderColor: 'transparent',
                    borderTop: `solid 1px ${secondary}`,
                  }}
                ></Divider>
              </Grid>
              <Grid
                container
                sx={{
                  width: '34%',
                  marginX: 'auto',
                  background: 'white',
                  height: `calc(60px * ${scale})`,
                  borderRadius: `calc(10px * ${scale})`,
                  marginTop: `calc(16px * ${scale})`,
                }}
              >
                <Grid
                  item
                  xs={5.9}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    width: '100%',
                    height: '100%',
                  }}
                  onClick={(e) => handleClick('asset_1', e)}
                >
                  {data?.asset_1 && <CurrencyIcon icon={data?.asset_1} />}
                </Grid>
                <Grid
                  item
                  xs={0.2}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Box
                    sx={{
                      width: '2px',
                      height: '50%',
                      backgroundColor: background,
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={5.9}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <CurrencyIcon icon={'USDT'} />
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  width: '34%',
                  marginX: 'auto',
                  height: `calc(60px * ${scale})`,
                  alignItems: 'center',
                  paddingX: `calc(5px * ${scale})`,
                }}
              >
                <Grid item xs={5.9}>
                  <Typography
                    sx={{
                      fontSize: mainFontSize,
                      textAlign: 'center',
                      margin: 'auto',
                      direction: 'rtl',
                      paddingRight: '4px',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => handleClick('asset_1', e)}
                  >
                    {data?.asset_1}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={0.2}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Box
                    sx={{
                      width: '2px',
                      height: '50%',
                      backgroundColor: 'white',
                    }}
                  />
                </Grid>
                <Grid item xs={5.9}>
                  <Typography
                    sx={{
                      fontSize: mainFontSize,
                      textAlign: 'center',
                      margin: 'auto',
                      direction: 'rtl',
                      paddingLeft: '4px',
                      // cursor: 'pointer',
                    }}
                  >
                    USDT
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  paddingRight: `calc(24px * ${scale})`,
                  paddingLeft: `calc(20px * ${scale})`,
                  my: '4px',
                }}
              >
                <Divider
                  sx={{
                    borderColor: 'transparent',
                    borderTop: `solid 1px ${secondary}`,
                  }}
                ></Divider>
              </Grid>
              <Grid container>
                <Grid item xs={6} sx={{ textAlign: 'left', height: rowHeight }}>
                  <Typography
                    sx={{
                      paddingLeft: `calc(20px * ${scale})`,
                      fontSize: mainFontSize,
                    }}
                  >
                    Alert type:
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={6}
                  sx={{
                    textAlign: 'right',
                    height: rowHeight,
                    paddingRight: `calc(20px * ${scale})`,
                  }}
                >
                  <CustomDropDown
                    value={data?.alert_type ?? ''}
                    options={[
                      {
                        value: 'META LITE',
                        text: 'META LITE',
                      },
                      {
                        value: 'Moving',
                        text: 'Moving',
                      },
                    ]}
                    name={'alert_type'}
                    scale={scale}
                    mainFontSize={mainFontSize}
                    handleChange={(newValue) =>
                      handleFieldChange('alert_type', newValue)
                    }
                  />
                </Grid>

                <Grid item xs={6} sx={{ textAlign: 'left', height: rowHeight }}>
                  <Typography
                    sx={{
                      paddingLeft: `calc(20px * ${scale})`,
                      fontSize: mainFontSize,
                    }}
                  >
                    Exchange:
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={6}
                  sx={{
                    textAlign: 'right',
                    height: rowHeight,
                    paddingRight: `calc(20px * ${scale})`,
                  }}
                >
                  <CustomDropDown
                    value={data?.exchange ?? ''}
                    options={[
                      {
                        value: 'Binance',
                        text: 'Binance',
                      },
                    ]}
                    name={'exchange'}
                    scale={scale}
                    mainFontSize={mainFontSize}
                    handleChange={(newValue) =>
                      handleFieldChange('exchange', newValue)
                    }
                  />
                </Grid>

                <Grid item xs={6} sx={{ textAlign: 'left', height: rowHeight }}>
                  <Typography
                    sx={{
                      paddingLeft: `calc(20px * ${scale})`,
                      fontSize: mainFontSize,
                    }}
                  >
                    Pair:
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={6}
                  sx={{ textAlign: 'right', height: rowHeight }}
                >
                  <Typography
                    sx={{
                      paddingRight: `calc(24px * ${scale})`,
                      fontSize: mainFontSize,
                    }}
                  >
                    {data?.pair}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    height: rowHeight,
                    paddingRight: `calc(24px * ${scale})`,
                    paddingLeft: `calc(20px * ${scale})`,
                  }}
                >
                  <Divider
                    sx={{
                      borderColor: 'transparent',
                      marginTop: `calc(17px * ${scale})`,
                      borderTop: `solid 1px ${secondary}`,
                      marginBottom: `calc(17px * ${scale})`,
                    }}
                  ></Divider>
                </Grid>

                <Grid item xs={6} sx={{ textAlign: 'left', height: rowHeight }}>
                  <Typography
                    sx={{
                      paddingLeft: `calc(20px * ${scale})`,
                      fontSize: mainFontSize,
                    }}
                  >
                    Time frame:
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={6}
                  sx={{
                    textAlign: 'right',
                    height: rowHeight,
                    paddingRight: `calc(24px * ${scale})`,
                    fontSize: mainFontSize,
                  }}
                >
                  <CustomDropDown
                    value={data?.timeframe}
                    options={timeframeOptions}
                    name={'timeframe'}
                    scale={scale}
                    mainFontSize={mainFontSize}
                    handleChange={(newValue) =>
                      handleFieldChange('timeframe', newValue)
                    }
                  />
                </Grid>

                <Grid item xs={6} sx={{ textAlign: 'left', height: rowHeight }}>
                  <Typography
                    sx={{
                      paddingLeft: `calc(20px * ${scale})`,
                      fontSize: mainFontSize,
                    }}
                  >
                    Price:
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={6}
                  sx={{ textAlign: 'right', height: rowHeight }}
                >
                  <CustomTextField
                    scale={scale}
                    mainFontSize={mainFontSize}
                    name='entry_price'
                    toggleChange={(newValue) =>
                      handleFieldChange('entry_price', newValue, true)
                    }
                    onBlur={updateDataOnStoreOnBlur}
                    value={data?.entry_price ?? ''}
                    sxStyle={{ paddingRight: `calc(20px * ${scale})` }}
                  />
                </Grid>
                <Grid item xs={5} sx={{ textAlign: 'left' }}>
                  <Typography
                    sx={{
                      paddingLeft: `calc(20px * ${scale})`,
                      fontSize: mainFontSize,
                      height: rowHeight,
                    }}
                  >
                    {'date & time:'}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={7}
                  sx={{
                    textAlign: 'right',
                    paddingRight: `calc(24px * ${scale})`,
                  }}
                >
                  <PickerWithButtonField
                    date={data?.datetime}
                    handleChange={(value: Dayjs) => {
                      const isoString = value.toISOString()
                      handleFieldChange('datetime', isoString)
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    height: rowHeight,
                    paddingRight: `calc(24px * ${scale})`,
                    paddingLeft: `calc(20px * ${scale})`,
                  }}
                >
                  <Divider
                    sx={{
                      borderColor: 'transparent',
                      margin: 'auto',
                      marginTop: `calc(17px * ${scale})`,
                      borderTop: `solid 1px ${secondary}`,
                      marginBottom: `calc(17px * ${scale})`,
                    }}
                  ></Divider>
                </Grid>

                <Grid item xs={5} sx={{ textAlign: 'left', height: rowHeight }}>
                  <Typography
                    sx={{
                      paddingLeft: `calc(20px * ${scale})`,
                      fontSize: mainFontSize,
                    }}
                  >
                    Entry Zone:
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={7}
                  sx={{
                    textAlign: 'right',
                    height: rowHeight,
                    textTransform: 'capitalize',
                    paddingRight: `calc(20px * ${scale})`,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <CustomTextField
                    scale={scale}
                    mainFontSize={mainFontSize}
                    name='entryzone'
                    toggleChange={(newValue) =>
                      handleFieldChange('entryzone', newValue, true)
                    }
                    onBlur={updateDataOnStoreOnBlur}
                    value={
                      data?.entryzone == null ? '' : data?.entryzone.toString()
                    }
                    sxStyle={{ textAlign: 'center', width: 'auto' }}
                  />
                  {/* <Typography
                    component={'span'}
                    sx={{ textTransform: 'lowercase' }}
                  >
                    to
                  </Typography>
                  <CustomTextField
                    scale={scale}
                    mainFontSize={mainFontSize}
                    name='entryzone2'
                    toggleChange={(newValue) =>
                      handleFieldChange('entryzone2', newValue, true)
                    }
                    onBlur={updateDataOnStoreOnBlur}
                    value={
                      data?.entryzone == null ? '' : data?.entryzone.toString()
                    }
                    sxStyle={{
                      // bgcolor:'blue'
                      textAlign: 'center',
                      width: 'auto',
                    }}
                  /> */}
                </Grid>
                <Grid item xs={5} sx={{ textAlign: 'left', height: rowHeight }}>
                  <Typography
                    sx={{
                      paddingLeft: `calc(20px * ${scale})`,
                      fontSize: mainFontSize,
                    }}
                  >
                    Stop loss:
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={7}
                  sx={{ textAlign: 'right', height: rowHeight }}
                >
                  <CustomTextField
                    scale={scale}
                    mainFontSize={mainFontSize}
                    name='stoploss'
                    toggleChange={(newValue) =>
                      handleFieldChange('stoploss', newValue, true)
                    }
                    onBlur={updateDataOnStoreOnBlur}
                    value={
                      data?.stoploss == null ? '' : data?.stoploss.toString()
                    }
                    sxStyle={{ paddingRight: `calc(20px * ${scale})` }}
                  />
                </Grid>
                <Grid item xs={5} sx={{ textAlign: 'left' }}>
                  <Typography
                    sx={{
                      paddingLeft: `calc(20px * ${scale})`,
                      fontSize: mainFontSize,
                      height: rowHeight,
                    }}
                  >
                    {'Target 1:'}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={7}
                  sx={{
                    display: 'flex',
                    paddingRight: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                    height: rowHeight,
                    justifyContent: 'space-around',
                  }}
                >
                  <CustomTextField
                    scale={scale}
                    mainFontSize={mainFontSize}
                    name='tp1'
                    toggleChange={(newValue) =>
                      handleFieldChange('tp1', newValue, true)
                    }
                    onBlur={updateDataOnStoreOnBlur}
                    value={data?.tp1 ? data.tp1.toString() : ''}
                    sxStyle={{ width: '36%' }}
                  />
                  <Typography sx={{ textAlign: 'end', width: '28%' }}>
                    RR:
                  </Typography>
                  <CustomTextField
                    scale={scale}
                    mainFontSize={mainFontSize}
                    name='rr1'
                    toggleChange={(newValue) =>
                      handleFieldChange('rr1', newValue, true)
                    }
                    onBlur={updateDataOnStoreOnBlur}
                    value={
                      // data?.rr1
                      //   ? data.rr1.toString()
                      //   : data?.entryzone && data?.entryzone != ''
                      //   ? data.entryzone.split('to')?.[0]
                      //   : ''
                      data?.rr1 ? data.rr1.toString() : ''
                    }
                    sxStyle={{ width: '36%' }}
                  />
                </Grid>
                <Grid item xs={5} sx={{ textAlign: 'left' }}>
                  <Typography
                    sx={{
                      paddingLeft: `calc(20px * ${scale})`,
                      fontSize: mainFontSize,
                      height: rowHeight,
                    }}
                  >
                    {'Target 2:'}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={7}
                  sx={{
                    display: 'flex',
                    paddingRight: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                    height: rowHeight,
                    justifyContent: 'space-around',
                  }}
                >
                  <CustomTextField
                    scale={scale}
                    mainFontSize={mainFontSize}
                    name='tp2'
                    toggleChange={(newValue) =>
                      handleFieldChange('tp2', newValue, true)
                    }
                    onBlur={updateDataOnStoreOnBlur}
                    value={data?.tp2 ? data.tp2.toString() : ''}
                    sxStyle={{ width: '36%' }}
                  />
                  <Typography sx={{ textAlign: 'end', width: '28%' }}>
                    RR:
                  </Typography>
                  <CustomTextField
                    scale={scale}
                    mainFontSize={mainFontSize}
                    name='rr2'
                    toggleChange={(newValue) =>
                      handleFieldChange('rr2', newValue, true)
                    }
                    onBlur={updateDataOnStoreOnBlur}
                    value={data?.rr2 ? data.rr2.toString() : ''}
                    sxStyle={{ width: '36%' }}
                  />
                </Grid>
                <Grid item xs={5} sx={{ textAlign: 'left' }}>
                  <Typography
                    sx={{
                      paddingLeft: `calc(20px * ${scale})`,
                      fontSize: mainFontSize,
                      height: rowHeight,
                    }}
                  >
                    {'Target 3:'}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={7}
                  sx={{
                    display: 'flex',
                    paddingRight: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                    height: rowHeight,
                    justifyContent: 'space-around',
                  }}
                >
                  <CustomTextField
                    scale={scale}
                    mainFontSize={mainFontSize}
                    name='tp3'
                    toggleChange={(newValue) =>
                      handleFieldChange('tp3', newValue, true)
                    }
                    onBlur={updateDataOnStoreOnBlur}
                    value={data?.tp3 ? data.tp3.toString() : ''}
                    sxStyle={{ width: '36%' }}
                  />
                  <Typography sx={{ textAlign: 'end', width: '28%' }}>
                    RR:
                  </Typography>
                  <CustomTextField
                    scale={scale}
                    mainFontSize={mainFontSize}
                    name='rr3'
                    toggleChange={(newValue) =>
                      handleFieldChange('rr3', newValue, true)
                    }
                    onBlur={updateDataOnStoreOnBlur}
                    value={data?.rr3 ? data.rr3.toString() : ''}
                    sxStyle={{ width: '36%', textOverflow: 'clip' }}
                  />
                </Grid>
              </Grid>

              <Typography
                sx={{
                  fontSize: `calc(18px * ${scale})`,
                  letterSpacing: `calc(-1.2px * ${scale})`,
                  width: '100%',
                  textAlign: 'center',
                  paddingTop: mainFontSize,
                  color: secondary,
                  textTransform: 'none',
                }}
              >
                *Time and Date (UTC)
              </Typography>
            </Box>
          ) : (
            <Box></Box>
          )}
        </Box>
        <Box
          sx={{
            width: {
              xs: '100%',
              md: `calc(${defaultWidth}px * ${scale})`,
            },
            margin: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '8px',
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
              padding: { xs: '8px', md: ' 8px' },
              borderRadius: '6px',
              width: '142px',
            }}
            onClick={handleReset}
          >
            Reset Values
          </Button>
          <Button
            variant='contained'
            sx={{
              background: '#0085FC',
              padding: { xs: '8px', md: '8px' },
              borderRadius: '6px',
              width: '142px',
            }}
            onClick={props.handlePreview}
          >
            Preview
          </Button>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {assetsOptions?.map((option, index) => (
            <MenuItem
              key={index}
              value={option.value}
              onClick={() => handleMenuSelect(option.value)}
            >
              {option.text}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Dialog
        open={openAlertDialog}
        title='Are You Sure?'
        handleClose={() => setOpenAlertDialog(false)}
        handleContinue={handleContinue}
      />
    </>
  )
}

export default TemplateCard
