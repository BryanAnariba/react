import { ReactNode, useState } from "react"
import { User, UserContext } from './UserContext';

export interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{
      user: user, 
      setUser: setUser
    }}>
      {children}
    </UserContext.Provider>
  )
}
