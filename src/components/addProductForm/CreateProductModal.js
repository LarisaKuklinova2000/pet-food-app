import { useRef } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setShowModal} from '../filterPanel/filtersSlice'
import {useCreateProductMutation} from '../../api/apiSlice'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { CSSTransition } from 'react-transition-group'
import './createProductModal.scss'

const CreateProductModal = () => {

    const {showModal} = useSelector(state => state.filters)
    const {token} = useSelector(state => state.regInfo)
    const nodeRef = useRef(null)
    const dispatch = useDispatch()

    const [createProduct] = useCreateProductMutation()

    return (
        <CSSTransition 
            classNames='overlay'
            nodeRef={nodeRef}
            in={showModal}
            timeout={300}
            unmountOnExit>
            <div 
                className='overlay'
                ref={nodeRef}
                >
                <div className="modal">
                    <h1>Создание нового товара</h1>
                    <p>пожалуйста, заполните форму создания нового товара</p>
                    <i 
                        className="fa-regular fa-circle-xmark"
                        onClick={() => {
                            dispatch(setShowModal())
                            document.body.style.overflow = 'visible'
                            }}></i>
                    <Formik
                        initialValues={{
                            name: '',
                            pictures: '',
                            description: '',
                            price: '',
                            discount: '',
                            stock: '',
                            wight: ''

                        }}
                        validationSchema = {Yup.object({
                            description: Yup.string().required('поле обязательно для заполнения'),
                            discount: Yup.number().typeError('должно быть число'),
                            name: Yup.string().required('поле обязательно для заполнения'),
                            pictures: Yup.string().required('поле обязательно для заполнения'),
                            price: Yup.number().required('поле обязательно для заполнения').typeError('должно быть число'),
                            stock: Yup.number().required('поле обязательно для заполнения').typeError('должно быть число'),
                            wight: Yup.string().required('поле обязательно для заполнения')
                        })}
                        onSubmit={(values, {resetForm}) => {
                            createProduct([token, values]).unwrap()
                                .then(() => {
                                    resetForm()
                                    dispatch(setShowModal())
                                    document.body.style.overflow = 'visible'
                                })
                                .catch(() => alert('создание продукта не удалось, попробуте снова'))
                        }}
                    >
                        <Form>
                            <label htmlFor="name"><b>Название продукта</b></label>
                            <Field 
                                className="modal__input"
                                placeholder="введите название продукта"
                                name="name"
                                id='name'
                            />
                            <ErrorMessage className="error" name='name' component='div'/>

                            <label htmlFor="pictures"><b>Изображение продукта</b></label>
                            <Field 
                                className="modal__input"
                                placeholder="ссылка на изображение"
                                name="pictures"
                                id='pictures'
                            />
                            <ErrorMessage className="error" name='pictures' component='div'/>

                            <label htmlFor="description"><b>Описание продукта</b></label>
                            <Field 
                                className="modal__input"
                                placeholder="опишите продукт"
                                name="description"
                                id='description'
                                as='textarea'
                            />
                            <ErrorMessage className="error" name='description' component='div'/>

                            <label htmlFor="price"><b>Цена</b></label>
                            <Field 
                                className="modal__input"
                                placeholder="цена за штуку"
                                name="price"
                                id='price'
                            />
                            <ErrorMessage className="error" name='price' component='div'/>

                            <label htmlFor="discount"><b>Скидка</b></label>
                            <Field 
                                className="modal__input"
                                placeholder="размер скидки в процентах"
                                name="discount"
                                id='discount'
                            />
                            <ErrorMessage className="error" name='discount' component='div'/>

                            <label htmlFor="stock"><b>Сколько в наличии</b></label>
                            <Field 
                                className="modal__input"
                                placeholder="едениц в наличии"
                                name="stock"
                                id='stock'
                            />
                            <ErrorMessage className="error" name='stock' component='div'/>

                            <label htmlFor="wight"><b>Вес еденицы</b></label>
                            <Field 
                                className="modal__input"
                                placeholder="вес еденицы"
                                name="wight"
                                id='wight'
                            />
                            <ErrorMessage className="error" name='wight' component='div'/>

                            <button className="registerbtn" type="submit">Добвавить товар</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </CSSTransition>
    )
}

export default CreateProductModal