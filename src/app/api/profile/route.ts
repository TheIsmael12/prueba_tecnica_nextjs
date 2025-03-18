import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

import pool from '@/libs/db'
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2'

import { User } from '@/types/user'

import { authOptions } from '../auth/[...nextauth]/route'

// Funcion para obtener los datos del perfil del usuario.

export async function GET() {

    const session = await getServerSession(authOptions)

    if (!session) {

        return NextResponse.json({ message: 'No autorizado.' }, { status: 401 })

    }

    return getProfile(session.user)

}

async function getProfile(session: User) {

    const userId = session.id // ID del usuario de la sesión.

    const query = `SELECT username, email, role, description FROM users WHERE id = ?`

    try {

        const [profiles]: [RowDataPacket[], FieldPacket[]] = await pool.execute(query, [userId])

        if (!profiles || profiles.length === 0) {

            return NextResponse.json({ message: 'Perfil no encontrado.' }, { status: 404 })

        }

        return NextResponse.json({ profile: profiles[0] }, { status: 200 }) // Retorna el primer (y único) perfil encontrado

    } catch (error) {

        console.error('Error en la base de datos:', error)
        return NextResponse.json({ message: 'Ups: Ha ocurrido un error inesperado.' }, { status: 500 })

    }

}

// Funcion para actualizar el perfil del usuario

export async function PUT(req: NextRequest) {

    const session = await getServerSession(authOptions)

    if (!session) {

        return NextResponse.json({ message: 'No autorizado.' }, { status: 401 })

    }

    return updateProfile(req, session.user)

}

async function updateProfile(req: NextRequest, session: User) {

    const userId = session.id // Id del usuario de la session.

    const { username, email, role, description } = await req.json()

    if (!username || !email || !role || !description) {

        return NextResponse.json({ message: 'El usuario magico, email magico, el rol y la descripción son necesarios.' }, { status: 400 })

    }

    const query = 'UPDATE users SET username = ?, email = ?, role = ?, description = ? WHERE id = ?'

    try {

        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.execute(query, [username, email, role, description, userId])

        if (result.affectedRows === 0) {

            return NextResponse.json({ message: 'Ha ocurrido un error al actualizar el perfil.' }, { status: 500 })

        }

        return NextResponse.json({ message: 'Tu perfil ha sido actualizado.' })

    } catch (error) {

        console.error('Database error:', error)

        return NextResponse.json({ message: 'Upss: Ha ocurrido un error inesperado.' }, { status: 500 })

    }

}