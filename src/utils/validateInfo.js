export default function validation(val){

    let errs = {}

    if(!val.name.trim()){
        errs.name = 'Name is required'
    }

    if(!val.surname.trim()){
        errs.surname = 'Surname is required'
    }

    if(!val.email.trim()){
        errs.email = 'Email is required'
    }else if (!/\S+@\S+\.\S+/.test(val.email)){
        errs.email = 'Email is invalid'
    }

    return errs;
}