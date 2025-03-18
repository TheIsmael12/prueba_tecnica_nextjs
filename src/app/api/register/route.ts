import { NextRequest, NextResponse } from 'next/server'

import pool from '@/libs/db'

import { FieldPacket, ResultSetHeader } from 'mysql2'

import { hash } from 'bcrypt'

// Funcion para registrar un nuevo usuario

export async function POST(req: NextRequest) {

    return registerUser(req)

}

async function registerUser(req: NextRequest) {

    const { username, email, role, password } = await req.json()

    console.log(username, email, role, password)

    if (!username || !email || !role || !password) {

        return NextResponse.json({ message: 'El usuario magico, email magico, el rol y la contraseña son necesarios.' }, { status: 400 })

    }

    try {

        const hashedPassword = await hash(password, 10)

        console.log(hashedPassword)

        const query = `INSERT INTO users (username, email, role, password) VALUES (?, ?, ?, ?)`

        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.execute(query, [username, email, role, hashedPassword])

        if (result.affectedRows === 0) {

            return NextResponse.json({ message: 'Ha ocurrido un error al registrar tu perfil.' }, { status: 500 })

        }

        return NextResponse.json({ message: 'Tu perfil ha sido registrado correctamente.' })

    } catch (error) {

        console.error('Database error:', error)
        return NextResponse.json({ message: 'Upss: Ha ocurrido un error inesperado.' }, { status: 500 })

    }

}