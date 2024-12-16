import { Navigate, Route, Routes } from 'react-router'
import { SignInPage, SignUpPage } from '../pages'
import { AuthLayout } from '../pages/AuthLayout'

export const AuthRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route path='sign-in' element={<SignInPage />} />
        <Route path='sign-up' element={<SignUpPage />} />
        <Route path="/" element={<Navigate to={'/sign-in'}/>} />
      </Route>
      <Route path="*" element={<Navigate to={'/auth/sign-in'}/>} />
    </Routes>
  )
}
