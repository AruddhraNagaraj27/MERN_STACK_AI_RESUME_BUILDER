import { Lock, Mail, User2Icon } from 'lucide-react';
import React from 'react';
import api from '../configs/api';
import { useDispatch } from 'react-redux';
import { login, login as loginAction } from '../app/features/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {

  const query = new URLSearchParams(window.location.search);
  const urlstate = query.get("state");

  // login or register mode
  const [state, setState] = React.useState(urlstate || "login");

  // form data
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ➤ Submit handler (API + Redux + Navigation)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let response;

      if (state === "login") {
        response = await api.post("/api/users/login", {
          email: data.email,
          password: data.password
        });
      } else {
        response = await api.post("/api/users/register", {
          name: data.name,
          email: data.email,
          password: data.password
        });
      }

      // Save token
      localStorage.setItem("token", response.data.token);

      // Update Redux
      dispatch(
        loginAction({
          token: response.data.token,
          user: response.data.user
        })
      );

      // Redirect to dashboard
      navigate("/app");
      toast.success(response.data.message);

    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-[350px] text-center border border-zinc-300/60 dark:border-zinc-700 rounded-2xl px-8 bg-white dark:bg-zinc-900"
      >
        <h1 className="text-zinc-900 dark:text-white text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Register"}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 pb-6">
          Please {state === "login" ? "sign in" : "sign up"} to continue
        </p>

        {state !== "login" && (
          <div className="flex items-center w-full mt-4 bg-white dark:bg-zinc-800 
            border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full 
            overflow-hidden pl-6 gap-2">
            <User2Icon size={16} color='#6B7280' />
            <input
              type="text"
              placeholder="Name"
              className="bg-transparent text-zinc-600 dark:text-zinc-200 
                placeholder-zinc-500 dark:placeholder-zinc-400 outline-none 
                text-sm w-full h-full"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          </div>
        )}

        <div className="flex items-center w-full mt-4 bg-white dark:bg-zinc-800 border 
          border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden 
          pl-6 gap-2">
          <Mail size={13} color='#6B7280' />
          <input
            type="email"
            placeholder="Email id"
            className="bg-transparent text-zinc-600 dark:text-zinc-200 
              placeholder-zinc-500 dark:placeholder-zinc-400 outline-none 
              text-sm w-full h-full"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-white dark:bg-zinc-800 border 
          border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden 
          pl-6 gap-2">
          <Lock size={13} color='#6B7280' />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent text-zinc-600 dark:text-zinc-200 
              placeholder-zinc-500 dark:placeholder-zinc-400 outline-none 
              text-sm w-full h-full"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="mt-5 text-left">
          <a className="text-sm text-green-500 dark:text-green-400" href="#">
            Forgot password?
          </a>
        </div>

        <button type="submit" 
          className="mt-2 w-full h-11 rounded-full text-white 
          bg-green-500 hover:opacity-90 transition-opacity">
          {state === "login" ? "Login" : "Create Account"}
        </button>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3 mb-11">
          {state === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            type="button"
            className="text-green-500 dark:text-green-400"
            onClick={() => setState(prev => prev === "login" ? "register" : "login")}
          >
            {state === "login" ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login
