import { AppRouter } from "./common"
import { AuthProvider } from "./modules/auth"

export const HeroesApp = (): JSX.Element => {
  return (
    <>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </>
  )
}
