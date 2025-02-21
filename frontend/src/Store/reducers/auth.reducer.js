const defaultAuthState = {
    token:null,
    isLoading:false,
    isError:null
}
export default function authReducer (state=defaultAuthState,{type,payload}){
switch (type) {
    case 'value':
        
        return state

    default:
        return state
}
}