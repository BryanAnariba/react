import { HeroList } from "../components"
import { Publisher } from "../enums"

export const DCPage = (): JSX.Element => {
  return (
    <div>
      <h1>DC Heroes</h1>
      <hr />
      <HeroList publisher={Publisher.DC_COMMICS} />
    </div>
  )
}
