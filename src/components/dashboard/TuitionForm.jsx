"use client";
import { useState } from "react";
import { toast } from "sonner";
import { CLASS_LEVELS, MODES, SUBJECTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/shared/ImageUpload";

const selectClass =
  "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary";

const emptyForm = {
  title: "",
  subject: SUBJECTS[0],
  classLevel: CLASS_LEVELS[0],
  mode: MODES[0],
  location: "",
  monthlyFee: "",
  daysPerWeek: "",
  bannerImage: "",
  description: "",
};

const TuitionForm = ({ initial, submitLabel, onSubmit }) => {
  const [form, setForm] = useState(initial || emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (form.title.trim().length < 5)
      return "Title must be at least 5 characters";

    if (!form.location.trim()) return "Location is required";

    if (Number(form.monthlyFee) < 100)
      return "Monthly fee must be at least 100";

    if (Number(form.daysPerWeek) < 1 || Number(form.daysPerWeek) > 7)
      return "Days per week must be 1 to 7";

    if (!form.bannerImage) return "Please upload a banner image";

    if (form.description.trim().length < 20)
      return "Description must be at least 20 characters";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = validate();
    if (message) return toast.error(message);

    setSubmitting(true);
    await onSubmit(form);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="HSC Physics Complete Course"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className={selectClass}
          >
            {SUBJECTS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="classLevel">Class Level</Label>
          <select
            id="classLevel"
            name="classLevel"
            value={form.classLevel}
            onChange={handleChange}
            className={selectClass}
          >
            {CLASS_LEVELS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="mode">Mode</Label>
          <select
            id="mode"
            name="mode"
            value={form.mode}
            onChange={handleChange}
            className={selectClass}
          >
            {MODES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Dhanmondi, Dhaka"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="monthlyFee">Monthly Fee (৳)</Label>
          <Input
            id="monthlyFee"
            name="monthlyFee"
            type="number"
            value={form.monthlyFee}
            onChange={handleChange}
            placeholder="3000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="daysPerWeek">Days / Week</Label>
          <Input
            id="daysPerWeek"
            name="daysPerWeek"
            type="number"
            value={form.daysPerWeek}
            onChange={handleChange}
            placeholder="3"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Banner Image</Label>
        <ImageUpload
          value={form.bannerImage}
          onChange={(url) => setForm({ ...form, bannerImage: url })}
          label="Upload Banner"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={5}
          value={form.description}
          onChange={handleChange}
          placeholder="Describe your classes, syllabus and teaching style..."
        />
      </div>

      <Button
        type="submit"
        className="h-11 w-full sm:w-auto"
        disabled={submitting}
      >
        {submitting ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
};
export default TuitionForm;
