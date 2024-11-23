import React, { useMemo } from 'react'
import useSWR from 'swr'
import { getApiService } from '../service/api.service'
import { User } from '../types/task.type';



export default function useGetAuthUser() {
 const authToken = useMemo(
    () => localStorage.getItem("userToken"),
    [localStorage.getItem("userToken")]
  );

const {data,isLoading}=useSWR(authToken?'/auth':"",getApiService)
const user:User = useMemo(()=>data?.data,[data?.data])
  return (
  {
    user
    ,userLoading:isLoading
  }
  )
}