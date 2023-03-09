import * as C from './styles'
import {useNavigate, Link} from 'react-router-dom'
import { Theme } from '../../components/Theme/intex'
import { SelectOption } from '../../components/SelectOption'
import {useForm, FormActions} from '../../context/FormContext'
import {useEffect} from 'react'
import React from 'react'


export const FormStep2 = () => {
    const {state, dispatch} = useForm()
    const navigate = useNavigate();

    const handleNextStep = () => {
        navigate('../step3')
    }

    useEffect(()=>{
        if(state.name === '') {
            navigate('/')
        } else{
            dispatch({
                type: FormActions.setCurrentStep,
                payload: 2
            })
        }
        

    },[])

    const setLevel = (level: number) => {
        dispatch({
            type: FormActions.setLevel,
            payload: level 
        })

    }

    return(
        <Theme>
            <C.Container>
            <p className='passo'>Passo 2/3</p>
            <h2>{state.name}, Velg Team for å fortsette</h2>
            <p>Velg et team du mener er best egnet</p>

            <SelectOption
            title="Team 1"
            description="Team bestående av 3-4 konsulenter"
            icon="🥳"
            selected={state.level === 0}
            onClick={()=>setLevel(0)}
            />

             <SelectOption
                    title="Team 2"
                    description="Team beståenden av 2 konsulenter"
                    icon="😎"
                    selected={state.level === 1}
                    onClick={()=>setLevel(1)}
                />

            <div>
                {/* <Link to='/step3'>Voltar</Link> */}
                <button onClick={handleNextStep}>Fortsett</button>
            </div>


            </C.Container>
        </Theme>
    )
}