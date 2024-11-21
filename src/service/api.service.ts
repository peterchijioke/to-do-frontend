import AxiosInterceptor from "./AxiosInterceptor"

export const postApiService=async(
  url:string, { arg }: { arg: any}
)=>{
try {
  const response = await AxiosInterceptor.post(url,{
    ...arg
  })

 if (response.data) return response.data;
    return {};
  } catch (error: any) {
    return error?.response?.data ?? error;
  }
}
export const getApiService=async(
  url:string
)=>{
try {
  const response = await AxiosInterceptor.get(url)
 if (response.data) return response.data;
    return {};
  } catch (error: any) {
    return error?.response?.data ?? error;
  }
}
