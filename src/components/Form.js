import React from 'react';
import validation from '../utils/validateInfo.js'

export default function Form(props){

    function changeForm(e){
        props.change(prev => ({
            ...prev,
            [e.target.name]: e.target.type=='file'? e.target.files[0] : e.target.value
        }))
    }
        React.useEffect(()=>{
            if(props.form.email.length>0){
                let out = validation(props.form)
                if(out.email!==undefined)
                    props.setErr(prev => {
                        return {...prev, email: out.email};
                });
                else
                    props.setErr(prev => {
                        return {...prev, email: undefined}
                    })
            }
        }, [props.form])
    
    const tags = props.form.tags.map(el => <span key={el}>{el} <div className="delete__tag" onClick={()=>props.deleteTag(el)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                          </svg>
        </div>
        </span>)

    function deletePhoto(){

        props.change(prev=>{
            return {
                ...prev,
                file: null
            }
        })
    }

    

    return (
        <form className="add__form" onSubmit={(e) => props.submit(e)}>
            <h2 className="add__form__title">User's information</h2>
            <p className="form__description"><span style={{color: 'red'}}>*</span>required fields</p>
            <p>Name<span style={{color: 'red'}}>*</span>:</p>
            <input onChange={changeForm} value={props.form.name} name="name" type="text"></input>
            {props.form.name.length==0&&props.err.name!==undefined?<div className="err__msg">{props.err.name}</div>:''}
            <p>Surname<span style={{color: 'red'}}>*</span>:</p>
            <input onChange={changeForm} value={props.form.surname} name="surname" type="text"></input>
            {props.form.surname.length==0&&props.err.surname!==undefined?<div className="err__msg">{props.err.surname}</div>:''}
            <p>Company:</p>
            <input onChange={changeForm} value={props.form.company} name="company" type="text"></input>
            <p>Email<span style={{color: 'red'}}>*</span>:</p>
            <input onChange={changeForm} value={props.form.email} name="email" type="email"></input>
            {props.form.email.length==0&&props.err.email!==undefined?<div className="err__msg">{props.err.email}</div>:''}
            {props.form.email.length>0&&props.err.email!==undefined?<div className="err__msg">{props.err.email}</div>:''}
            <p>Phone:</p>
            <input onChange={changeForm} value={props.form.phone} name="phone" type="text"></input>
            <p>Tag:</p>
            <div className="tags">
                <input className="input__tags" onChange={changeForm} value={props.form.tag} name="tag" type="text"></input>
                <div onClick={props.addTag} className="add__tag">add tag</div>
            </div>
            {props.form.tags.length !== 0 && 
            <div className="show__tags">
                {tags}
            </div>
            }
            <div className="photo">
            <label htmlFor="file" className="upload__file">
                upload photo {props.form.file?
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
</svg> : ''}
            </label>
            {props.form.file?
            <svg onClick={deletePhoto} style={{cursor: 'pointer'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>
          : ''
            }
            
            <input name="file" onChange={changeForm} style={{display: 'none'}} id="file" type="file" accept="image/*"/>
            </div>

            <button type="submit">add</button>
        </form>
    )
}