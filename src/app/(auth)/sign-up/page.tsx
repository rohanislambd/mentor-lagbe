"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
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
  Check,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { validatePassword } from "@/lib/utils/password";
import toast from "react-hot-toast";

type Role = "student" | "tutor";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const redirectTarget =
    callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const pwdStrength = validatePassword(password);

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

    const pwdValidation = validatePassword(password);
    if (!pwdValidation.isValid) {
      newErrors.password = pwdValidation.errorMessage;
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

      toast.success(
        `Welcome to MentorLagbe, ${name.trim()}! Account created successfully as a ${
          role === "student" ? "Student" : "Tutor"
        }.`
      );
      router.push(redirectTarget);
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setErrors({ general: message });
      setIsLoading(false);
    }
  };

  const signInHref = callbackUrl
    ? `/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : "/sign-in";

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
            {/* Account Role Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                I want to join as a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1 cursor-pointer ${
                    role === "student"
                      ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 ring-1 ring-amber-500"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <GraduationCap
                      className={`w-5 h-5 ${
                        role === "student"
                          ? "text-amber-600 dark:text-amber-500"
                          : "text-slate-400"
                      }`}
                    />
                    {role === "student" && (
                      <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                    )}
                  </div>
                  <span className="font-semibold text-sm text-slate-900 dark:text-white mt-1">
                    Student
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Find expert tutors
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("tutor")}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1 cursor-pointer ${
                    role === "tutor"
                      ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 ring-1 ring-amber-500"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <BookOpen
                      className={`w-5 h-5 ${
                        role === "tutor"
                          ? "text-amber-600 dark:text-amber-500"
                          : "text-slate-400"
                      }`}
                    />
                    {role === "tutor" && (
                      <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                    )}
                  </div>
                  <span className="font-semibold text-sm text-slate-900 dark:text-white mt-1">
                    Tutor
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Teach & earn money
                  </span>
                </button>
              </div>
            </div>

            {/* Profile Picture Upload */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Profile Photo (Optional)
              </label>
              <div className="flex items-center gap-3">
                {imageUrl ? (
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500 shrink-0">
                    <Image
                      src={imageUrl}
                      alt="Profile Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-white cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-slate-400" />
                  </div>
                )}

                <div className="flex-1">
                  <label
                    htmlFor="profile-upload"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer transition-colors"
                  >
                    {isUploadingImage ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Camera className="w-3.5 h-3.5 text-slate-500" />
                        <span>{imageUrl ? "Change Photo" : "Upload Photo"}</span>
                      </>
                    )}
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isUploadingImage}
                    className="hidden"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    JPG, PNG or WEBP (Max 2MB)
                  </p>
                </div>
              </div>
              {errors.image && (
                <p className="text-xs text-red-500 mt-1">{errors.image}</p>
              )}
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
                  placeholder="e.g. John Doe"
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: undefined }));
                    }
                  }}
                  placeholder="Create a strong password"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm outline-none transition-colors bg-white dark:bg-slate-900 ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 dark:border-slate-700 focus:border-amber-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator & Criteria Checklist */}
              {password.length > 0 && (
                <div className="mt-2.5 space-y-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  {/* Strength Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-medium">
                      <span className="text-slate-500 dark:text-slate-400">Password Strength:</span>
                      <span className={`font-bold ${pwdStrength.strengthColor.split(" ")[1]}`}>
                        {pwdStrength.strengthLabel}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 h-1.5">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`rounded-full transition-all duration-300 ${
                            pwdStrength.passedCount >= step + 1 || (step === 1 && pwdStrength.passedCount >= 1)
                              ? pwdStrength.strengthColor.split(" ")[0]
                              : "bg-slate-200 dark:bg-slate-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Criteria Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px]">
                    <div className={`flex items-center gap-1.5 ${pwdStrength.hasMinLength ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-slate-500 dark:text-slate-400"}`}>
                      <Check className={`w-3.5 h-3.5 shrink-0 ${pwdStrength.hasMinLength ? "text-emerald-500" : "text-slate-300 dark:text-slate-600"}`} />
                      <span>At least 6 characters</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${pwdStrength.hasUpperCase ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-slate-500 dark:text-slate-400"}`}>
                      <Check className={`w-3.5 h-3.5 shrink-0 ${pwdStrength.hasUpperCase ? "text-emerald-500" : "text-slate-300 dark:text-slate-600"}`} />
                      <span>1 uppercase letter (A-Z)</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${pwdStrength.hasLowerCase ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-slate-500 dark:text-slate-400"}`}>
                      <Check className={`w-3.5 h-3.5 shrink-0 ${pwdStrength.hasLowerCase ? "text-emerald-500" : "text-slate-300 dark:text-slate-600"}`} />
                      <span>1 lowercase letter (a-z)</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${pwdStrength.hasNumber ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-slate-500 dark:text-slate-400"}`}>
                      <Check className={`w-3.5 h-3.5 shrink-0 ${pwdStrength.hasNumber ? "text-emerald-500" : "text-slate-300 dark:text-slate-600"}`} />
                      <span>1 number (0-9)</span>
                    </div>
                    <div className={`flex items-center gap-1.5 sm:col-span-2 ${pwdStrength.hasSpecialChar ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-slate-500 dark:text-slate-400"}`}>
                      <Check className={`w-3.5 h-3.5 shrink-0 ${pwdStrength.hasSpecialChar ? "text-emerald-500" : "text-slate-300 dark:text-slate-600"}`} />
                      <span>1 special character (!@#$%^&*)</span>
                    </div>
                  </div>
                </div>
              )}

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
            href={signInHref}
            className="font-semibold text-amber-600 dark:text-amber-500 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}
