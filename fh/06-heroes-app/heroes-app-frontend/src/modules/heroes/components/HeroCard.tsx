import { Link } from "react-router-dom";
import { Hero } from "../interfaces/heroes.interface"

interface HeroCardProps {
  hero: Hero;
}

interface HeroCharacterProps {
  alter_ego: string;
  characters: string;
}

const HeroCharacter = ({ alter_ego, characters }: HeroCharacterProps): JSX.Element => {
  return ((alter_ego !== characters)
    ?
      <p>{characters}</p>
    : 
      <></>
  );
}

export const HeroCard = ({ hero }: HeroCardProps): JSX.Element => {
  const heroImageUrl = `/assets/heroes/${hero.hero_id}.jpg`;
  // console.log(heroImageUrl);
  return (
    <div className="col">
      <div className="card">
        <div className="row no-gutters">
          <div className="col-4">
            <img src={heroImageUrl} alt={hero.superhero + ' image'} className="card-img" />
          </div>
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">
                {hero.superhero}
              </h5>
              <p className="card-text">
                {hero.alter_ego}
              </p>

              <p className="card-text">
                <small className="text-muted">{hero.first_appearance}</small>
              </p>

              <HeroCharacter alter_ego={hero.alter_ego} characters={hero.characters} />

              <Link to={'/dashboard/heroes/view/' + hero._id} className="text-primary">More...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
