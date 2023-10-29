import axios from "../axios/axios";
import Swal from "sweetalert2";
import { Buffer } from "buffer";
import { SignUpType } from "../pages/auth/signUp/signUp";
import { AuthType } from "../pages/auth/signIn/signIn";

export function setCookie(name: string, value: string, daysToLive: number) {
  var cookie = name + "=" + encodeURIComponent(Buffer.from(value).toString('base64'));
  
  if(typeof daysToLive === "number") {
      cookie += "; max-age=" + (daysToLive*24*60*60 * 8);
      
      document.cookie = cookie;
  }
}

export function getCookie(name: string) {
  var cookieArr = document.cookie.split(";");

  for(var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
      if(name == cookiePair[0].trim()) {
        let value = decodeURIComponent(Buffer.from(cookiePair[1], 'base64').toString('utf-8'))
          return value
      }
  }
  console.log(null);
  return null;
}

export function auth(e: MouseEvent, data: AuthType) {
    e.preventDefault()
     axios.post('/auth/signIn', data)
     .then((res) => {
         console.log(res);
         setCookie('accessToken', res.data.accessToken, 1)
          setCookie('refreshToken', res.data.refreshToken, 7)
         axios.get('/users/getInfo', {headers: {Authorization: `Bearer ${res.data.accessToken}`}})
         .then((res2) => {
            
             console.log(res2);
             console.log(res2.data);
             localStorage.setItem('expiresIn', String(Date.now() + (3600 * 24 * 1000)))
             localStorage.setItem('role', res2.data.role)

            switch(res2.data.role){
                case 'user':
                  window.location.pathname = '/user-main'
                  break
                case 'volunteer':
                  return(
                    window.location.pathname = '/companyRepresentative'
                  )
                  default: 
                  break
              }
        })
         .catch((err3) => {
          console.log(err3);
                Swal.fire({
                     icon: 'error',
                     title: 'Ой',
                     text: `${err3.response.data.message}`,
                   })
             console.log(err3);
         })
     })
     .catch((err) => {
         console.log(err);
         Swal.fire({
          icon: 'error',
          title: 'Ой',
          text: `${err.response.data.message}`,
        })
     })
}

export function signUp(e: MouseEvent, data: SignUpType){
    e.preventDefault()
    axios.post('/auth/signUp', data)
    .then(res => {
        console.log(res.data);
        setCookie('accessToken', res.data.accessToken, 1)
        setCookie('refreshToken', res.data.refreshToken, 7)
        axios.get('/users/getInfo', {headers: {Authorization: `Bearer ${res.data.accessToken}`}})
         .then((res2) => {
            
             console.log(res2);
             console.log(res2.data);
             localStorage.setItem('expiresIn', String(Date.now() + (3600 * 24 * 1000)))
             localStorage.setItem('role', res2.data.role)

             window.location.pathname = '/user-main'

            // switch(res2.data.role){
            //     case 'user':
            //       window.location.pathname = '/user-main'
            //       break
            //     case 'volunteer':
            //       return(
            //         window.location.pathname = '/volunteerMain'
            //       )
            //       default: 
            //       break
            //   }
        })
         .catch((err3) => {
          console.log(err3);
                Swal.fire({
                     icon: 'error',
                     title: 'Ой',
                     text: `${err3.response.data.message}`,
                   })
             console.log(err3);
         })
    })
    
}