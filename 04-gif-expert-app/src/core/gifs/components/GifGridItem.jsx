
export const GifGridItem = ({gif}) => {
  return (
    <div className="card">
      <img src={gif.url} alt={gif.title}/>
      <p>{gif.title}</p>
    </div>
  )
}
