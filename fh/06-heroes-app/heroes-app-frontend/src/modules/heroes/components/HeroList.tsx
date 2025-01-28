import { useEffect, useState } from "react";
import { Publisher } from "../enums"
import { getHeroesByPublisher } from "../services";
import { Hero } from "../interfaces/heroes.interface";
import { Spinner } from "../../../common";
import { HeroCard } from "./HeroCard";

interface HeroInitialState {
  isLoading: boolean;
  data: Hero[];
}

interface HeroListProps {
  publisher: Publisher;
}

export const HeroList = ({ publisher }: HeroListProps): JSX.Element => {

  const [heroes, setHeroes] = useState<HeroInitialState>({
    isLoading: false,
    data: []
  });
  const { isLoading, data } = heroes;

  useEffect(() => {
    getHeroes();
  }, []);

  const getHeroes = (): void => {
    setHeroes({ ...heroes, isLoading: true, data: [] });
    getHeroesByPublisher(publisher)
      .then(res => {
        setHeroes({ ...heroes, isLoading: false, data: res });
      })
      .catch(error => {
        console.error(error);
        setHeroes({ ...heroes, isLoading: false, data: [] });
      });
  }

  return (
    <>
      {
        (isLoading)
          ?
          <Spinner message={'Loading Heroes...'} />
          :
          <div className="row">
            {
              data.map(hero => (
                <div className="col-sm-12 col-md-3 g-3 animate__animated animate__fadeInDown" key={hero._id}>
                  <HeroCard hero={hero} key={hero._id}/>
                </div>
              ))
            }
          </div>
      }
    </>
  )
}
