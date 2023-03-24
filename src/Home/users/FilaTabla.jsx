import { useSelector } from "react-redux"


export const FilaTabla = ({ data = [] }) => {
  //const { isLoading } = useSelector(state => state.usuariosData)
  // if(isLoading){
  //   return <CheckLoading />
  // }
  return (
    data.map(user => {
      return (
        <tr key={user.user_id} >
          <td  scope="row" > {user.user_id} </td>
          <td> {user.nombre} </td>
          <td> {user.user} </td>
         {/*  <td> {user.pass} </td>  */}
        </tr>
      )
    })
  )
}



export const CheckLoading = () => {
  return (
    <>
      <div className="spinner-border" role="status">
      </div>
      <span className="sr-only">Loading...</span>
    </>
  )
}
