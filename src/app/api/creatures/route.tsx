import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

import pool from '@/libs/db'
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2'

import { User } from '@/types/user'

import { authOptions } from '../auth/[...nextauth]/route'

// Funcion para obtener las criaturas del usuario.

export async function GET(req: NextRequest) {

    const session = await getServerSession(authOptions)

    if (!session) {

        return NextResponse.json({ message: 'No autorizado.' }, { status: 401 })

    }

    return getCreatures(req, session.user)

}

async function getCreatures(req: NextRequest, session: User) {

    const { searchParams } = new URL(req.url)

    const search = `%${searchParams.get('search') || ''}%`
    const page = parseInt(searchParams.get('page') || '1', 5)
    const types = searchParams.getAll('type[]')

    const limit = 5
    const offset = (page - 1) * limit

    if (isNaN(page) || page < 1) {

        return NextResponse.json({ message: 'Página no válida.' }, { status: 400 })

    }

    const userId = session.id;

    // Construir la cláusula de tipo (si hay tipos en los parámetros de búsqueda)

    let typeCondition = ''

    if (types.length > 0) {

        const placeholders = types.map(() => '?').join(', ')
        typeCondition = `AND type IN (${placeholders})`

    }

    // Consulta para obtener las criaturas con los filtros de búsqueda y tipos

    const query = `
        SELECT 
            id, name, type, power_level, trained
        FROM creatures 
        WHERE user_id = ? 
        AND name LIKE ?
        ${typeCondition}
        LIMIT ${limit} OFFSET ${offset}
    `

    // Consulta para obtener el total de registros

    const countQuery = `

        SELECT COUNT(*) as total
        FROM creatures 
        WHERE user_id = ? 
        AND name LIKE ?
        ${typeCondition}

    `

    try {

        // Ejecutar consulta para obtener criaturas

        const [creaturesRows] = await pool.execute(query, [userId, search, ...types])

        // Ejecutar consulta para obtener el total de criaturas
        const [totalResult]: [RowDataPacket[], FieldPacket[]] = await pool.execute(countQuery, [userId, search, ...types])

        // Calcular el total de páginas

        const totalRecords = totalResult[0].total
        const totalPages = Math.ceil(totalRecords / limit)

        return NextResponse.json({

            creatures: creaturesRows,
            totalCreatures: totalRecords,
            totalPages

        }, { status: 200 })

    } catch (error) {

        console.error('Error en la base de datos:', error);
        return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 })

    }

}

// Funcion para actualizar la criatura del usuario

export async function PUT(req: NextRequest) {

    const session = await getServerSession(authOptions)

    if (!session) {

        return NextResponse.json({ message: 'No autorizado.' }, { status: 401 })

    }

    return updateCreatures(req)

}

async function updateCreatures(req: NextRequest) {


    const { id, name, type, power_level, trained } = await req.json()

    if (!id || !name || !type || !power_level || !trained) {

        return NextResponse.json({ message: 'Porfavor, especifica el nombre, tipo y nivel de poder de tu criatura.' }, { status: 400 })

    }

    const query = 'UPDATE creatures SET name = ?, type = ?, power_level = ?, trained = ? WHERE id = ?'

    try {

        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.execute(query, [name, type, power_level, trained, id])

        if (result.affectedRows === 0) {

            return NextResponse.json({ message: 'Ha ocurrido un error al actualizar la criatura.' }, { status: 500 })

        }

        return NextResponse.json({ message: `La criatura ${name} has sido actualizada correctamente.` })

    } catch (error) {

        console.error('Database error:', error)

        return NextResponse.json({ message: 'Upss: Ha ocurrido un error inesperado.' }, { status: 500 })

    }

}

// Funcion para insertar una nueva criatura.

export async function POST(req: NextRequest) {

    const session = await getServerSession(authOptions)

    if (!session) {

        return NextResponse.json({ message: 'No autorizado.' }, { status: 401 })

    }

    return addCreatures(req, session.user)

}

async function addCreatures(req: NextRequest, session: User) {

    const userId = session.id

    const { name, type, power_level, trained } = await req.json()

    if (!name || !type || !power_level || !trained) {

        return NextResponse.json({ message: 'Porfavor, especifica el nombre, tipo y nivel de poder de tu criatura.' }, { status: 400 })

    }

    const query = `INSERT INTO creatures (user_id, name, type, power_level, trained)
                VALUES (?, ?, ?, ?, ?)`

    try {

        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.execute(query, [userId, name, type, power_level, trained])

        if (result.affectedRows === 0) {

            return NextResponse.json({ message: 'Ha ocurrido un error al crear la criatura.' }, { status: 500 })

        }

        return NextResponse.json({ message: `La criatura ${name} has sido creada correctamente.` })

    } catch (error) {

        console.error('Database error:', error)

        return NextResponse.json({ message: 'Upss: Ha ocurrido un error inesperado.' }, { status: 500 })

    }

}

// Funcion para elimiar una criatura.

export async function DELETE(req: NextRequest) {

    const session = await getServerSession(authOptions)

    if (!session) {

        return NextResponse.json({ message: 'No autorizado.' }, { status: 401 })

    }

    return deleteCreatures(req, session.user)

}

async function deleteCreatures(req: NextRequest, session: User) {

    const role = session.role

    if (role !== 'Maestro') {

        return NextResponse.json({ message: 'No estas autorizado para realizar esta acción.' }, { status: 401 })

    }

    const { creatureId } = await req.json()

    if (!creatureId) {

        return NextResponse.json({ message: 'Porfavor, especifica el la ID de la criatura.' }, { status: 400 })

    }

    const query = `DELETE FROM creatures WHERE id = ?`

    try {

        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.execute(query, [creatureId])

        if (result.affectedRows === 0) {

            return NextResponse.json({ message: 'Ha ocurrido un error al eliminar la criatura.' }, { status: 500 })

        }

        return NextResponse.json({ message: `La criatura con ID: ${creatureId} ha sido eliminada correctamente.` })

    } catch (error) {

        console.error('Database error:', error)

        return NextResponse.json({ message: 'Upss: Ha ocurrido un error inesperado.' }, { status: 500 })

    }

}