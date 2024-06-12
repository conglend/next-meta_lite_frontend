import { configureStore } from '@reduxjs/toolkit'
import signalReducer, { fetchCurrentSignal } from '../redux/slice/signalSlice'

const store = configureStore({
  reducer: {
    signals: signalReducer,
  },
})
store.dispatch(fetchCurrentSignal())
export default store
export type RootState = ReturnType<typeof store.getState>
