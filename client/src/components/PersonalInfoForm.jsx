import React from 'react'
import {
BriefcaseBusiness,
Linkedin,
User,
Mail,
Phone,
Globe
} from 'lucide-react';

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {

const handleChange = (field, value) => {
onChange({ ...data, [field]: value });
};

const fields = [
{ key: 'full_name', label: 'Full Name', icon: User, type: 'text', required: true },
{ key: 'email', label: 'Email', icon: Mail, type: 'email', required: true },
{ key: 'phone', label: 'Phone', icon: Phone, type: 'tel', required: false },
{ key: 'location', label: 'Location', icon: User, type: 'text', required: false },
{ key: 'profession', label: 'Profession', icon: BriefcaseBusiness, type: 'text' },
{ key: 'website', label: 'Website', icon: User, type: 'url', required: false },
{ key: 'linkedin', label: 'LinkedIn', icon: Linkedin, type: 'url', required: false },
{ key: 'github', label: 'GitHub', icon: Globe, type: 'url', required: false },
];

return ( <div> <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3> <p className='text-sm text-gray-600'>Get Started with the Personal Information</p>


  <div className='flex items-center gap-2'>
    <label>
      {data.image ? (
        <img
          src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)}
          alt="user-image"
          className='w-16 h-16 object-cover rounded-full mt-5 cursor-pointer ring ring-slate-300 hover:opacity-80'
        />
      ) : (
        <div className='inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer'>
          <User className='size-10 p-2.5 border rounded-full' />
          upload user image
        </div>
      )}

      <input
        type="file"
        accept='image/jpeg, image/png'
        className='hidden'
        onChange={(e) => handleChange("image", e.target.files[0])}
      />
    </label>

    {typeof data.image === 'object' && (
      <div className='flex flex-col gap-1 pl-4 text-sm'>
        <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
          <input
            type="checkbox"
            className='sr-only peer'
            checked={removeBackground}
            onChange={() => setRemoveBackground(prev => !prev)}
          />

          <div
            className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
            peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full
            peer-checked:after:border-white after:content-[""] after:absolute after:top-0.5
            after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
            after:h-5 after:w-5 after:transition-all'
          />

          <span className='text-sm'>Remove Background</span>
        </label>
      </div>
    )}
  </div>

  {/* INPUT FIELDS */}
  {fields.map((field) => {
    const Icon = field.icon;
    return (
      <div key={field.key} className="mt-5 space-y-1">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
          <Icon className="size-4" />
          {field.label}
          {field.required && <span className="text-red-500">*</span>}
        </label>

        <input
          type={field.type}
          value={data[field.key] || ""}
          onChange={(e) => handleChange(field.key, e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
          focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          placeholder={`Enter your ${field.label.toLowerCase()}`}
          required={field.required}
        />
      </div>
    );
  })}

</div>


);
};

export default PersonalInfoForm;
