import { createContext, ReactNode, useContext, useReducer } from 'react'
import React from 'react'
type State = {
    currentStep: number
    name: string
    level: 0 | 1
    email: string
    github: string
    projectName:string,
    projectId:number,
    consultantId:number
    consultantName:string,

}

type Action = {
    type: FormActions
    payload: any
}

type ContextType = {
    state: State 
    dispatch: (action: Action) => void

}

type FormProviderProps = {
     children: ReactNode
}

// Context API
const FormContext = createContext<ContextType | undefined>(undefined)


const initialData: State = {
    currentStep: 0,
    name: '',
    level: 0,
    email: '',
    github: '',
    projectName:'',
    projectId:0,
    consultantId:0,
    consultantName:'',
}

// Context API

export enum FormActions {
    setLevel,
    setEmail,
    setGithub,
    setConsultantId,
    setProjectName,
    setProjectId,
    setConsultantName,
    setName
}

const formReducer = (state: State, action: Action) => {
    switch(action.type) {
        case FormActions.setName:
            return {...state, name: action.payload}
        case FormActions.setEmail:
            return {...state, email: action.payload}
        case FormActions.setGithub: 
            return {...state, github: action.payload}
        case FormActions.setProjectName: 
            return {...state, projectName: action.payload}
        case FormActions.setProjectId: 
            return {...state, projectId: action.payload}
        case FormActions.setConsultantId: 
            return {...state, consultantId: action.payload}
        case FormActions.setConsultantName: 
            return {...state, consultantName: action.payload}
        default:
            return state
    }
}
// Provider
export const FormProvider = ({children}: FormProviderProps) => {
    const [state, dispatch] = useReducer(formReducer, initialData)
    const value = {state, dispatch}

    return(
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    )
}
// Hooks Context
export const useForm = () => {
    const context = useContext(FormContext)
    if(context === undefined) {
        throw new Error('Use form Error')
    }
    return context
}