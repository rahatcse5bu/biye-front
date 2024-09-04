// Settings.js
import './Settings.css';
import { Colors } from '../../constants/colors';
import ChangePasswordForm from '../../components/Settings/ChangePasswordForm';
import ActiveDeleteButton from '../../components/Settings/ActiveDeleteButton';

function Settings() {
  return (
    <div className="min-h-screen w-full  p-8">
      <div
        className="  mx-auto bg-gray-100 rounded-lg shadow-md border-t-2"
        style={{ borderTopColor: Colors.titleText }}
      >
        <h1
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-center pt-5 mb-6"
          style={{ color: Colors.titleText }}
        >
          Account Settings
        </h1>

        <div className="grid md:grid-cols-2 py-5 grid-cols-1">
          <ChangePasswordForm />
          <div
            className="md:border-l-2 pl-3"
            style={{
              borderColor: Colors.titleText,
            }}
          >
            <ActiveDeleteButton />
            {/* <DeleteAccount /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
