import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useAuth } from "../../providers/AuthStore";

function ChangePasswordForm(props) {
  const { token } = useContext(useAuth);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setShowModal, setModalMode } = props;

  return (
    <>    
      <div className="py-6 px-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Change your password</h3>
          <form className="space-y-6 w-[400px]" action="#" onSubmit={handleSubmit((data) => {
            fetch(`http://edu.project.etherial.fr/users/me/password`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

              },
              body: JSON.stringify({
                password_old: data.password,
                password_new: data.newPassword,
                password_new_verif: data.newPasswordVerif,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.status === 200) {
                  setShowModal(false);
                }
              }
            );
          })}>
            <div>
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  {...register("password", { required: true })}
                />
                {errors.firstname && <p className="text-red-500 text-xs italic">Please enter your password.</p>}
            </div>
            <div>
                <label for="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your new password</label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  {...register("newPassword", { required: true })}
                />
                {errors.newPassword && <p className="text-red-500 text-xs italic">Please enter your newPassword.</p>}
            </div>
            <div>
                <label for="newPasswordVerif" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your new password verification</label>
                <input
                  type="password"
                  name="newPasswordVerif"
                  id="newPasswordVerif"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="••••••••"
                  required
                  {...register("newPasswordVerif", { required: true })}
                />
                {errors.newPasswordVerif && <p className="text-red-500 text-xs italic">Please enter your new password.</p>}
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

export default ChangePasswordForm;