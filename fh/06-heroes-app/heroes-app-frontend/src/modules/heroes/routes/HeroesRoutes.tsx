import { Navigate, Route, Routes } from 'react-router-dom'
import { DCPage, HeroPage, MarvelPage, SearchHeroPage } from '../pages'
import { Navbar } from '../../../common'

export const HeroesRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-2">
        <Routes>
          <Route path="marvel" element={<MarvelPage />} />
          <Route path="dc" element={<DCPage />} />
          <Route path='view/:heroId' element={<HeroPage />} />
          <Route path='search' element={<SearchHeroPage />} />
          <Route path="/" element={<Navigate to={'marvel'} />} />
        </Routes>
      </div>
    </>
  )
}
