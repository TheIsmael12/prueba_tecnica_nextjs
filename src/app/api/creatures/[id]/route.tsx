import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

import pool from '@/libs/db'

import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2'

import { authOptions } from '../../auth/[...nextauth]/route'

import { User } from '@/types/user'

// Obtenemos los valores de una sola criatura.

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ message: 'No autorizado.' }, { status: 401 })
    }

    const { id } = await params

    if (!id) {

        return NextResponse.json({ message: 'ID de la criatura no proporcionada.' }, { status: 400 })

    }

    return getCreature(id, session.user)

}

async function getCreature(id: string, session: User) {

    const userId = session.id

    try {

        const [creaturesRows]: [RowDataPacket[], FieldPacket[]] = await pool.query(

            'SELECT id, name, power_level, trained, type FROM creatures WHERE id = ? AND user_id = ?',
            [id, userId]

        )

        if (creaturesRows.length === 0) {

            return NextResponse.json({ message: 'Criatura no encontrada.' }, { status: 404 })

        }

        return NextResponse.json({

            creature: creaturesRows[0],

        }, { status: 200 })

    } catch (error) {

        console.error('Database error:', error)
        return NextResponse.json({ message: 'Upss: Ha ocurrido un error inesperado.' }, { status: 500 })

    }

}

// Actualizar los datos de la criatura.

export async function PUT(req: NextRequest) {

    const session = await getServerSession(authOptions)

    if (!session) {

        return NextResponse.json({ message: 'No autorizado.' }, { status: 401 })

    }

    return updateCreature(req, session.user)

}

async function updateCreature(req: NextRequest, session: User) {

    const userId = session.id // Id del usuario de la session.

    const { name, type, power_level, trained, id } = await req.json()

    if (!name || !type || !power_level || trained === undefined) {

        return NextResponse.json({ message: 'El nombre magico, tipo, nivel de poder y si esta entrenada son necesarios.' }, { status: 400 })

    }

    const itsTrained = trained === 1

    const query = 'UPDATE creatures SET name = ?, type = ?, power_level = ?, trained = ? WHERE id = ? AND user_id = ?'

    try {

        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.execute(query, [name, type, power_level, itsTrained, id, userId])

        if (result.affectedRows === 0) {

            return NextResponse.json({ message: 'Ha ocurrido un error al actualizar la criatura.' }, { status: 500 })

        }

        return NextResponse.json({ message: 'Tu criatura ha sido actualizada correctamente.' })

    } catch (error) {

        console.error('Database error:', error)

        return NextResponse.json({ message: 'Upss: Ha ocurrido un error inesperado.' }, { status: 500 })

    }

}