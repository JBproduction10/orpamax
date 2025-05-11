'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function EditFaqPage() {
  const { id } = useParams();
  const router = useRouter();
  const [faq, setFaq] = useState({ category: '', question: '', answer: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/translation/translation-faq`)
      .then(res => res.json())
      .then(data => {
        const item = data.find((f: any) => f._id === id);
        if (item) setFaq(item);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`/api/admin/translation/translation-faq/${id}`, {
      method: 'PUT',
      body: JSON.stringify(faq),
    });
    router.push('/admin/dashboard/translation-services/faq');
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit FAQ</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="category" className="mb-1 block">Category</Label>
              <Input
                id="category"
                placeholder="e.g., general, process, pricing"
                value={faq.category}
                onChange={e => setFaq({ ...faq, category: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="question" className="mb-1 block">Question</Label>
              <Input
                id="question"
                placeholder="Enter the FAQ question"
                value={faq.question}
                onChange={e => setFaq({ ...faq, question: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="answer" className="mb-1 block">Answer</Label>
              <Textarea
                id="answer"
                placeholder="Enter the FAQ answer"
                rows={5}
                value={faq.answer}
                onChange={e => setFaq({ ...faq, answer: e.target.value })}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : 'Update FAQ'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
