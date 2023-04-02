import { useSelector } from "react-redux"
import { useUsuarios } from "../../hooks/configuraciones/useUsuarios"


export const FilaTabla = ({ 
  data = [],
  onEditUser =()=>{console.log('edit')},
  onDeleteUser = () => {console.log('delete')}
}) => {
  const { setUserIDStore } = useUsuarios()
  //const { isLoading } = useSelector(state => state.usuariosData)
  // if(isLoading){
  //   return <CheckLoading />
  // }

  const edit = async (userID) =>{
    console.log( `userID ${userID}`)
 //setUserIDStore(userID)
    onEditUser(userID)
  }

  const deleteUSR = (userID) =>{
    console.log( `userID ${userID}`)
    onDeleteUser(userID)
  }

const select = (userID) =>{
  //e.target.parentNode.className = 'selected'
  console.log( `userID ${userID}`)
}

  return (
    data.map(user => {
      return (
        <tr  onClick={() => { select(user.user_id) }} onDoubleClick={()=> { edit(user.user_id) }} key={user.user_id} >
          <td  scope="row" > {user.user_id} </td>
          <td> {user.nombre} </td>
          <td> {user.user} </td>
          <td style={{width: '200px'}} ><button onClick={() => { edit(user.user_id) }}
          className="btn btn-info btn-sm me-1" data-title="Edit" data-toggle="modal" data-target="#edit" ><span className="material-symbols-outlined">edit</span></button>
          <button onClick={() => { deleteUSR(user.user_id) }}
          className="btn btn-danger btn-sm" data-title="Edit" data-toggle="modal" data-target="#edit" ><span className="material-symbols-outlined">delete</span></button>
          </td>
         
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
