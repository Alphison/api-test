import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import style from "./home.module.css"


const Single = () => {
    const [services, setServices] = useState([])

    const params = useParams()
    const id = params.id

    const fetchServices = async () => {
        const response = await fetch(`https://exam.avavion.ru/api/services/${id}`)
        const data = await response.json()

        setServices(data.data)
    }

    useEffect(() => {
        fetchServices()
    }, [])

  return (
    <div>
        <div className={style.service}>
            <p>{services.name}</p>
            <div className={style.img}>
                <img src={services.image_url} alt="" />
            </div>
            <p>{services.content}</p>
            <NavLink to={`/`}>назад</NavLink>
        </div>
    </div>
  )
}

export default Single