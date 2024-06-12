import { Crypto, TemplateCardInterface, Item } from '../interfaces'

export const getCardData = (
  signal: Item,
  alertSide: 'LONG' | 'SHORT' | string
) => {
  // const [asset1, asset2] = signal?.pair?.split('/')
  // console.log(signal?.pair?.split('/'))
  const cardData: TemplateCardInterface = {
    data: {
      alert_side: alertSide,
      asset_1: 'BTC' as Crypto,
      asset_2: 'BTC' as Crypto,
      alert_type: 'Moving',
      exchange: 'Binance',
      pair: signal?.pair,
      timeframe: '1h',
      entry_price: signal?.entry_price,
      datetime: signal?.created_timestamp,
      stoploss: signal?.stoploss,
      tp1: signal?.tp1,
      rr1: signal?.rr1,
      tp2: signal?.tp2,
      rr2: signal?.rr2,
      tp3: signal?.tp3,
      rr3: signal?.rr3,
      entryzone: signal?.entryzone,
      id: signal?.id,
    },
  }
  return cardData
}
