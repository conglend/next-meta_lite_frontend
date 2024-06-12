import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiInstance from '../../services/api/apiInstance' // Update the path as needed
import { Signal, CurrentSignalId, Item } from '../../interfaces'
import Swal from 'sweetalert2'
import { ENDPOINTS } from '../end-points'

export const fetchSignals = createAsyncThunk(
  'signals/fetchSignals',
  async (sortingParams: string) => {
    try {
      const response = await apiInstance.get(
        `/${ENDPOINTS.GET_SIGNALS}?${sortingParams}`
      )
      return response.data
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        timer: 1500,
      })
      throw error
    }
  }
)
export const fetchCurrentSignal = createAsyncThunk(
  'signals/fetchCurrentSignal',
  async () => {
    console.log('call')
    try {
      const response = await apiInstance.get(
        `/${ENDPOINTS.GET_CURRENT_SIGNALS}`
      )
      if (response) {
        return response.data
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        timer: 1500,
      })
      throw error
    }
  }
)
export const postSignalId = createAsyncThunk(
  'signals/postSignalId',
  async (signalId: number) => {
    console.log('call')
    try {
      const response = await apiInstance.post(
        `/${ENDPOINTS.POST_SIGNAL_ID}?raw_signal_id=${signalId}`
      )
      if (response.status == 200 || 201) {
        Swal.fire({
          icon: 'success',
          title: 'Raw signal added successfully!',
          showConfirmButton: false,
          timer: 1500,
        })

        return response.data
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Not valid signal ID!',
        timer: 1500,
      })
      throw error
    }
  }
)

const signalSlice = createSlice({
  name: 'signals',
  initialState: {
    signals: [] as object as Signal,
    updatedSignals: [] as Item[],
    currentSignal: {} as object as CurrentSignalId,
    rawSignalPost: {} as string,
    status: 'idle',
    error: null,
    alertSide: 'LONG',
  },
  reducers: {
    setUpdatedSignals: (state, action) => {
      state.updatedSignals = action.payload
    },
    setSignals: (state, action) => {
      state.signals = action.payload
    },
    setAlertSide: (state, action) => {
      state.alertSide = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignals.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSignals.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.signals = action.payload
      })
      .addCase(fetchSignals.rejected, (state, action) => {
        state.status = 'failed'
        console.log('failed')
      })
      .addCase(fetchCurrentSignal.pending, (state) => {
        // state.status = 'loading';
      })
      .addCase(fetchCurrentSignal.fulfilled, (state, action) => {
        state.currentSignal = action.payload
      })
      .addCase(fetchCurrentSignal.rejected, (state, action) => {})
      .addCase(postSignalId.pending, (state) => {})
      .addCase(postSignalId.fulfilled, (state, action) => {
        state.rawSignalPost = action.payload
      })
      .addCase(postSignalId.rejected, (state, action) => {})
  },
})

export default signalSlice.reducer

export const { setUpdatedSignals, setSignals, setAlertSide } =
  signalSlice.actions
