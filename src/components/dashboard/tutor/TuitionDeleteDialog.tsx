"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteTuition } from "@/lib/actions api/tuition";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface TuitionDeleteDialogProps {
  tuitionId: string;
  tuitionTitle?: string;
  onDeleted?: () => void;
}

export function TuitionDeleteDialog({
  tuitionId,
  tuitionTitle,
  onDeleted,
}: TuitionDeleteDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!tuitionId) return;

    try {
      setIsDeleting(true);
      const res = await deleteTuition(tuitionId);
      console.log("Delete tuition response:", res);

      if (res?.success === false || res?.error) {
        const errorMsg =
          res?.message || res?.error || "Failed to delete tuition post";
        toast.error(errorMsg);
        return;
      }

      toast.success(res?.message || "Tuition post deleted successfully");
      setOpen(false);
      if (onDeleted) {
        onDeleted();
      }
      router.refresh();
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error?.message || "Error deleting tuition post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            title="Delete Tuition"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg cursor-pointer"
          />
        }
      >
        <Trash2 className="w-4 h-4" />
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base font-bold text-foreground">
            Delete Tuition Post?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs text-muted-foreground leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {tuitionTitle ? `"${tuitionTitle}"` : "this tuition post"}
            </span>
            ? This action cannot be undone and will permanently remove this listing.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="pt-2">
          <AlertDialogCancel disabled={isDeleting} className="text-xs">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs cursor-pointer"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Delete
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
