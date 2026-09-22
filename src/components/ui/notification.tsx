/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const notificationVariants = cva(
  "group/notification relative pointer-events-auto flex w-full items-start gap-3 overflow-hidden rounded-2xl border p-4 shadow-xl transition-all duration-300 backdrop-blur-md",
  {
    variants: {
      variant: {
        default:
          "border-gray-200/80 bg-white/95 text-gray-900 shadow-gray-900/10",
        order:
          "border-emerald-200/80 bg-white/95 text-gray-900 shadow-emerald-950/10 ring-1 ring-emerald-500/20",
        success:
          "border-green-200/80 bg-green-50/95 text-green-950 shadow-green-950/10",
        info:
          "border-amber-200/80 bg-amber-50/95 text-amber-950 shadow-amber-950/10",
        destructive:
          "border-red-200/80 bg-red-50/95 text-red-950 shadow-red-950/10",
      },
    },
    defaultVariants: {
      variant: "order",
    },
  }
)

interface NotificationProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof notificationVariants> {
  onClose?: () => void
}

function Notification({
  className,
  variant,
  children,
  onClose,
  ...props
}: NotificationProps) {
  return (
    <div
      data-slot="notification"
      role="status"
      aria-live="polite"
      className={cn(notificationVariants({ variant }), className)}
      {...props}
    >
      {children}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}

function NotificationIcon({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="notification-icon"
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-2xs",
        className
      )}
      {...props}
    />
  )
}

function NotificationContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="notification-content"
      className={cn("flex-1 space-y-1 pr-5", className)}
      {...props}
    />
  )
}

function NotificationTitle({
  className,
  ...props
}: React.ComponentProps<"h5">) {
  return (
    <h5
      data-slot="notification-title"
      className={cn(
        "text-xs font-bold tracking-tight text-gray-900 leading-snug flex items-center gap-1.5",
        className
      )}
      {...props}
    />
  )
}

function NotificationDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="notification-description"
      className={cn("text-[11px] text-gray-500 leading-normal", className)}
      {...props}
    />
  )
}

function NotificationAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="notification-action"
      className={cn("mt-2 flex items-center gap-2", className)}
      {...props}
    />
  )
}

export {
  Notification,
  NotificationIcon,
  NotificationContent,
  NotificationTitle,
  NotificationDescription,
  NotificationAction,
  notificationVariants,
}
