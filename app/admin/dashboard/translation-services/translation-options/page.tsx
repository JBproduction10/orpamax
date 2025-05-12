'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const TYPES = ['language', 'documentType', 'urgency'];

const TranslationOptionsAdmin = () => {
  const [options, setOptions] = useState([]);
  const [form, setForm] = useState({ type: 'language', label: '', value: '' });
  const [activeTab, setActiveTab] = useState('language');

  const fetchOptions = async () => {
    const res = await fetch('/api/admin/translation/translation-options');
    const data = await res.json();
    setOptions(data);
  };

  const handleSubmit = async () => {
    await fetch('/api/admin/translation/translation-options', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ type: activeTab, label: '', value: '' });
    fetchOptions();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/translation/translation-options/${id}`, {
      method: 'DELETE',
    });
    fetchOptions();
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const filteredOptions = options.filter((opt: any) => opt.type === activeTab);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Translation Form Options</h1>
      <p className="text-sm mb-4">
        This form creates options that are displayed on the Translation Services contact form for users to select.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          {TYPES.map((type) => (
            <TabsTrigger key={type} value={type}>
              {type}
            </TabsTrigger>
          ))}
        </TabsList>

        {TYPES.map((type) => (
          <TabsContent key={type} value={type}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label>Type</Label>
                <Input value={type} disabled />
              </div>
              <div>
                <Label>Label</Label>
                <Input
                  value={form.type === type ? form.label : ''}
                  onChange={(e) =>
                    setForm({ type, label: e.target.value, value: form.value })
                  }
                  placeholder="French/ Medical/ Urgent(24hrs)"
                />
              </div>
              <div>
                <Label>Value</Label>
                <Input
                  value={form.type === type ? form.value : ''}
                  onChange={(e) =>
                    setForm({ type, label: form.label, value: e.target.value })
                  }
                  placeholder="french"
                />
              </div>
            </div>
            <Button onClick={handleSubmit}>Add Option</Button>

            <hr className="my-6" />

            <ul className="space-y-2">
              {filteredOptions.map((opt: any) => (
                <li
                  key={opt._id}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded"
                >
                  <span>
                    {opt.label} ({opt.value})
                  </span>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(opt._id)}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TranslationOptionsAdmin;
