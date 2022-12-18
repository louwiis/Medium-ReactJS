import { useForm } from "react-hook-form";

function Navbar(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setShowModal, setModalMode } = props;

  return (
    <>    
      <div className="py-6 px-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign up to our platform</h3>
          <form className="space-y-6 w-[400px]" action="#" onSubmit={handleSubmit((data) => {
            fetch(`http://edu.project.etherial.fr/users`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                password: data.password,
                password_verif: data.password_verif,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.status === 201) {
                  setShowModal(false);
                }
              }
            );
          })}>
            <div>
                <label for="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your firstname</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="John"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  {...register("firstname", { required: true })}
                />
                {errors.firstname && <p className="text-red-500 text-xs italic">Please enter your firstname.</p>}
            </div>
            <div>
                <label for="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your lastname</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Doe"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  {...register("lastname", { required: true })}
                />
                {errors.lastname && <p className="text-red-500 text-xs italic">Please enter your lastname.</p>}
            </div>
            <div>
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                />
                {errors.email && <p className="text-red-500 text-xs italic">Please enter your email.</p>}
                {errors.email?.type === "pattern" && <p className="text-red-500 text-xs italic">Please enter a valid email.</p>}
            </div>
            <div>
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  {...register("password", { required: true })}
                />
                {errors.password && <p className="text-red-500 text-xs italic">Please enter your password.</p>}
            </div>
            <div>
                <label for="passwordConfirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password confirmation</label>
                <input
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  {...register("password_verif", { required: true })}
                />
                {errors.password_verif && <p className="text-red-500 text-xs italic">Please enter your password confirmation.</p>}
            </div>
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Already have an account? <span className="text-blue-700 hover:underline dark:text-blue-500" onClick={() => setModalMode('login')}>Login</span>
            </div>
        </form>
      </div>        
    </>
  );
}

export default Navbar;