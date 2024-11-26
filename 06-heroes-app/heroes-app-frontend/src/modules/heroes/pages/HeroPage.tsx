import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Hero } from "../interfaces/heroes.interface";
import { getHeroById } from "../services";
import { Spinner } from "../../../common";

interface HeroPageInitialState {
  data: Hero | null;
  isLoading: boolean;
}

export const HeroPage = (): JSX.Element => {
  const { heroId } = useParams();
  const navigate = useNavigate();

  const [hero, setHero] = useState<HeroPageInitialState>({ data: null, isLoading: false });

  useEffect(() => {
    getHero(heroId!);
  }, [heroId]);

  const onGoBack = () => {
    navigate('/dashboard/heroes/marvel')
  }

  const getHero = (heroId: string) => {
    setHero({ ...hero, isLoading: true, data: null });
    getHeroById(heroId)
      .then(res => {
        setHero({ ...hero, isLoading: false, data: res });
      })
      .catch(error => {
        navigate('/dashboard/heroes/marvel');
        console.error(error.message);
        setHero({ ...hero, isLoading: false, data: null });
      });
  }

  return (
    <>
      {
        (hero.isLoading)
          ?
            <Spinner message={'Loading Hero...'} />
          :
            <div className="row animate__animated animate__backInRight">
              <div className="col-4">
                <img src={'/assets/heroes/' + hero.data?.hero_id + '.jpg'} alt={hero.data?.superhero + ' image'} className="img-thumbnail" />
              </div>
              <div className="col-8">
                <h3>{hero.data?.superhero}</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><b>Alter ego: </b>{hero.data?.alter_ego}</li>
                  <li className="list-group-item"><b>Publisher: </b>{hero.data?.publisher}</li>
                  <li className="list-group-item"><b>First Appareance: </b>{hero.data?.first_appearance}</li>
                </ul>
                <h5 className="mt-3">Characters</h5>
                <p>
                  {hero.data?.characters}
                </p>
                <button className="btn btn-outline-primary" onClick={onGoBack}>
                  Go Back
                </button>
              </div>
            </div>
      }
    </>
  )
}
