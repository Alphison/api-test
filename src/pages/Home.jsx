import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import style from "./home.module.css"

const Home = () => {
    const [services, setServices] = useState([])

    const fetchServices = async () => {
        const response = await fetch("https://exam.avavion.ru/api/services")
        const data = await response.json()

        setServices(data.data)
    }

    useEffect(() => {
        fetchServices()
    }, [])


  return (
    <div>
        <div className={style.services}>
            {
                services.map((item) => {
                    return (
                        <div className={style.service}>
                            <p>{item.name}</p>
                            <div className={style.img}>
                                <img src={item.image_url} alt="" />
                            </div>
                            <p>{item.content}</p>
                            <NavLink to={`/single/${item.id}`}>перейти</NavLink>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Home