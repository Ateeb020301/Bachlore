import * as C from './styles'
import {useNavigate} from 'react-router-dom'
import { useForm, FormActions } from '../../context/FormContext'
import { Theme } from '../../components/Theme/intex'
import { ChangeEvent, useEffect } from 'react'
import React from 'react'
import { Input } from 'reactstrap'
import { FormStep2 } from '../FormStep2'


export const FormStep1 = () => {
    

    const navigate = useNavigate()
    const { state, dispatch} = useForm()

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: FormActions.setName,
            payload: e.target.value 

        })
    }

    const handleNextStep = () =>{
        if(state.name !== '') {
            navigate('./step2')
        } else{
            alert('Feil')
        }

    }

    useEffect(()=>{
        dispatch({
            type: FormActions.setCurrentStep,
            payload: 1
        })

    },[])


    return(
        <Theme>
            <C.Container>
                <p className='passo'>Passo 1/3</p>
                <h2>Skriv inn Navn</h2>
                <p>Både fornavn og etternavn</p>

                <label>Navn </label>
                <Input 
                    type="text" 
                    autoFocus
                    onChange={handleNameChange}
                    
                    />
                    
                <button onClick={handleNextStep}>Fortsett</button>
            </C.Container>
        </Theme>
    )
}