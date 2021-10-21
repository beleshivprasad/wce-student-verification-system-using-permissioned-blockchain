import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'


const initialState = {
    fname: '',
    lname: '',
    prn: '',
    dob: '',
    cpi:'',
    err: '',
    success: ''
}

function Verify() {
    
    const auth = useSelector(state => state.auth)

    const {userinfo, isLogged} = auth
    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()

    const {fname, lname,prn,dob,cpi,err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/verify', {fname, lname,prn,dob,cpi})
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            history.push("/")

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }



    return (
        <div className="login_page">
            <h2>Verify</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="fname">First Name</label>
                    <input type="text" placeholder="Student First Name:	" id="fname"
                    value={fname} name="fname" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" placeholder="Student Last Name:	" id="lname"
                    value={lname} name="lname" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="prn">Roll No</label>
                    <input type="text" placeholder="Enter PRN" id="prn"
                    value={prn} name="prn" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" placeholder="Enter Date of Birth" id="dob"
                    value={dob} name="dob" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="dob">CPI</label>
                    <input type="text" placeholder="Enter CGPA" id="cpi"
                    value={dob} name="cpu" onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="program">Choose Program:</label>
                    <select id="program" onChange={handleChangeInput}>
                        <option value="Diploma">Diploma</option>
                        <option value="Degree">Degree</option>
                    </select>
                </div>
                <div className="row">
                    <button type="submit">Submit</button>
                    {
                        isLogged ? <span></span> : <span><Link to="/login"> Login First</Link></span>
                    }
                </div>
            </form>
        </div>
    )
}

export default Verify
