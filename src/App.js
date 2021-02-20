import './App.css';
import {useForm, Controller} from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// wait simule un envoi async et active disabel btn submit via isSubmitting
const wait = function(duration = 1000) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration)
  })
}

function App() {
  const {register, handleSubmit, formState, errors, control} = useForm({ mode : 'onTouched' })
  const {isSubmitting, isSubmitSuccessful} = formState


  const onSubmit = async data => {
    await wait(2000)
    console.log("data", data)
  }


  return (
    <form className="container py-5" onSubmit={handleSubmit(onSubmit)}>
      <h1>Inscription</h1>
      {isSubmitSuccessful && <div className="alert alert-success"> Merci pour votre inscription</div>}
      <div className="row">
          <div className='col-md-6 form-group'> 
            <label htmlFor="username">Username</label>
            <input 
              placeholder="Pseudo"
              type="text" 
              className="form-control" 
              id="username"
              name="username"
              ref={register({required:"Veuillez rentrer un noms d'utilisateur"})}
             />
             {errors.username && <span>{errors.username.message}</span>}
          </div>
          <div className='col-md-6 form-group'> 
            <label htmlFor="email">email</label>
            <input 
              placeholder="mail@gmail.com"
              type="email" 
              className="form-control" 
              id="email"
              name="email"
              ref={register({required:"votre email n'est pas valide"})}
              />
              {errors.email && <span>{errors.email.message}</span>}
          </div>
        </div>
        <div className="row">
          <div className='col-md-6 form-group'> 
            <label htmlFor="password">password</label>
            <input 
                type="password" 
                className="form-control" 
                id="password"
                name="password"
                ref={register({required:"votre mot de passe n'st pas valide", minLength:{value: 3, message: "vous devez entrer minimum 10 caractères"}})}
            />              
            {errors.password && <span>{errors.password.message}</span>}
           
          </div>
          <div className='col-md-6 form-group'> 
          
          <label>date de naissance</label><br></br>
          <Controller
          // peux également utiliser " as "  => https://react-hook-form.com/api#control
            control={control}
            name= "birthday"
            defaultValue=""
            render={(
              { onChange, onBlur, value },
            ) => (
              <DatePicker
                selected={value}
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
          />
          </div>
       
          <button disabled={isSubmitting} className="btn btn-primary">S'inscrire</button>
      </div>
    </form>
  );
}

export default App;