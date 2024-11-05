import {lazy,Suspense} from 'react'
import {Routes,Route} from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import PublicRoutes from './publicRoutes'

const Login=lazy(()=>import('../pages/login'))
const Signup=lazy(()=>import('../pages/signup'))
const Header=lazy(()=>import('../pages/Guest/Header'))
const Footer=lazy(()=>import('../pages/Guest/Footer'))
const OtpFields=lazy(()=>import('../pages/Otp-verification'))
const ForgotPassword=lazy(()=>import('../pages/ForgotPassword'))
const ResetPassoword=lazy(()=>import('../pages/PasswordReset'))

export default function AuthRoutes() {
  return (
    <>
    <Suspense fallback={<Loader/>}>
    <Routes>
      <Route element={<PublicRoutes/>}>
        <Route path='/' element={<><Header/><Login/><Footer/></>}/>
        <Route path='/signup' element={<><Header/><Signup/><Footer/></>}/>
        <Route path='/Otpverification' element={<><Header/><OtpFields/><Footer/></>}/>
        <Route path='/forgotPassword' element={<><Header/><ForgotPassword/><Footer/></>} />
        <Route path='/passwordReset' element={<><Header/><ResetPassoword/><Footer/></>} />
        </Route>
    </Routes>
    </Suspense>
    </>
  )
}

