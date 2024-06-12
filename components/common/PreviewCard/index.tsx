import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CurrencyIcon } from '../currency-icon-scalable'
import { TemplateCardInterface } from '../../../interfaces'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

type ExtendedProps = TemplateCardInterface & {
  handlePostPreview: (textValue: string) => void
}

const PreviewCard = (props: TemplateCardInterface) => {
  const defaultWidth = 480
  const scale = props?.scale || (props?.width as number) / defaultWidth || 1

  const [data, setData] = useState<TemplateCardInterface['data'] | null>(null)

  const secondary = data?.alert_side == 'LONG' ? '#00ff84' : '#F29b9b'
  const background = data?.alert_side == 'LONG' ? '#008c44' : '#f05253'
  const mainFontSize = `calc(22px * ${scale})`
  const rowHeight = `calc(30px * ${scale})`
  const borderRadius = `calc(30px * ${scale})`

  const [textValue, setTextValue] = useState<string>('')

  useEffect(() => {
    if (props.data) {
      const updatedData = { ...props.data }

      for (const key in updatedData) {
        if (
          Object.prototype.hasOwnProperty.call(updatedData, key) &&
          updatedData[key] == null
        ) {
          updatedData[key] = '-'
        }
      }

      setData(updatedData)
    }
  }, [props.data])

  const handlePostPreview = () => {
    if (textValue !== 'CONFIRM') {
      return toast('Please type CONFIRM to continue', {
        type: 'error',
        autoClose: 800,
      })
    }
    // need to update the logic to handle the view preview
    props.handleCancel()
  }

  return (
    <Box
      sx={{
        bgcolor: 'white',
        height: 'auto',
        borderRadius: '4px',
        padding: '12px',
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gap: '40px',
      }}
    >
      <Box>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '18px',
          }}
        >
          Preview
        </Typography>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: '15px',
          }}
        >
          {`Are you sure the values are correct? Please type 'CONFIRM' in the field below to proceed`}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height:'auto',
          maxHeight: `calc(780px * ${scale})`,
        }}
      >
        <Box
          sx={{
            background: data?.alert_side == 'LONG' ? '#094047' : '#4C3348',
            width: `calc(${defaultWidth}px * ${scale})`,
            height: `100%`,
            borderRadius: '2px',
            padding: borderRadius,
            color: 'white',
          }}
        >
          <Box
            sx={{
              background: background,
              width: '100%',
              height: '100%',
              borderRadius: borderRadius,
              textTransform: 'uppercase',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
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
                height: 'auto',
              }}
            >
              metasignals.io/lite
            </Typography>
            <Typography
              sx={{
                fontSize: `calc(36px * ${scale})`,
                marginX: 'auto',
                letterSpacing: `calc(-1.2px * ${scale})`,
                width: '85%',
                textAlign: 'center',
                height: 'auto',
              }}
            >
              POTENTIAL {data?.alert_side}
            </Typography>
            <Grid
              item
              xs={12}
              sx={{
                paddingRight: `calc(24px * ${scale})`,
                paddingLeft: `calc(20px * ${scale})`,
                my: '4px',
                height: 'auto',
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
                }}
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
                }}
              >
                {<CurrencyIcon icon={'USDT'} />}
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                width: '30%',
                marginX: 'auto',
                alignItems: 'center',
                paddingX: `calc(5px * ${scale})`,
                height: 'auto',
              }}
            >
              <Grid item xs={5.9}>
                <Typography
                  sx={{
                    fontSize: mainFontSize,
                    textAlign: 'center',
                    margin: 'auto',
                    direction: 'rtl',
                  }}
                >
                  {data?.asset_1}
                </Typography>
              </Grid>
              <Grid item xs={0.2} />
              <Grid item xs={5.9}>
                <Typography
                  sx={{
                    fontSize: mainFontSize,
                    textAlign: 'center',
                    margin: 'auto',
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
                height: 'auto',
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
                height: 'auto',
              }}
            >
              <Grid item xs={6} sx={{ textAlign: 'left', height: 'auto' }}>
                <Typography
                  sx={{
                    paddingLeft: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                  }}
                >
                  Alert type:
                </Typography>
              </Grid>

              <Grid item xs={6} sx={{ textAlign: 'right', height: 'auto' }}>
                <Typography
                  sx={{
                    paddingRight: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                  }}
                >
                  {data?.alert_type}
                </Typography>
              </Grid>

              <Grid item xs={6} sx={{ textAlign: 'left', height: 'auto' }}>
                <Typography
                  sx={{
                    paddingLeft: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                  }}
                >
                  Exchange:
                </Typography>
              </Grid>

              <Grid item xs={6} sx={{ textAlign: 'right', height: 'auto' }}>
                <Typography
                  sx={{
                    paddingRight: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                  }}
                >
                  {data?.exchange}
                </Typography>
              </Grid>

              <Grid item xs={6} sx={{ textAlign: 'left', height: 'auto' }}>
                <Typography
                  sx={{
                    paddingLeft: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                  }}
                >
                  Pair:
                </Typography>
              </Grid>

              <Grid item xs={6} sx={{ textAlign: 'right', height: 'auto' }}>
                <Typography
                  sx={{
                    paddingRight: `calc(20px * ${scale})`,
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
                  height: 'auto',
                  paddingRight: `calc(20px * ${scale})`,
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

              <Grid item xs={6} sx={{ textAlign: 'left', height: 'auto' }}>
                <Typography
                  sx={{
                    paddingLeft: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                  }}
                >
                  Time frame:
                </Typography>
              </Grid>

              <Grid item xs={6} sx={{ textAlign: 'right', height: 'auto' }}>
                <Typography
                  sx={{
                    paddingRight: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                  }}
                >
                  {data?.timeframe}
                </Typography>
              </Grid>

              <Grid item xs={6} sx={{ textAlign: 'left', height: 'auto' }}>
                <Typography
                  sx={{
                    paddingLeft: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                  }}
                >
                  Price:
                </Typography>
              </Grid>

              <Grid item xs={6} sx={{ textAlign: 'right', height: 'auto' }}>
                <Typography
                  sx={{
                    paddingRight: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                  }}
                >
                  {data?.entry_price}
                </Typography>
              </Grid>
              <Grid item xs={5} sx={{ textAlign: 'left' }}>
                <Typography
                  sx={{
                    paddingLeft: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                    height: 'auto',
                  }}
                >
                  {'date & time:'}
                </Typography>
              </Grid>
              <Grid item xs={7} sx={{ textAlign: 'right' }}>
                <Typography
                  sx={{
                    paddingRight: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                    height: 'auto',
                    textTransform: 'none',
                  }}
                >
                  {dayjs(data?.datetime).format('YYYY-MM-DD')} at{' '}
                  {dayjs(data?.datetime).format('h:mm')}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  height: 'auto',
                  paddingRight: `calc(20px * ${scale})`,
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

              <Grid item xs={5} sx={{ textAlign: 'left', height: 'auto' }}>
                <Typography
                  sx={{
                    paddingLeft: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                  }}
                >
                  Entry Zone:
                </Typography>
              </Grid>

              <Grid item xs={7} sx={{ textAlign: 'right', height: 'auto' }}>
                <Typography
                  sx={{
                    paddingRight: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                  }}
                >
                  {data?.entryzone}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'left', height: 'auto' }}>
                <Typography
                  sx={{
                    paddingLeft: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                  }}
                >
                  Stop loss:
                </Typography>
              </Grid>

              <Grid item xs={6} sx={{ textAlign: 'right', height: 'auto' }}>
                <Typography
                  sx={{
                    paddingRight: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                  }}
                >
                  {data?.stoploss}
                </Typography>
              </Grid>
              <Grid item xs={5} sx={{ textAlign: 'left' }}>
                <Typography
                  sx={{
                    paddingLeft: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                    height: 'auto',
                  }}
                >
                  {'Target 1:'}
                </Typography>
              </Grid>
              <Grid item xs={7} sx={{ textAlign: 'right' }}>
                <Typography
                  sx={{
                    paddingRight: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                    height: 'auto',
                  }}
                >
                  {data?.tp1?.toString().slice(0, 6)} &nbsp; RR: &nbsp;{' '}
                  {data?.rr1?.toString().slice(0, 6)}
                </Typography>
              </Grid>
              <Grid item xs={5} sx={{ textAlign: 'left' }}>
                <Typography
                  sx={{
                    paddingLeft: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                    height: 'auto',
                  }}
                >
                  {data?.tp2 ? 'Target 2:' : ' '}
                </Typography>
              </Grid>
              <Grid item xs={7} sx={{ textAlign: 'right' }}>
                <Typography
                  sx={{
                    paddingRight: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                    height: 'auto',
                  }}
                >
                  {data?.tp2 ? (
                    <>
                      {data?.tp2?.toString().slice(0, 6)} &nbsp; RR: &nbsp;{' '}
                      {data?.rr2?.toString().slice(0, 6)}
                    </>
                  ) : (
                    ' '
                  )}
                </Typography>
              </Grid>
              <Grid item xs={5} sx={{ textAlign: 'left' }}>
                <Typography
                  sx={{
                    paddingLeft: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                    height: 'auto',
                  }}
                >
                  {data?.tp2 && data?.tp3 ? 'Target 3:' : ' '}
                </Typography>
              </Grid>
              <Grid item xs={7} sx={{ textAlign: 'right' }}>
                <Typography
                  sx={{
                    paddingRight: `calc(20px * ${scale})`,
                    fontSize: mainFontSize,
                    height: 'auto',
                  }}
                >
                  {data?.tp2 && data?.tp3 ? (
                    <>
                      {data?.tp3?.toString().slice(0, 6)} &nbsp; RR: &nbsp;{' '}
                      {data?.rr3?.toString().slice(0, 6)}
                    </>
                  ) : (
                    ' '
                  )}
                </Typography>
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
        </Box>
      </Box>
      <Box
        sx={{
          margin: 'auto',
          width: `calc(${defaultWidth}px * ${scale})`,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <Typography
          sx={{
            fontSize: '15px',
            color: '#5a5a5a !important',
            fontWeight: 500,
          }}
        >{`Type "CONFIRM"`}</Typography>
        <TextField
          name='name'
          inputProps={{
            style: {
              height: '36px',
              padding: '0 14px',
              WebkitBoxShadow: `0 0 0 1000px ${'white'} inset`,
              WebkitTextFillColor: '#495057',
              color: '#495057',
            },
          }}
          type='text'
          variant='outlined'
          fullWidth
          onChange={(e) => setTextValue(e.target.value)}
          value={textValue}
        />
        <Box
          sx={{
            width: `calc(${defaultWidth}px * ${scale})`,
            margin: 'auto',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingY: '4px',
            gap: '10px',
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
              padding: { xs: '8px 14px' },
              borderRadius: '6px',
            }}
            onClick={props.handleCancel}
          >
            {' '}
            Cancel
          </Button>
          <Button
            variant='contained'
            sx={{
              background: '#0085FC',
              padding: { xs: '8px 14px' },
              borderRadius: '6px',
            }}
            disabled={!textValue}
            onClick={handlePostPreview}
          >
            Post
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default PreviewCard
