import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import Router from "next/router";

import { api } from "@/service/errors/apiClient";

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

export function signOut(){
  console.log("Erro logout")
  try{
    destroyCookie(null, '@Barber.token', { path: '/' })
    Router.push('/login')
  }catch(err){
    console.log(err)
  }
}

export function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user

  async function sigIn({ email, password}: SigInProps){
    try{
      const response = await api.post('/session', {
        email,
        password
      })

      const { id, name, endereco, token, subscriptions} = response.data;

      setCookie(undefined, '@Barber.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/' 
      })

      setUser({
        id,
        name,
        email,
        endereco,
        subscriptions
      })

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')

    }catch(err){
      console.log(err)
    }
  }

  return(
    <Authcontext.Provider value={{ user, isAuthenticated, sigIn }}>
      {children}
    </Authcontext.Provider>
  )
}
