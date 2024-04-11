import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "@/service/errors/AuthTokenError";

export function canSSRAuth<P>(fn: GetServerSideProps<P>){
  return async(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    const token = cookies['@Barber.token'];

    if(!token){
      return{
        redirect:{
          destination: '/login',
          permanent: false,
        }
      }
    }

    try{
      return await fn(ctx)

    }catch(err){
      if(err instanceof AuthTokenError){
        destroyCookie(ctx, '@Barber.token', { path: '/'} );
        return{
          redirect:{
            destination: '/',
            permanent: false
          }
        }
      }
    }
  }
}