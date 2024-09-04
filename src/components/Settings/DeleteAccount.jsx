// DeleteAccount.js
import { Colors } from '../../constants/colors';

const DeleteAccount = () => {
  const handleDeleteAccount = () => {
    // Implement account deletion logic here
    alert('Account deleted successfully!');
  };

  return (
    <div className="mt-2">
      <h2
        className="text-sm md:text-xl lg:text-xl text-left font-semibold"
        style={{ color: Colors.titleText }}
      >
        Delete Bio Data :
      </h2>
      <button
        onClick={handleDeleteAccount}
        className="bg-red-500 hover:bg-red-600 text-sm md:text-xl lg:text-xl text-white font-semibold py-2 px-4 rounded-md mt-4"
      >
        Delete Bio data
      </button>
    </div>
  );
};

export default DeleteAccount;
