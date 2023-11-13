export interface User {
    id?:number,
    name:String,
    password:String
}


export interface Todo {
    id?: number,
    todo: String,
    userId:number
}
