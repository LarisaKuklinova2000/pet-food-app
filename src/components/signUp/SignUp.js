import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Navigate } from "react-router-dom";
import { useSignUpMutation, useSignInMutation } from '../../api/apiSlice'
import { changeToken, changeMyInfo } from "./signSlice";
import './signUp.scss'

const SignUp = () => {

    const dispatch = useDispatch();
    const {token} = useSelector(state => state.regInfo)

    const [email, setEmail] = useState("");
    const [group, setGroup] = useState("");
    const [password, setPassword] = useState("");

    const [signUp] = useSignUpMutation()
    const [signIn] = useSignInMutation()

    const regForm = 
        <>
        <div className="form__wrapper">
                <h1>Регистрация</h1>
                <p>пожалуйста, заполните форму создания аккаунта</p>

                <label htmlFor="email"><b>Почта</b></label>
                <input 
                    className="signInput" 
                    type="text" 
                    placeholder="введите почту" 
                    name="email" 
                    required
                    onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="group"><b>Ваша группа</b></label>
                <input 
                    className="signInput" 
                    type="text" 
                    placeholder="введите Вашу группу" 
                    name="group" 
                    required
                    onChange={(e) => setGroup(e.target.value)} />

                <label htmlFor="password"><b>Пароль</b></label>
                <input 
                    className="signInput"
                    placeholder="введите пароль" 
                    name="password" 
                    required
                    onChange={(e) => setPassword(e.target.value)} />

                <button 
                    type="submit" 
                    className="registerbtn"
                    onClick={(e)=> {
                        e.preventDefault();
                        signUp({email: email, group: group, password: password}).unwrap()
                            .then(() => {
                                document.querySelector('.form__wrapper').style.display = 'none'
                                document.querySelector('.authorization__wrapper').style.display = 'block'
                            })
                            .catch(() => alert('регистрация не удаласьб попробуйте ещё раз'))
                            .finally(() => document.querySelector('.signUpForm').reset())
                    }}
                    >регистрация</button>
                
                <div className="container signin">
                    <p>Уже есть аккаунт? 
                        <button
                            type="button"
                            onClick={() => {
                                document.querySelector('.form__wrapper').style.display = 'none';
                                document.querySelector('.authorization__wrapper').style.display = 'block' 
                            }
                        }> войдите</button>
                    </p>
                </div>

            </div>

            <div className="authorization__wrapper">
                <h1>Авторизация</h1>
                <p>пожалуйста, заполните форму авторизации</p>

                <label htmlFor="email"><b>Почта</b></label>
                <input 
                    className="signInput" 
                    type="text" 
                    placeholder="введите почту" 
                    name="email" 
                    required
                    onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password"><b>Пароль</b></label>
                <input 
                    className="signInput"
                    placeholder="введите пароль" 
                    name="password" 
                    required
                    onChange={(e) => setPassword(e.target.value)}/>

                <button 
                    type="submit" 
                    className="registerbtn"
                    onClick={(e) => {
                        e.preventDefault();
                        signIn({email: email, password: password}).unwrap()
                            .then((res) => {
                                dispatch(changeToken(res.token))
                                dispatch(changeMyInfo(res.data))
                                localStorage.setItem('token', res.token)
                                localStorage.setItem('id', res.data._id)
                                localStorage.setItem('myInfo', JSON.stringify(res.data))
                            })
                            .catch(() => alert('Вы ввели неправильную почту или пароль'))
                            .finally(() => document.querySelector('.signUpForm').reset())
                    }}
                    >авторизация</button>

                <div className="container signin">
                    <p>Вернуться к регистрации? 
                        <button
                            type="button"
                            onClick={() => {document.querySelector('.form__wrapper').style.display = 'block';
                                            document.querySelector('.authorization__wrapper').style.display = 'none' 
                        }}> возвращаемся</button>
                    </p>
                </div>
            </div>
        </>

    
    return (
        <form className="signUpForm" action="">
            {token? <Navigate to='/catalog' />: regForm}
        </form>
    )
}

export default SignUp;