import { useLocation, useNavigate } from "react-router-dom";
import { Spinner, useForm } from "../../../common";
import { getHeroByTerm } from "../services";
import { Hero } from "../interfaces/heroes.interface";
import { useEffect, useState } from "react";
import { HeroCard } from "../components";

interface HeroPageInitialState {
  data: Hero[];
  isLoading: boolean;
}

export const SearchHeroPage = (): JSX.Element => {

  const [hero, setHero] = useState<HeroPageInitialState>({ data: [], isLoading: false });
  const navigate = useNavigate();
  const location = useLocation();

  const { formState, onInputChange } = useForm<{ searchText: string }>({ searchText: '' });

  const onSearchHero = (e: React.FormEvent): void => {
    e.preventDefault();
    const searchText = formState.searchText.trim();
    if (searchText.length > 0) {
      navigate(`?term=${searchText.toLowerCase()}`);
    }
  }

  const onGetHeroByTerm = (term: string): void => {
    setHero({ ...hero, isLoading: true, data: [] });
    getHeroByTerm(term)
      .then(res => {
        setHero({ ...hero, isLoading: false, data: res });
      })
      .catch(error => {
        console.error(error);
        setHero({ ...hero, isLoading: false, data: [] });
      });
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('term');
    if (searchTerm) {
      // Si el término de búsqueda existe en la URL, lo usamos para hacer la consulta
      setHero({ ...hero, isLoading: true, data: [] });
      onGetHeroByTerm(searchTerm);
    }
  }, [location.search]);

  return (
    <>
      <h1>Search Heroe Here!</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchHero}>
            <input
              type="text"
              name="searchText"
              id="searchText"
              className="form-control"
              autoComplete="off"
              placeholder="Search a hero"
              value={formState.searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-2">
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {
            (hero.isLoading) && (<Spinner message={'Loading heroes...'} />)
          }
          {
            (hero.data.length > 0) && hero.data.map(h => (<HeroCard hero={h} key={h._id} />))
          }
          {
            (hero.isLoading === false && hero.data.length === 0 && location.search.trim() !== '') && (
              <div className="alert alert-danger">
                Hero not found.
              </div>
            )
          }

        </div>
      </div>
    </>
  )
}

