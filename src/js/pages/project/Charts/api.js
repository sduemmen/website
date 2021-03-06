import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const apiHeaders = {
    "apiHost": '',
    "apiKey": ''
};

const baseUrl = '';

const createRequest = url => ({ url, headers: apiHeaders})

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl=baseUrl }),
    endpoints: (builder) => ({
        get: builder.query({
            query: () => createRequest('/charts')
        })
    })
})

var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coins',
  params: {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    timePeriod: '24h',
    tiers: '1',
    orderBy: 'marketCap',
    orderDirection: 'desc',
    limit: '50',
    offset: '0'
  },
  headers: {
    'x-rapidapi-host': '',
    'x-rapidapi-key': ''
  }
};
