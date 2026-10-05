import { useEffect, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import useChangePassword from '../../hooks/useChangePassword';
import { convertToBengaliDigits } from '../../utils/language';

const MIN_LENGTH = 6;

const PasswordField = ({ id, label, value, onChange, autoComplete, hint, invalid }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div
        className={`flex items-center rounded-xl border bg-white focus-within:ring-2 ${
          invalid ? 'border-rose-300 focus-within:ring-rose-200' : 'border-gray-200 focus-within:border-[#0D7377] focus-within:ring-[#0D7377]/20'
        }`}
      >
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          required
          className="w-full rounded-xl border-0 bg-transparent px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-0"
          aria-invalid={invalid || undefined}
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          className="mr-1 rounded-lg p-2 text-gray-400 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7377]/40"
          aria-label={visible ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
        >
          {visible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>
      {hint && (
        <p id={`${id}-hint`} className={`mt-1 text-xs ${invalid ? 'text-rose-600' : 'text-gray-500'}`}>
          {hint}
        </p>
      )}
    </div>
  );
};

const ChangePasswordForm = () => {
  const { changePassword, loading, error, success } = useChangePassword();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const tooShort = newPassword.length > 0 && newPassword.length < MIN_LENGTH;
  const mismatch = confirmPassword.length > 0 && confirmPassword !== newPassword;
  const sameAsOld = newPassword.length > 0 && newPassword === currentPassword;
  const canSubmit = currentPassword && newPassword.length >= MIN_LENGTH && !mismatch && confirmPassword && !sameAsOld;

  useEffect(() => {
    if (success) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  }, [success]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (canSubmit) await changePassword(currentPassword, newPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PasswordField
        id="currentPassword"
        label="বর্তমান পাসওয়ার্ড"
        value={currentPassword}
        onChange={setCurrentPassword}
        autoComplete="current-password"
      />
      <PasswordField
        id="newPassword"
        label="নতুন পাসওয়ার্ড"
        value={newPassword}
        onChange={setNewPassword}
        autoComplete="new-password"
        invalid={tooShort || sameAsOld}
        hint={sameAsOld ? 'নতুন পাসওয়ার্ড বর্তমানটির থেকে আলাদা হতে হবে' : `কমপক্ষে ${convertToBengaliDigits(String(MIN_LENGTH))} অক্ষর`}
      />
      <PasswordField
        id="confirmPassword"
        label="নতুন পাসওয়ার্ড নিশ্চিত করুন"
        value={confirmPassword}
        onChange={setConfirmPassword}
        autoComplete="new-password"
        invalid={mismatch}
        hint={mismatch ? 'পাসওয়ার্ড দুটি মিলছে না' : undefined}
      />

      {error && (
        <p className="rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">
          {error}
        </p>
      )}
      {success && (
        <p className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-700" role="status">
          পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে।
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit || loading}
        className="w-full rounded-xl bg-[#0D7377] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7377]/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'পরিবর্তন করা হচ্ছে...' : 'পাসওয়ার্ড পরিবর্তন করুন'}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
