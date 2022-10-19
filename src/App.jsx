import React from "react";
import ReactDOM from "react-dom";

import {supabase} from './utils/supabaseClient.js'
import Form from './components/Form'
import List from './components/List'
import validation from './utils/validateInfo'
import "./App.css"

function App(){

  const [users, setUsers] = React.useState([]);
  const [form, setForm] = React.useState({
    name: "",
    surname: "",
    company: "",
    email: "",
    phone: "",
    tag: "",
    file: null,
    tags: [],
    selected: []
  });
  const [selected, setSelected] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [err, setErr] = React.useState({});
  const [notify, setNotify] = React.useState(false);
  const [tags, setTags] = React.useState([]);

  React.useEffect(()=>{
    loadData().then(value =>{
      setUsers(value)
    })
  },[])

  React.useEffect(()=>{
    if(notify){
      setTimeout(()=>{
        setNotify(false)
      },2000)
    }
  },[notify])

  React.useEffect(()=>{
    autocomplete().then(value=>{
      setUsers(value);
    })
  },[search])

  React.useEffect(()=>{
    if(search.length===0 && users.length === 0){
      loadData().then(value =>{
        setUsers(value)
      })
    }
  }, [users])

  async function autocomplete(){

    if(search.length === 0){
      let user = await supabase
      .from('user_table')
      .select('*')
      return user.data;
    }

    let user = await supabase
    .from('user_table')
    .select('*')
    .ilike('first_name','%'+search+'%')

    if(user.data.length === 0){
      user = await supabase
      .from('user_table')
      .select('*')
      .ilike('last_name','%'+search+'%')
    }

    if(user.data.length === 0){
      user = await supabase
      .from('user_table')
      .select('*')
      .ilike('company','%'+search+'%')
    }

    if(user.data.length === 0){
      user = await supabase
      .from('user_table')
      .select('*')
      .ilike('email','%'+search+'%')
    }

    if(user.data.length === 0){
      user = await supabase
      .from('user_table')
      .select('*')
      .ilike('phone','%'+search+'%')
    }

    // if(user.data.length === 0){
    //   user = await supabase
    //   .from('user_table')
    //   .select('*')
    //   .ilike('tag','%'+search+'%')
    // }

    if(user.data.length === 0){
      const allTags = [];
      let outTags = [];
      user = await supabase
        .from('user_table')
        .select('*')
      let tmp = user.data;
      for(let i=0;i<tmp.length;i++){
        for(let j=0;j<tmp[i].tag.length;j++){
          if(!allTags.includes(tmp[i].tag[j])){  
            allTags.push(tmp[i].tag[j])
          }     
        }
      }
      
      for(let i=0; i<allTags.length; i++){
        if(allTags[i].includes(search))
          outTags.push(allTags[i]);
      }

      user.data = [];
      for(let i=0; i<outTags.length; i++){
        let ids = [];
        for(let j=0; j<tmp.length; j++){
          if(tmp[j].tag.includes(outTags[i])){
            if(!user.data.includes(tmp[j]))
              user.data.push(tmp[j])
          }
        }
      }
    }
    
    return user.data;
  }

  async function loadData(){
    let user = await supabase
    .from('user_table')
    .select('*')
    return user.data;
  }

  async function addUser(user, file){

    const out = await supabase
    .rpc('add_user', user);

    console.log(out);

    for(let el in form.selected){
      const { data, error } = await supabase
      .from('collegato')
      .insert([
        { u_1: out.data[0], u_2: form.selected[el] },
      ])
    }

    if(file!==null){
      const img_path = `id${out.data[0]}_${Date.now()}.jpeg`;
      const f = await supabase.storage.from('avatars').upload(img_path, file);
      const fUrl = await supabase.storage.from('avatars').getPublicUrl(img_path);
      await supabase
        .from('user_table')
        .update({photo: fUrl.data.publicUrl})
        .eq('id', out.data[0])
    }

      setNotify(true);

  }

  async function submit(e){
    e.preventDefault();
    const user = [{first_name: form.name, last_name: form.surname, company: form.company, email: form.email, phone: form.phone, tag: form.tags}]
    console.log(user);
    let out = validation(form)
    setErr(out)

    if(Object.keys(out).length === 0){
      await addUser(user,form.file);
      setForm({
        name: "",
        surname: "",
        company: "",
        email: "",
        phone: "",
        tag: "",
        file: null,
        selected: [],
        tags: []
        });
    }   
  }

  function addTag(){
    setForm(prev => {
      const newArray = [];
      for(let i=0;i<prev.tags.length;i++){
        newArray.push(prev.tags[i]);
      }

      if(newArray.includes(form.tag))
        return {...prev, tags: newArray};
      
      newArray.push(`#${form.tag}`);
      return {
        ...prev,
        tag: "",
        tags: newArray
      }
    })
  }

  function deleteTag(val){
    setForm(prev => {
        return {...prev, tags: prev.tags.filter(el=>el!==val)};
    })
  }

  return(
    <div className="app">
      <div className="add__title">
        <h1 className="title">Add new user</h1>
        <a className="users__btn" href={`${location.origin}/users`}>users</a>
      </div>
      <div className="container">
        {notify && <div className="added">
            <span>User was added successfully</span>
          </div>}
          <Form deleteTag={deleteTag} addTag={addTag} err={err} setErr={setErr} submit={submit} form={form} change={setForm}/>
          <List search={setSearch} users={users} form={form} setForm={setForm}/>
      </div>
    </div>
  )
}
// ReactDOM.render(<App />, document.getElementById("app"));
class Mfe4Element extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<App/>, this);
  }
}

customElements.define('react-element', Mfe4Element);
