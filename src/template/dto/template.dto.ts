export interface TemplateDto {
    _id : string
    title : string
    content : string
    resume : string
    // userId : string
    isDeleted : boolean
}

export interface CreateTemplateDto {
    // _id : string
    title : string
    content : string
    resume ?: File 
}