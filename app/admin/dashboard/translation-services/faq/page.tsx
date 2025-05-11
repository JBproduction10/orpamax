'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, Pencil } from 'lucide-react';

type Faq = {
  _id: string;
  category: string;
  question: string;
  answer: string;
};


export default function AdminFaqList() {

    const [faqs, setFaqs] = useState<Faq[]>([]);

    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/admin/translation/translation-faq')
            .then(res => res.json())
            .then((data: Faq[]) => {
            setFaqs(data);
            const uniqueCategories = Array.from(new Set(data.map((faq) => faq.category)));
            setCategories(uniqueCategories);
            });
    }, []);


    const handleDelete = async (id: string) => {
        const confirmed = confirm('Are you sure you want to delete this FAQ?');
        if (!confirmed) return;

        await fetch(`/api/admin/translation/translation-faq/${id}`, { method: 'DELETE' });
        setFaqs(prev => prev.filter((f: any) => f._id !== id));
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Manage FAQs</h1>
            <Link href="/admin/dashboard/translation-services/faq/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">+ Add FAQ</Button>
            </Link>
        </div>

        {categories.length === 0 ? (
            <p className="text-gray-600">No FAQs available.</p>
        ) : (
            <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="mb-6 flex flex-wrap gap-2">
                {categories.map((cat) => (
                <TabsTrigger
                    key={cat}
                    value={cat}
                    className="capitalize text-sm px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100"
                >
                    {cat}
                </TabsTrigger>
                ))}
            </TabsList>

            {categories.map((cat) => (
                <TabsContent key={cat} value={cat}>
                <div className="grid gap-6">
                    {faqs.filter((faq) => faq.category === cat).map((faq) => (
                    <Card key={faq._id} className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <CardTitle className="text-lg font-semibold text-blue-800">{faq.question}</CardTitle>
                        <Badge variant="outline" className="mt-2 sm:mt-0 text-sm capitalize">
                            {faq.category}
                        </Badge>
                        </CardHeader>
                        <CardContent>
                        <p className="text-gray-700 mb-4">{faq.answer}</p>
                        <div className="flex gap-3">
                            <Link href={`/admin/dashboard/translation-services/faq/edit/${faq._id}`}>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <Pencil size={16} /> Edit
                            </Button>
                            </Link>
                            <Button
                            variant="destructive"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleDelete(faq._id)}
                            >
                            <Trash2 size={16} /> Delete
                            </Button>
                        </div>
                        </CardContent>
                    </Card>
                    ))}
                </div>
                </TabsContent>
            ))}
            </Tabs>
        )}
        </div>
    );
}
