// import React, { useState, useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { message } from 'antd';

// const Header = () => {
//     const [loginUser, setLoginUser] = useState('')
//     const navigate = useNavigate()
//     useEffect(() => {
//         const user = JSON.parse(localStorage.getItem('user'))
//         if (user) {
//             setLoginUser(user)
//         }
//     }, [])

//     const logoutHandler = () => {
//         localStorage.removeItem("user")
//         message.success("Logout Successfully")
//         navigate('/login')
//     }
//     return (
//         <><nav class="navbar navbar-expand-lg bg-body-tertiary">
//             <div class="container-fluid">
//                 <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
//                     <span class="navbar-toggler-icon"></span>
//                 </button>
//                 <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
//                     <Link class="navbar-brand" to="/">FinTrack</Link>
//                     <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
//                         <li class="nav-item">
//                             <p className='nav-link'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>{loginUser && loginUser.name}</p>

//                         </li>
//                         <li class="nav-item">
//                             <button className='logout-button' onClick={logoutHandler}>Logout</button>

//                         </li>

//                     </ul>


//                 </div>
//             </div>
//         </nav></>
//     )
// }

// export default Header

import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd';

const Header = () => {
    const [loginUser, setLoginUser] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            setLoginUser(user)
        }
    }, [])

    const logoutHandler = () => {
        localStorage.removeItem("user")
        message.success("Logout Successfully")
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link className="navbar-brand" to="/">FinTrack</Link>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item d-flex align-items-center">
                            <p className='nav-link mb-0 d-flex align-items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round me-2">
                                    <circle cx="12" cy="8" r="5" />
                                    <path d="M20 21a8 8 0 0 0-16 0" />
                                </svg>
                                {loginUser && loginUser.name}
                            </p>
                        </li>
                        <li className="nav-item ms-3">
                            <button className='btn btn-outline-danger' onClick={logoutHandler}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header
