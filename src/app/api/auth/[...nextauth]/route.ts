import NextAuth from 'next-auth'
import { NextAuthOptions } from 'next-auth'

import CredentialsProvider from 'next-auth/providers/credentials'

import pool from '@/libs/db'

import { RowDataPacket, FieldPacket } from 'mysql2'

import { compare } from 'bcrypt'

declare module 'next-auth' {

    interface User {

        id: string
        username: string
        email: string
        role: string
        
    }

    interface Session {

        user: User

    }

}

export const authOptions: NextAuthOptions = {

    providers: [

        CredentialsProvider({

            name: 'Credentials',
            credentials: {

                email: { label: 'Email', type: 'email', placeholder: 'user@user.com' },
                password: { label: 'Password', type: 'password' },

            },

            async authorize(credentials) {

                if (!credentials) {

                    throw new Error('Credenciales no proporcionadas')

                }

                const [rows]: [RowDataPacket[], FieldPacket[]] = await pool.query(

                    'SELECT * FROM users WHERE email = ? LIMIT 1',
                    [credentials.email]

                )

                const user = rows[0]

                if (!user) {

                    throw new Error('Usuario o contraseña incorrecta.')

                }

                const isPasswordValid = await compare(credentials.password, user.password)

                if (!isPasswordValid) {

                    throw new Error('Usuario o contraseña incorrecta.')

                }

                return {

                    id: user.id.toString(),
                    username: user.username,
                    email: user.email,
                    role: user.role,

                }

            },

        }),

    ],

    pages: {

        signIn: '/login',

    },

    session: {

        strategy: 'jwt',
        maxAge: 5 * 24 * 60 * 60, // 5 días en segundos

    },

    callbacks: {

        async jwt({ token, user }) {

            if (user) {

                token.id = user.id
                token.username = user.username
                token.email = user.email
                token.role = user.role || 'Cuidador'

            }
            
            return token

        },

        async session({ session, token }) {

            if (token) {

                session.user = {
            
                    id: token.id as string,
                    username: token.username as string,
                    email: token.email as string,
                    role: token.role as string,

                }

            }

            return session
        },

    },

}

export const GET = NextAuth(authOptions)
export const POST = NextAuth(authOptions)