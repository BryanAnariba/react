import { HeroList } from "../components"
import { Publisher } from "../enums"

export const MarvelPage = (): JSX.Element => {
  return (
    <div>
      <h1>Marvel Page</h1>
      <hr />
      <HeroList publisher={Publisher.MARVER_COMMICS} />
    </div>
  )
}
