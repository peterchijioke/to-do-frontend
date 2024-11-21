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
    console.log('=============postApiService=======================');
    console.log(error?.response?.data);
    console.log('==============postApiService======================');
    return error?.response?.data ?? error;
  }
}
