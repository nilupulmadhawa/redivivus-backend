import asyncHandler from '../middleware/async'
import { getPickupRequests, createPickupRequest, updatePickupRequest, getPickupRequest, deletePickupRequest } from '../services/pickupRequest'
import { makeResponse } from '../utils/response'


export const addPickupRequest = asyncHandler(async (req, res) => {
  try {
    const result = await createPickupRequest(req.body)
    if (!result) return makeResponse({ res, status: 500, message: 'Failed to add Pickup Request' })
    console.log(result.status);
    if (result.status) return makeResponse({ res, ...result })
    return makeResponse({ res, message: 'Pickup Request added successfully' })
  } catch (error) {
    return makeResponse({ res, status: 500, message: error.message })
  }

})

export const getAllPickupRequests = asyncHandler(async (req, res) => {
  const data = await getPickupRequests()
  return makeResponse({ res, data, message: 'Pickup Requests retrieved successfully' })
})

export const getPickupRequestById = asyncHandler(async (req, res) => {
  const result = await getPickupRequest(req.params.id)
  return makeResponse({ res, data: result.data, message: result.message })
})

export const updatePickupRequestById = asyncHandler(async (req, res) => {
  const result = await updatePickupRequest(req.params.id, req.body)
  if (!result) return makeResponse({ res, status: 500, message: 'Failed to update Pickup Request' })
  if (result.status) return makeResponse({ res, ...result })
  return makeResponse({ res, data: result, message: 'Pickup Request updated successfully' })
})

export const deletePickupRequestById = asyncHandler(async (req, res) => {
  const result = await deletePickupRequest(req.params.id)
  if (!result) return makeResponse({ res, status: 500, message: 'Failed to delete Paymend method' })
  if (result.status) return makeResponse({ res, ...result })
  return makeResponse({ res, message: 'Pickup Request deleted successfully' })
})