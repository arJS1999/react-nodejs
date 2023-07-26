import axios from '../Interceptor/axios';

  export const fetchData = () => {
    return (dispatch) => {
      return axios.get('/category/relation')
  
      .then(json =>
         dispatch(
         { type: "FetchData", data: json }))
        .catch(err => dispatch(
          { type: "ERROR",msg: "Unable to fetch data" }))
    };
  };


  export const loginrole=(role)=>{
    return(dispatch)=>{
      dispatch(
        {type:'ROLE',payload:{roledata:role}}
      )
    }
  }