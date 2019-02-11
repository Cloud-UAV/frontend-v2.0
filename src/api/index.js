import axios from 'axios'

const api = axios.create({
    baseURL: process.env.VUE_APP_CLOUDUAV_API_URL + '/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

export function fetchAssets( model ) {
    let resp = api.get(`${model}`)
    return resp
}

export function fetchAsset( model, modelId ) {
  let resp = api.get(`${model}/${modelId}`)
  return resp
}

export function saveNewAsset( model, body ) {
  let resp = api.post(`${model}`, body)
  return resp
}

export function updateAsset( model, modelId, body ) {
  let resp = api.patch(`${model}/${modelId}`, body)
  return resp
}

export function removeAsset( model, id ) {
  let resp = api.delete(`${model}/${id}`)
  return resp
}

export function linkUser( userId, idToLink ) {
  api.patch(`personnel/${userId}`, { user_personnel: [idToLink] })
}