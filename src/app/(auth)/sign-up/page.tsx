"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  BookOpen,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Camera,
  Trash2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

type Role = "student" | "tutor";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    image?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle image upload to ImgBB
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Image size should be less than 2MB",
      }));
      return;
    }

    try {
      setIsUploadingImage(true);
      setErrors((prev) => ({ ...prev, image: undefined }));

      const formData = new FormData();
      formData.append("image", file);

      const imagebbApi = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`;
      const res = await fetch(imagebbApi, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      const uploadedUrl = result?.data?.display_url || result?.data?.url;

      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
        toast.success("Profile photo uploaded successfully!");
      } else {
        const errMsg = result?.error?.message || "Failed to upload image to ImgBB";
        setErrors((prev) => ({
          ...prev,
          image: errMsg,
        }));
        toast.error(errMsg);
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        image: "Error connecting to ImgBB API",
      }));
      toast.error("Error connecting to ImgBB API");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    setErrors((prev) => ({ ...prev, image: undefined }));
    toast.success("Profile photo removed");
  };

  // Client-side form validation
  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isLoading) return;

    setIsLoading(true);
    setErrors({});
    try {
      const res = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
        image: imageUrl || undefined,
      });

      if (res?.error) {
        const errorMsg = res.error.message || "Failed to create account";
        setErrors({ general: errorMsg });
        toast.error(errorMsg);
        setIsLoading(false);
        return;
      }

      router.push("/")
      toast.success(
        `Welcome to MentorLagbe, ${name.trim()}! Account created successfully as a ${
          role === "student" ? "Student" : "Tutor"
        }.`
      );

    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setErrors({ general: message });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center p-1.5 shadow-2xs">
              <Image
                src="/logo.png"
                alt="MentorLagbe Logo"
                width={32}
                height={32}
                className="h-7 w-auto object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Mentor<span className="text-amber-500">Lagbe</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Create an Account
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Join as a Student or Tutor and get started for free
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
          {errors.general && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Join As:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                    role === "student"
                      ? "border-amber-500 bg-amber-50/60 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 shadow-2xs"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-semibold text-sm">
                    <GraduationCap className="w-4 h-4" />
                    <span>Student</span>
                    {role === "student" && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Find tutors & batches
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("tutor")}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                    role === "tutor"
                      ? "border-amber-500 bg-amber-50/60 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 shadow-2xs"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-semibold text-sm">
                    <BookOpen className="w-4 h-4" />
                    <span>Tutor</span>
                    {role === "tutor" && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Offer tuition & mentor
                  </span>
                </button>
              </div>
            </div>

            {/* Profile Photo Upload with Live Preview */}
            <div className="flex items-center gap-3.5 p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/30">
              <div className="relative h-14 w-14 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0">
                {isUploadingImage ? (
                  <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                ) : imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrl}
                    alt="Profile Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="w-7 h-7 text-slate-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Profile Photo (Optional)
                </span>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="profile-image-upload"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs ${
                      isUploadingImage
                        ? "opacity-60 cursor-not-allowed pointer-events-none"
                        : "cursor-pointer"
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5 text-amber-500" />
                    <span>
                      {isUploadingImage
                        ? "Uploading..."
                        : imageUrl
                        ? "Change"
                        : "Upload"}
                    </span>
                  </label>
                  {imageUrl && !isUploadingImage && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  )}
                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    disabled={isUploadingImage}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                {errors.image && (
                  <p className="text-xs text-red-500 mt-1">{errors.image}</p>
                )}
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahim Ahmed"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm outline-none transition-colors bg-white dark:bg-slate-900 ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 dark:border-slate-700 focus:border-amber-500"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm outline-none transition-colors bg-white dark:bg-slate-900 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 dark:border-slate-700 focus:border-amber-500"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm outline-none transition-colors bg-white dark:bg-slate-900 ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 dark:border-slate-700 focus:border-amber-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 rounded-xl text-sm font-semibold bg-amber-500 hover:bg-amber-600 active:bg-amber-700 disabled:opacity-60 text-white shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Sign In Footer */}
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-amber-600 dark:text-amber-500 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
