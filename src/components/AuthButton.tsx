type AuthButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function AuthButton({ label, onClick }: AuthButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-black text-white font-semibold rounded-md px-6 py-3 text-center hover:opacity-90 transition"
    >
      {label}
    </button>
  );
}

