import * as C from './styles'
import { Theme } from '../../components/Theme/intex'
import {useForm} from '../../context/FormContext'
import {ReactComponent as CheckIcon} from '../../svgs/check.svg'
import React from 'react'

export const FormStep4 = () => {
    const {state} = useForm()



    return(
        <Theme>
            <C.Container>
                
                <h2>Finish</h2>
                <p>Finito!</p>

                <C.IconArea>
                   <CheckIcon fill="rgb(91, 24, 153)" width={120} height={120}/>
                </C.IconArea>

                <p className='check-email'>Tilsendt på e-mail: <b>{state.email}</b>. Vedlegget inneholder tilhørende Team og info</p>
                

            </C.Container>
        </Theme>
    )
}