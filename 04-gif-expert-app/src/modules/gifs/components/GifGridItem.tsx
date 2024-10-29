interface Props {
  id: string;
  title: string;
  url: string;
}

export const GifGridItem = ({ id, title, url }: Props): JSX.Element => {
  return (
    <li className="card">
      <p>
        {id} - {title}
      </p>
      <img src={url} alt={'Image ' + title} />
    </li>
  )
}
