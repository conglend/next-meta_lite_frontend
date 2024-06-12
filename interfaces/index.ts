export interface Signal {
  items: Item[]
  total: number
  page: number
  size: number
  pages: number
}

export interface Item {
  id: number
  rule_id: string
  candle_type_id: number
  open_timestamp: string
  close_timestamp?: string
  created_timestamp: string
  entry_price: number
  stoploss: any
  tp1: any
  tp2: any
  tp3: any
  rr1: any
  rr2: any
  rr3: any
  is_duplicate: boolean
  strategy_name: string
  status?: Status
  pair: string
  entryzone?: string
  timeframe?: string
}

export interface Status {
  '33'?: string[]
  '37'?: string[]
  '19'?: string[]
  '23'?: string[]
  '36'?: string[]
  '28'?: string[]
  '22'?: string[]
  '26'?: string[]
  '27'?: string[]
  '20'?: string[]
  '24'?: string[]
  '30'?: string[]
}

export interface CurrentSignalId {
  id: number
  raw_signal_id: number
}

export type Crypto = 'BTC' | 'USDT' | 'ETH' | string
export interface TemplateCardInterface {
  width?: number
  scale?: number
  data: {
    alert_side: 'LONG' | 'SHORT' | string
    asset_1: Crypto
    asset_2: Crypto
    alert_type: string
    exchange: string
    pair: string
    timeframe: string
    entry_price: number
    datetime: string
    stoploss: number | string
    tp1: number | string
    rr1: number | string
    tp2: number | string
    rr2: number | string
    tp3: number | string
    rr3: number | string
    entryzone?: string
    id?: number | string
  }
  handlePreview?: () => void
  handleCancel?: () => void
}

export type TableComponentProps = {
  setActiveSignal: React.Dispatch<React.SetStateAction<TemplateCardInterface | null>>
  alertSide: string
  activeSignal: TemplateCardInterface
  setWarningDialogOpen: (value: boolean) => void
  setsignalToBeSetActive: React.Dispatch<
    React.SetStateAction<TemplateCardInterface | null>
  >
}
