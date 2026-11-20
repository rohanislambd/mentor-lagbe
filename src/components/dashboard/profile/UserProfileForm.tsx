"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  FileText,
  UploadCloud,
  X,
  Loader2,
  Shield,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Camera,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { updateUserProfile, getCurrentUserProfile } from "@/lib/actions api/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface UserProfileFormProps {
  roleTitle?: "Student" | "Tutor" | "Admin";
}

export function UserProfileForm({ roleTitle }: UserProfileFormProps) {
  const { data: session, isPending } = authClient.useSession();
  const sessionUser = session?.user;

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [userRole, setUserRole] = useState("student");
  const [plan, setPlan] = useState("free");

  // Loading States
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize from session and backend profile
  useEffect(() => {
    let isMounted = true;

    const fetchLatestProfile = async () => {
      try {
        const data = await getCurrentUserProfile();
        if (!isMounted) return;
        if (data) {
          if (data.name) setName(data.name);
          if (data.email) setEmail(data.email);
          if (data.phone) setPhone(data.phone);
          if (data.bio) setBio(data.bio);
          if (data.image) setImage(data.image);
          if (data.role) setUserRole(data.role);
          if (data.plan) setPlan(data.plan);
          return;
        }
      } catch {
        // Fallback to session
      }

      if (isMounted && sessionUser) {
        setName(sessionUser.name || "");
        setEmail(sessionUser.email || "");
        setImage(sessionUser.image || "");
        const extUser = sessionUser as { phone?: string; bio?: string; role?: string; plan?: string };
        if (extUser.phone) setPhone(extUser.phone);
        if (extUser.bio) setBio(extUser.bio);
        if (extUser.role) setUserRole(extUser.role);
        if (extUser.plan) setPlan(extUser.plan);
      }
    };

    fetchLatestProfile();

    return () => {
      isMounted = false;
    };
  }, [sessionUser]);

  // Handle ImgBB Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      const formData = new FormData();
      formData.append("image", file);

      const apiKey = process.env.NEXT_PUBLIC_IMAGEBB_API_KEY;
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const uploadedUrl = data?.data?.display_url || data?.data?.url;

      if (uploadedUrl) {
        setImage(uploadedUrl);
        toast.success("Profile picture uploaded successfully!");
      } else {
        toast.error(data?.error?.message || "Failed to upload image");
      }
    } catch {
      toast.error("Error connecting to ImgBB API");
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      setIsSaving(true);

      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        bio: bio.trim(),
        image: image.trim(),
      };

      await updateUserProfile(payload);

      // Also sync Better Auth client if available
      try {
        await (authClient as { updateUser?: (p: { name: string; image?: string }) => Promise<unknown> }).updateUser?.({
          name: name.trim(),
          image: image.trim(),
        });
      } catch {
        // Ignore client session update errors
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Failed to update profile";
      toast.error(errMsg);
    } finally {
      setIsSaving(false);
    }
  };

  const displayRole = roleTitle || (userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : "User");
  const avatarInitial = name ? name.trim().charAt(0).toUpperCase() : "U";

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        <p className="text-sm">Loading profile information...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative group">
            {image ? (
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-amber-500 shadow-sm bg-muted">
                <Image
                  src={image}
                  alt={name || "User Avatar"}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-amber-400 to-amber-600 text-white font-black text-2xl flex items-center justify-center shadow-sm">
                {avatarInitial}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              {displayRole} Profile
            </h1>
            <p className="text-xs text-muted-foreground">
              Manage your personal details, contact information, and public bio.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
            {displayRole === "Admin" ? (
              <Shield className="w-3.5 h-3.5" />
            ) : displayRole === "Tutor" ? (
              <Sparkles className="w-3.5 h-3.5" />
            ) : (
              <GraduationCap className="w-3.5 h-3.5" />
            )}
            {displayRole}
          </span>
          {plan === "pro" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 border border-purple-500/20">
              <Sparkles className="w-3 h-3 text-purple-500" />
              Pro Plan
            </span>
          )}
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-6">
          <div className="border-b border-border/60 pb-3">
            <h2 className="text-base font-bold text-foreground">
              Profile Photo & Avatar
            </h2>
            <p className="text-xs text-muted-foreground">
              Upload a profile picture via ImgBB or paste an image URL.
            </p>
          </div>

          {/* Photo Upload Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative shrink-0">
              {image ? (
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-500 shadow-md bg-muted">
                  <Image
                    src={image}
                    alt="Profile Preview"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/70 hover:bg-black text-white transition-colors cursor-pointer"
                    title="Remove picture"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-muted border border-dashed border-border flex flex-col items-center justify-center text-muted-foreground gap-1">
                  <Camera className="w-7 h-7 text-amber-500/60" />
                  <span className="text-[10px]">No Photo</span>
                </div>
              )}
            </div>

            <div className="space-y-3 flex-1 w-full">
              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white cursor-pointer transition-colors shadow-xs active:scale-95">
                  {isUploadingImage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading to ImgBB...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      <span>Upload Picture (ImgBB)</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploadingImage}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Or Direct Image URL input */}
              <div className="space-y-1">
                <Label htmlFor="image-url" className="text-xs text-muted-foreground font-medium">
                  Or paste direct image URL
                </Label>
                <Input
                  id="image-url"
                  placeholder="https://i.ibb.co/..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-border/60 pt-6 space-y-4">
            <h2 className="text-base font-bold text-foreground">
              Personal Information
            </h2>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="profile-name" className="text-xs font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-500" />
                  Full Name <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="profile-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your full name"
                  className="h-10 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-email" className="text-xs font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="profile-email"
                    value={email}
                    disabled
                    className="h-10 text-sm bg-muted/40 cursor-not-allowed pr-24"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="profile-phone" className="text-xs font-semibold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  Phone Number
                </Label>
                <Input
                  id="profile-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 017XXXXXXXX"
                  className="h-10 text-sm"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-1.5">
              <Label htmlFor="profile-bio" className="text-xs font-semibold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                About / Bio
              </Label>
              <Textarea
                id="profile-bio"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share a short introduction about your educational background, teaching interests, or learning goals..."
                className="text-sm resize-none"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="border-t border-border/60 pt-4 flex items-center justify-end gap-3">
            <Button
              type="submit"
              disabled={isSaving || isUploadingImage}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs h-10 px-6 rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                  Saving Changes...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
