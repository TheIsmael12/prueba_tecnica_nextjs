export interface User {

    id?: string
    username: string
    email: string
    role: string
    description?: string

}

export interface AddUser {

    username: string
    email: string
    role: string
    password: string

}