import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router";
import { SignUpForm } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, startSignUp } from "../../../store";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const SignUpPage = (): JSX.Element => {

  const { errorMessage } = useSelector((rootState: RootState) => rootState.authSlice);
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, formState, watch, reset } = useForm<SignUpForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    }
  });
  const { errors } = formState;

  // console.log(errors)

  const onSignUp: SubmitHandler<SignUpForm> = (data) => {
    console.log(data);
    dispatch(startSignUp({
      email: data.email,
      name: data.name,
      password: data.password
    }));
    reset({
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    });
  }

  useEffect(() => {
    if (errorMessage.trim().length !== 0) {
      Swal.fire('Register account Error!', errorMessage, 'error');
    }
  }, [errorMessage]);


  return (
    <div className="bg-gradient-primary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                <div className="col-lg-7">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit(onSignUp)}>
                      <div className="form-group row">
                        <div className="col-sm-12 mb-3 mb-sm-0">
                          <input
                            type="text"
                            className={`form-control form-control-user ${errors.name ? 'border border-danger' : ''}`}
                            id="exampleFirstName"
                            placeholder="Complete Name"
                            {...register('name', {
                              required: { value: true, message: 'Complete name is required' },
                              minLength: { value: 3, message: 'Complete name min length must be greather than 3 characters' },
                              maxLength: { value: 80, message: 'Complete name min length must be less than 80 characters' },
                            })}
                          />
                          {
                            errors.name && (
                              <div className="mt-1" role="alert">
                                <span className="text-danger">
                                  {errors.name.message}
                                </span>
                              </div>
                            )
                          }
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className={`form-control form-control-user ${errors.email ? 'border border-danger' : ''}`}
                          id="exampleInputEmail"
                          placeholder="Email Address"
                          {...register('email', {
                            required: { value: true, message: 'Email is required' }, pattern: { value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, message: 'Email does not appear valid' }
                          })}
                        />
                        {
                          errors.email && (
                            <div className="mt-1" role="alert">
                              <span className="text-danger">
                                {errors.email.message}
                              </span>
                            </div>
                          )
                        }
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="password"
                            className={`form-control form-control-user ${errors.password ? 'border border-danger' : ''}`}
                            id="exampleInputPassword"
                            placeholder="Password"
                            {...register('password', {
                              required: { value: true, message: 'Password is required' },
                              minLength: { value: 6, message: 'The password should to be greather or equals than six characters' },
                            })}
                          />
                          {
                            errors.password && (
                              <div className="mt-1" role="alert">
                                <span className="text-danger">
                                  {errors.password.message}
                                </span>
                              </div>
                            )
                          }
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="password"
                            className={`form-control form-control-user  ${errors.password ? 'border border-danger' : ''}`}
                            id="repeatPassword"
                            placeholder="Repeat Password"
                            {...register('repeatPassword', {
                              required: { value: true, message: 'Repeat password is required' },
                              minLength: { value: 6, message: 'The password should to be greather or equals than six characters' },
                              validate: (value) => {
                                if (value === watch("password")) return true;
                                return "The passwords are not equals";
                              }
                            })}
                          />
                          {
                            errors.repeatPassword && (
                              <div className="mt-1" role="alert">
                                <span className="text-danger">
                                  {errors.repeatPassword.message}
                                </span>
                              </div>
                            )
                          }
                        </div>
                      </div>
                      <button className="btn btn-primary btn-user btn-block" type="submit">
                        Register Account
                      </button>
                      <hr />
                      <button className="btn btn-google btn-user btn-block">
                        <i className="fab fa-google fa-fw"></i> Register with Google
                      </button>
                      <pre>
                        { JSON.stringify(watch(), null, 2) }
                      </pre>
                    </form>
                    <hr />
                    <div className="text-center">
                      <a className="small" href="forgot-password.html">Forgot Password?</a>
                    </div>
                    <div className="text-center">
                      <Link className="small" to="/auth/sign-in">Already have an account? Login!</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
