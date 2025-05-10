export function InputField({ label, value, setValue }: { label: string; value: string; setValue: (val: string) => void }) {
    return (
      <div>
        <label className="block mb-2 font-medium text-gray-700">{label}</label>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder={label}
          required
        />
      </div>
    );
  }
  
  export function TextAreaField({ label, value, setValue }: { label: string; value: string; setValue: (val: string) => void }) {
    return (
      <div>
        <label className="block mb-2 font-medium text-gray-700">{label}</label>
        <textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg min-h-[100px] resize-none"
          placeholder={label}
          required
        />
      </div>
    );
  }
  