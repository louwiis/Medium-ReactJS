import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useAuth } from "../../providers/AuthStore";

function Navbar(props) {
  const { setToken, setUser } = useContext(useAuth);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { setShowModal, setModalMode } = props;

  return (
    <>    
      <div className="py-6 px-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
          <form className="space-y-6 w-[400px]" onSubmit={handleSubmit((data) => {
            fetch(`http://edu.project.etherial.fr/auth`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: data.email,
                password: data.password,
              }),
            })
              .then((response) => response.json())
              .then((data) => {        
                if (data.status === 200) {
                  setShowModal(false);
                  setToken(data.data.token);
                  localStorage.setItem('token', data.data.token);
        
                  fetch(`http://edu.project.etherial.fr/users/me`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${data.data.token}`,
                    },
                  })
                    .then((response) => response.json())
                    .then((data) => {        
                      if (data.status === 200) {
                        localStorage.setItem('user', JSON.stringify(data.data));
                        setUser(data.data);
                      }
                    }
                  );
                }
              }
            );
          })}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  {...register("email", { required: true })}
                />
                {errors.email && <span className="text-red-500 text-xs italic">Please enter your email.</span>}

              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  {...register("password", { required: true })}
                />
                {errors.password && <span className="text-red-500 text-xs italic">Please enter your password.</span>}
              </div>
              <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered? <span href="#" className="text-blue-700 hover:underline dark:text-blue-500" onClick={() => setModalMode('register')}>Create account</span>
              </div>
          </form>
      </div>        
    </>
  );
}

export default Navbar;