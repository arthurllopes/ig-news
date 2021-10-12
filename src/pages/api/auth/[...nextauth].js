import { query as q } from "faunadb"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {faunadb} from '../../../services/faunadb'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(user, account, profile){
      try{
        const { email } = user
        await faunadb.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('USERS'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          ),
        )
        return true
      } catch {
        return false
      }
      
      
    }
  }
})