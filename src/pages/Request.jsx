import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2"

const Request = () => {
    const [from, setForm] = useState({
        email: "",
        full_name: "",
        message: "",
        service_id: 0
    })

    const [services, setServices] = useState([])

    const fetchServices = async () => {
        const response = await fetch("https://exam.avavion.ru/api/services")
        const data = await response.json()

        setServices(data.data)
    }

    useEffect(() => {
        fetchServices()
    }, [])

    const onSubmitHandle = (e) => {
        e.preventDefault()
    }

    const onChangeForm = (e) => {
        setForm((prevState) => {
            prevState = {...prevState}

            prevState[e.target.name] = e.target.value.trim()

            return prevState
        })
    }

    const sendRequest = async (body) => {
        const response = await fetch("https://exam.avavion.ru/api/requests/create", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',  
              'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const data = await response.json()
        console.log(data)

        if(data.status === true){
            return(
                Swal.fire(
                    {
                        icon: 'success',
                        title: data.message
                    }
                )
            )
        }

        return Swal.fire(
            {
                icon: 'error',
                title: data.message
            }
        )
    }

    const onClickHandle = (e) => {
        e.preventDefault
        sendRequest(from)
    }

    const onChangeSelectForm = (e) => {
        setForm((prevState) => {
            prevState = {...prevState}

            prevState[e.target.name] = e.target.options[e.target.selectedIndex].value

            return prevState
        })
    }

    return (
    <div>
        <form onSubmit={onSubmitHandle.bind(this)}>
            <div className="form-group">
                <label htmlFor="email">Электронная почта</label>
                <input onChange={onChangeForm.bind(this)} value={from.email} type="email" name='email' id='email'/>
            </div>

            <div className="form-group">
                <label htmlFor="full_name">ФИ</label>
                <input onChange={onChangeForm.bind(this)} value={from.full_name} type="text" name='full_name' id='full_name'/>
            </div>

            <div className="form-group">
                <label htmlFor="full_name">Сообщение</label>
                <textarea onChange={onChangeForm.bind(this)} name="message" id="message" cols="30" rows="10">{from.message}</textarea>
            </div>

            <div className="form-group">
                <label htmlFor="full_name">Выберите услугу</label>
                <select onChange={onChangeSelectForm.bind(this)} name='service_id' id='service'>
                    {
                        services.map((item) => {
                            return (
                                <option value={item.id} key={services.id}>{item.name}</option>
                            )
                        })
                    }
                   
                </select>
            </div>

            <button onClick={onClickHandle.bind(this)}>Отправить сообщение</button>
        </form>
    </div>
  )
}

export default Request