"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  X,
  Loader2,
  ArrowLeft,
  Info,
  BookOpen,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { createTuition } from "@/lib/actions api/tuition";
import { CreateTuitionInput, TuitionMode } from "../../../../../teype/tuitiontype";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PostTuitionPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Form State
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [mode, setMode] = useState<TuitionMode>("Online");
  const [location, setLocation] = useState("");
  const [monthlyFee, setMonthlyFee] = useState<string>("");
  const [daysPerWeek, setDaysPerWeek] = useState<string>("3 Days/Week");
  const [description, setDescription] = useState("");

  // Banner image upload state
  const [bannerImage, setBannerImage] = useState<string>("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle ImgBB Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

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
        setBannerImage(uploadedUrl);
        toast.success("Banner image uploaded successfully!");
      } else {
        toast.error(data?.error?.message || "Failed to upload image");
      }
    } catch {
      toast.error("Error connecting to ImgBB API");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setBannerImage("");
    toast.success("Banner image removed");
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be signed in to post a tuition");
      return;
    }

    if (!title.trim() || !subject.trim() || !classLevel.trim()) {
      toast.error("Please fill in title, subject, and class level");
      return;
    }

    if (mode === "Offline" && !location.trim()) {
      toast.error("Please enter a location for offline tuition");
      return;
    }

    if (!monthlyFee || Number(monthlyFee) <= 0) {
      toast.error("Please enter a valid monthly fee");
      return;
    }

    if (!bannerImage) {
      toast.error("Please upload a banner image for your tuition post");
      return;
    }

    if (!description.trim() || description.trim().length < 20) {
      toast.error("Please enter a detailed description (at least 20 characters)");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload: CreateTuitionInput = {
        title: title.trim(),
        subject: subject.trim(),
        classLevel: classLevel.trim(),
        mode,
        location: mode === "Online" ? location.trim() || "Online" : location.trim(),
        monthlyFee: Number(monthlyFee),
        daysPerWeek,
        bannerImage,
        description: description.trim(),
        tutorName: user.name || "Tutor",
        tutorEmail: user.email || "",
        approvalStatus: "pending",
        isActive: true,
      };

      const result = await createTuition(payload);
      console.log(result);

      if (result?.success === false) {
        toast.error(result?.message || "Failed to create tuition post");
        return;
      }

      if (result?.success || result?.insertedId || result?._id) {
        toast.success(result?.message || "Tuition post created! Awaiting admin approval.");
        router.push("/dashboard/tutor/my-tuitions");
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to create tuition post");
      }
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err?.message || "Something went wrong while posting tuition");
    } finally {
      setIsSubmitting(false);
    }
  };

  const userPlan = (user as { plan?: string })?.plan || "free";
  const isPro = userPlan.toLowerCase() === "pro";

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/tutor/my-tuitions"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to My Tuitions
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-amber-500" />
            Post a Tuition
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create a detailed tuition listing to connect with students across the platform.
          </p>
        </div>
      </div>

      {/* Plan Policy Notice */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-muted-foreground">
        <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-foreground">Tuition Posting Policy</p>
          <p className="leading-relaxed">
            {isPro
              ? "You are on the Pro Plan with unlimited tuition posts."
              : "Free Plan Tutors can create up to 2 tuition posts; Pro Plan Tutors can create unlimited posts."}{" "}
            New listings are automatically saved with status <span className="font-semibold text-amber-600 dark:text-amber-400">pending</span> and require admin approval before appearing publicly.
          </p>
        </div>
      </div>

      {/* Tuition Post Form Card */}
      <Card className="border-border/70 shadow-sm">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="text-lg">Tuition Information</CardTitle>
          <CardDescription>
            Fill in the subjects, requirements, mode of study, and fee details.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold">
                Tuition Title <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g. HSC Physics & Higher Mathematics Mentorship"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="h-10"
              />
            </div>

            {/* Subject & Class Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-semibold">
                  Subject(s) <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="subject"
                  placeholder="e.g. Physics, Chemistry, Math"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="classLevel" className="text-sm font-semibold">
                  Class / Grade Level <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="classLevel"
                  placeholder="e.g. Class 9-10, HSC, Admission"
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value)}
                  required
                  className="h-10"
                />
              </div>
            </div>

            {/* Mode & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mode" className="text-sm font-semibold">
                  Teaching Mode <span className="text-rose-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMode("Online")}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                      mode === "Online"
                        ? "bg-amber-500 text-white border-amber-500 shadow-2xs"
                        : "bg-muted/40 border-input text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    Online
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("Offline")}
                    className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                      mode === "Offline"
                        ? "bg-amber-500 text-white border-amber-500 shadow-2xs"
                        : "bg-muted/40 border-input text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    Offline
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-semibold">
                  Location / Area {mode === "Offline" && <span className="text-rose-500">*</span>}
                </Label>
                <Input
                  id="location"
                  placeholder={mode === "Online" ? "Online / Any location" : "e.g. Dhanmondi, Dhaka"}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required={mode === "Offline"}
                  className="h-10"
                />
              </div>
            </div>

            {/* Monthly Fee & Days Per Week */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyFee" className="text-sm font-semibold">
                  Monthly Fee (BDT) <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="monthlyFee"
                  type="number"
                  min="0"
                  placeholder="e.g. 5000"
                  value={monthlyFee}
                  onChange={(e) => setMonthlyFee(e.target.value)}
                  required
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="daysPerWeek" className="text-sm font-semibold">
                  Days Per Week <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="daysPerWeek"
                  placeholder="e.g. 3 Days/Week"
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(e.target.value)}
                  required
                  className="h-10"
                />
              </div>
            </div>

            {/* Banner Image Upload via ImgBB */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Banner Image <span className="text-rose-500">*</span>
              </Label>
              <div className="border-2 border-dashed border-border/80 rounded-xl p-4 bg-muted/20">
                {bannerImage ? (
                  <div className="relative rounded-lg overflow-hidden border border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={bannerImage}
                      alt="Tuition Banner"
                      className="w-full h-48 sm:h-56 object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-6 space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      {isUploadingImage ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <UploadCloud className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="banner-upload"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white cursor-pointer transition-colors shadow-2xs"
                      >
                        {isUploadingImage ? "Uploading..." : "Upload Banner Image"}
                      </label>
                      <input
                        id="banner-upload"
                        type="file"
                        accept="image/*"
                        disabled={isUploadingImage}
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, or WEBP up to 2MB (Uploaded securely via ImgBB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold">
                Tuition Description <span className="text-rose-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your qualifications, teaching methodology, syllabus coverage, preferred times, and student prerequisites..."
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="min-h-28"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-border/50">
              <Link
                href="/dashboard/tutor/my-tuitions"
                className="w-full sm:w-auto inline-flex items-center justify-center h-9 px-4 py-2 rounded-lg text-sm font-medium border border-border bg-background hover:bg-muted text-foreground transition-colors"
              >
                Cancel
              </Link>
              <Button
                type="submit"
                disabled={isSubmitting || isUploadingImage}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-xs"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Posting Tuition...
                  </>
                ) : (
                  "Post Tuition"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
