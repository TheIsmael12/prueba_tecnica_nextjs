export interface CreaturesAdd {

    name: string,
    type: string,
    power_level: number,
    trained?: number

}

export interface Creatures extends CreaturesAdd {

    id: string,
    user_id?: string,

}

export interface CreaturesUpdate extends CreaturesAdd {

    id: string

}