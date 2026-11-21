"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/shared/ImageUpload";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";

const ProfilePage = () => {
  const { user, refresh } = useAuth();
  const [form, setForm] = useState({ name: "", phone: "", bio: "", image: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm({
      name: user.name || "",
      phone: user.phone || "",
      bio: user.bio || "",
      image: user.image || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.name.trim().length < 2)
      return toast.error("Name must be at least 2 characters");

    setSaving(true);
    const { ok, data } = await apiFetch(
      `/users/${encodeURIComponent(user.email)}`,
      {
        method: "PATCH",
        body: JSON.stringify(form),
      },
    );

    if (!ok) {
      setSaving(false);
      return toast.error(data.message || "Could not update profile");
    }

    await refresh();
    setSaving(false);
    toast.success("Profile updated");
  };

  if (!user) return null;

  return (
    <div>
      <PageHeader
        title="Update Profile"
        text="Keep your information up to date."
      />

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-5 rounded-2xl border bg-card p-5 sm:p-8"
      >
        <div className="space-y-2">
          <Label>Profile Picture</Label>
          <ImageUpload
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
            label="Upload Photo"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user.email} disabled />
          </div>
          <div className="space-y-2">
            <Label>Role / Plan</Label>
            <div className="flex h-9 items-center gap-2">
              <span className="text-sm capitalize">{user.role}</span>
              <StatusBadge status={user.plan || "free"} />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            rows={4}
            value={form.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
          />
        </div>

        <Button type="submit" className="h-11" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};
export default ProfilePage;
