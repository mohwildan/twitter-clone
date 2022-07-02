
const Comment = ({comment}) => {
   
  return (
    <div>
       
        <h1>{comment?.name}</h1>
        <h1>{comment?.comment}</h1>
    </div>
  )
}

export default Comment