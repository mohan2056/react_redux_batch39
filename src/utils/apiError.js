export const getApiError = (error) => {
    if(!error.response){
        return 'NetWork error, Check Connection'
    }
    return(
        error.response.data?.message || error.message || 'Request Failed'
    )
}