import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

import { SignInForm } from "../interfaces";
import { AppDispatch, RootState, startSignIn } from "../../../store";
import Swal from "sweetalert2";

export const SignInPage = (): JSX.Element => {

  const dispatch = useDispatch<AppDispatch>();
  const { errorMessage } = useSelector((state: RootState) => state.authSlice);

  // console.log({authStatus, errorMessage});

  const { register, handleSubmit, formState, reset } = useForm<SignInForm>({
    defaultValues: {
      email: 'bmorningstar2@gmail.com',
      password: 'asd.456',
    }
  });

  const { errors } = formState;

  const onSignIn: SubmitHandler<SignInForm> = (data) => {
    // console.log(data);
    // Thunk called
    dispatch(startSignIn(data));
    reset({
      email: '',
      password: '',
    });
  }

  useEffect(() => {
    if (errorMessage.trim() !== '') {
      Swal.fire('Sign In Error!', errorMessage, 'error');
    }
  }, [errorMessage]);


  return (
    <div className="bg-gradient-primary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form className="user" onSubmit={handleSubmit(onSignIn)}>
                        <div className="form-group">
                          <input 
                            type="email" 
                            className="form-control form-control-user" 
                            id="email" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter Email Address..."
                            {...register('email', {
                              required: { value: true, message: 'The email is required' },
                              pattern: { value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, message: 'Email does not appear valid' }
                            })}
                          />
                          {
                            errors.email && (
                              <div className="mt-1">
                                <span className="text-danger">
                                  {errors.email.message}
                                </span>
                              </div>
                            )
                          }
                        </div>
                        <div className="form-group">
                          <input 
                            type="password" 
                            className="form-control form-control-user" 
                            id="exampleInputPassword" 
                            placeholder="Password" 
                            {...register('password', {
                              required: { value: true, message: 'The password is required' }
                            })}
                          />
                          {
                            errors.password && (
                              <div className="mt-1">
                                <span className="text-danger">
                                  {errors.password.message}
                                </span>
                              </div>
                            )
                          }
                        </div>
                        {/* <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input type="checkbox" className="custom-control-input" id="customCheck" />
                            <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                          </div>
                        </div> */}
                        <button type="submit" className="btn btn-primary btn-user btn-block">
                          Login
                        </button>
                        <hr />
                        <a href="index.html" className="btn btn-google btn-user btn-block">
                          <i className="fab fa-google fa-fw"></i> Login with Google
                        </a>
                      </form>
                      <hr />
                      <div className="text-center">
                        <a className="small" href="forgot-password.html">Forgot Password?</a>
                      </div>
                      <div className="text-center">
                        <Link className="small" to="/auth/sign-up">Create an Account!</Link>
                      </div>
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
