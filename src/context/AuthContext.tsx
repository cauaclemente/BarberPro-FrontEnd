import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import Router from "next/router";

import { api } from "@/service/errors/apiClient";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  sigIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
  logoutUser: () => Promise<void>;
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

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpProps{
  name: string;
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

  async function sigIn({ email, password}: SignInProps){
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

  async function signUp({name, email, password}: SignUpProps) {
    try{
      const response = await api.post('/users',{
        name,
        email,
        password
      })

      Router.push('/dashboard');

    }catch(err){
      console.log(err)
    }
  }

  async function logoutUser(){
    try{
      destroyCookie(null, '@Barber.token', {path: "/"})
      Router.push('/login')
      setUser(null)

    }catch{
      alert("Erro ao deslogar")
    }
  }

  return(
    <Authcontext.Provider value={{
        user, 
        isAuthenticated, 
        sigIn, 
        signUp, 
        logoutUser 
       }}>
      {children}
    </Authcontext.Provider>
  )
}
