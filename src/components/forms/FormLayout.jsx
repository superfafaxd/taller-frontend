export const FormLayout = ({ children, text = '' }) => {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <h3 className="text-center">{text}</h3>
        {children}
      </div>
    </div>
  )
}
