"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Edit,
  Loader2,
  UploadCloud,
  X,
  BookOpen,
} from "lucide-react";
import toast from "react-hot-toast";
import { Tuition, TuitionMode, UpdateTuitionInput } from "../../../../teype/tuitiontype";
import { updateTuitionDetails } from "@/lib/actions api/tuition";
import { SUBJECT_OPTIONS, CLASS_LEVEL_OPTIONS, DAYS_PER_WEEK_OPTIONS } from "@/app/dashboard/tutor/post-tuition/page";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface TuitionEditModalProps {
  tuition: Tuition;
}

export function TuitionEditModal({ tuition }: TuitionEditModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Form State initialized with tuition data
  const [title, setTitle] = useState(tuition.title || "");
  const [subject, setSubject] = useState(tuition.subject || "");
  const [classLevel, setClassLevel] = useState(tuition.classLevel || "");
  const [mode, setMode] = useState<TuitionMode>(tuition.mode || "Online");
  const [location, setLocation] = useState(tuition.location || "");
  const [monthlyFee, setMonthlyFee] = useState<string>(
    tuition.monthlyFee ? String(tuition.monthlyFee) : ""
  );
  const [daysPerWeek, setDaysPerWeek] = useState<string>(
    tuition.daysPerWeek ? String(tuition.daysPerWeek) : "3 Days/Week"
  );
  const [description, setDescription] = useState(tuition.description || "");
  const [bannerImage, setBannerImage] = useState(tuition.bannerImage || "");

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state whenever modal opens
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setTitle(tuition.title || "");
      setSubject(tuition.subject || "");
      setClassLevel(tuition.classLevel || "");
      setMode(tuition.mode || "Online");
      setLocation(tuition.location || "");
      setMonthlyFee(tuition.monthlyFee ? String(tuition.monthlyFee) : "");
      setDaysPerWeek(tuition.daysPerWeek ? String(tuition.daysPerWeek) : "3 Days/Week");
      setDescription(tuition.description || "");
      setBannerImage(tuition.bannerImage || "");
    }
  };

  // Image Upload to ImgBB
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
        toast.success("New banner image uploaded!");
      } else {
        toast.error(data?.error?.message || "Failed to upload image");
      }
    } catch {
      toast.error("Error connecting to ImgBB API");
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tuition._id) return;

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

    try {
      setIsSubmitting(true);

      const payload: UpdateTuitionInput = {
        title: title.trim(),
        subject: subject.trim(),
        classLevel: classLevel.trim(),
        mode,
        location: mode === "Online" ? location.trim() || "Online" : location.trim(),
        monthlyFee: Number(monthlyFee),
        daysPerWeek,
        bannerImage,
        description: description.trim(),
      };

      const res = await updateTuitionDetails(tuition._id, payload);
      console.log("Update tuition response:", res);

      // If server returned an error (success: false or error field)
      if (res?.success === false || res?.error) {
        const errorMsg =
          res?.message ||
          res?.error ||
          (Array.isArray(res?.errors) ? res.errors[0]?.message : "") ||
          "Failed to update tuition";
        toast.error(errorMsg);
        return;
      }

      // If updated successfully
      toast.success(res?.message || "Tuition updated successfully!");
      setOpen(false);
      router.refresh();
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error?.message || "Error updating tuition details");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            title="Edit Tuition"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-amber-600 cursor-pointer rounded-lg"
          />
        }
      >
        <Edit className="w-4 h-4" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto p-5">
        <DialogHeader className="pb-2 border-b border-border/60">
          <DialogTitle className="text-lg font-bold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            Edit Tuition Details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-title" className="text-xs font-semibold">
              Tuition Title <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="h-9 text-sm"
            />
          </div>

          {/* Subject & Class Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="edit-subject" className="text-xs font-semibold">
                Subject <span className="text-rose-500">*</span>
              </Label>
              <select
                id="edit-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full h-9 px-3 py-1.5 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors cursor-pointer"
              >
                <option value="" disabled>Select Subject</option>
                {subject && !SUBJECT_OPTIONS.includes(subject) && (
                  <option value={subject}>{subject}</option>
                )}
                {SUBJECT_OPTIONS.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-classLevel" className="text-xs font-semibold">
                Class Level <span className="text-rose-500">*</span>
              </Label>
              <select
                id="edit-classLevel"
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                required
                className="w-full h-9 px-3 py-1.5 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors cursor-pointer"
              >
                <option value="" disabled>Select Class Level</option>
                {classLevel && !CLASS_LEVEL_OPTIONS.includes(classLevel) && (
                  <option value={classLevel}>{classLevel}</option>
                )}
                {CLASS_LEVEL_OPTIONS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mode & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
                Mode <span className="text-rose-500">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMode("Online")}
                  className={`py-1.5 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    mode === "Online"
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-muted/40 border-input text-muted-foreground hover:bg-muted"
                  }`}
                >
                  Online
                </button>
                <button
                  type="button"
                  onClick={() => setMode("Offline")}
                  className={`py-1.5 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    mode === "Offline"
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-muted/40 border-input text-muted-foreground hover:bg-muted"
                  }`}
                >
                  Offline
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-location" className="text-xs font-semibold">
                Location {mode === "Offline" && <span className="text-rose-500">*</span>}
              </Label>
              <Input
                id="edit-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required={mode === "Offline"}
                placeholder={mode === "Online" ? "Online / Any location" : "e.g. Dhanmondi, Dhaka"}
                className="h-9 text-sm"
              />
            </div>
          </div>

          {/* Monthly Fee & Days/Week */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="edit-fee" className="text-xs font-semibold">
                Monthly Fee (BDT) <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="edit-fee"
                type="number"
                min="0"
                value={monthlyFee}
                onChange={(e) => setMonthlyFee(e.target.value)}
                required
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-days" className="text-xs font-semibold">
                Schedule / Days Per Week <span className="text-rose-500">*</span>
              </Label>
              <select
                id="edit-days"
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(e.target.value)}
                required
                className="w-full h-9 px-3 py-1.5 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors cursor-pointer"
              >
                <option value="" disabled>Select Days Per Week</option>
                {daysPerWeek && !DAYS_PER_WEEK_OPTIONS.includes(daysPerWeek) && (
                  <option value={daysPerWeek}>{daysPerWeek}</option>
                )}
                {DAYS_PER_WEEK_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Banner Image Preview & Upload */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Banner Image</Label>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border/80 bg-muted/20">
              {bannerImage && (
                <div className="relative w-16 h-12 rounded-md overflow-hidden bg-muted border border-border shrink-0">
                  <Image
                    src={bannerImage}
                    alt="Banner preview"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setBannerImage("")}
                    className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-black/70 hover:bg-black text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              <div className="flex-1">
                <label
                  htmlFor={`edit-banner-upload-${tuition._id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-background hover:bg-muted cursor-pointer transition-colors"
                >
                  {isUploadingImage ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <UploadCloud className="w-3.5 h-3.5 text-amber-500" />
                  )}
                  <span>{isUploadingImage ? "Uploading..." : bannerImage ? "Change Image" : "Upload Image"}</span>
                </label>
                <input
                  id={`edit-banner-upload-${tuition._id}`}
                  type="file"
                  accept="image/*"
                  disabled={isUploadingImage}
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-description" className="text-xs font-semibold">
              Description <span className="text-rose-500">*</span>
            </Label>
            <Textarea
              id="edit-description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="text-xs min-h-20"
            />
          </div>

          <DialogFooter className="border-t border-border/60 pt-3 flex flex-col-reverse sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isUploadingImage}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
