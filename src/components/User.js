import React from 'react';

export default function User(props){

    const data = props.data;

    const [select, setSelect] = React.useState(false);

    React.useEffect(()=>{
        setSelect(props.form.selected.includes(data.id));
    },[props.form])
    

    function selectToggle(){
        if(select){
            setSelect(false);
            props.setForm(prev => {
                return {...prev, selected: prev.selected.filter(el=>el!==data.id)}
            })
        }else{
            setSelect(true)
            const oldArr = props.form.selected;
            const newArr = [];
            oldArr.map(el=>{
                newArr.push(el)
            });
            newArr.push(data.id);

            props.setForm(prev => {
                return {...prev,
                selected: newArr
            }
            })
        }
    }


    return(
        <div className={`list__item ${select?'selected':''}`} onClick={selectToggle}>
            <h3>User id: {data.id}</h3>
            <p><span><b>Name:</b> {data.first_name}</span> <span><b>Surname:</b> {data.last_name}</span></p>
            <p><span><b>Company:</b> {data.company}</span> <span><b>Email:</b> {data.email}</span></p>
            <p><span><b>Phone:</b> {data.phone}</span> <span><b>Tag:</b> {data.tag}</span></p>
        </div>
    )
}