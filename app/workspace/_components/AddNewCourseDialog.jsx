
import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Switch } from '../../../components/ui/switch';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../../../components/ui/select";
import { Button } from '../../../components/ui/button';
import { Loader2Icon, Sparkle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation"; // ✅

function AddNewCourseDialog({ children }) { 
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    includeVideo: false,
    noOfChapters: 0,
    level: '',
    category: ''
  });

  const router= useRouter();

  const onHandleInputChanges = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const onGenerate = async () => {
    console.log(formData);
    const courseId=uuidv4();
    try {
      setLoading(true);
      const result = await axios.post('/api/generate-course-layout', {
        ...formData,
        courseId:courseId
      });
      console.log(result.data);
      setLoading(false);
      router.push('/workspace/edit-course/'+result.data?.courseId);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course Using AI</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-4 mt-3">
              <div>
                <label>Course Name</label>
                <Input
                  placeholder="Course Name"
                  onChange={(e) => onHandleInputChanges('name', e.target.value)}
                />
              </div>
              <div>
                <label>Course Description (Optional)</label>
                <Textarea
                  placeholder="Course Description"
                  onChange={(e) => onHandleInputChanges('description', e.target.value)}
                />
              </div>
              <div>
                <label>No. of Chapters</label>
                <Input
                  placeholder="No. of Chapters"
                  type="number"
                  onChange={(e) => onHandleInputChanges('noOfChapters', Number(e.target.value))}
                />
              </div>
              <div className="flex gap-3 items-center">
                <label>Include Video</label>
                <Switch
                  onCheckedChange={(checked) => onHandleInputChanges('includeVideo', checked)}
                />
              </div>
              <div>
                <label>Difficulty Level</label>
                <Select onValueChange={(value) => onHandleInputChanges('level', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Difficulty Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label>Category</label>
                <Input
                  placeholder="Category (Separated by comma)"
                  onChange={(e) => onHandleInputChanges('category', e.target.value)}
                />
              </div>
              <div className="mt-5">
                <Button className="w-full" onClick={onGenerate} disabled={loading}>
                  {loading ? <Loader2Icon className="animate-spin" /> : <Sparkle />}
                  Generate Course
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewCourseDialog;
