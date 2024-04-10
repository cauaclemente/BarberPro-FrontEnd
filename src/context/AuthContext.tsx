import { createContext, ReactNode, useState } from "react";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  sigIn: (credentials: SigInProps) => Promise<void>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  endereco: string;
  subscriptions?: SubscriptionProps | null
}

interface SubscriptionProps {
  id: string;
  status: string
}

type AuthProviderProps = {
  children: ReactNode
}

interface SigInProps {
  email: string;
  password: string;
}

export const Authcontext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user

  async function sigIn({ email, password}: SigInProps){
    console.log({email,password})
  }

  return(
    <Authcontext.Provider value={{ user, isAuthenticated, sigIn }}>
      {children}
    </Authcontext.Provider>
  )
}
