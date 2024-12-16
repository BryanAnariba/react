import { Navigate, Route, Routes } from "react-router"
import { AboutPage, HomePage } from "../pages"

export const InventoryRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path="/*" element={<Navigate to={'/'}/>} />
    </Routes>
  )
}
