import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]:bg-slate-800 group-[.toaster]:text-white group-[.toaster]:border-slate-700 group-[.toaster]:shadow-2xl',
          description: 'group-[.toast]:text-slate-300',
          actionButton: 'group-[.toast]:bg-[#D4AF37] group-[.toast]:text-slate-900',
          cancelButton: 'group-[.toast]:bg-slate-700 group-[.toast]:text-slate-200',
          success: 'group-[.toast]:bg-green-900 group-[.toast]:text-white group-[.toast]:border-green-700',
          error: 'group-[.toast]:bg-red-900 group-[.toast]:text-white group-[.toast]:border-red-700',
        },
      }}
      icons={{
        success: <CircleCheckIcon className="size-5 text-green-400" />,
        info: <InfoIcon className="size-5 text-blue-400" />,
        warning: <TriangleAlertIcon className="size-5 text-yellow-400" />,
        error: <OctagonXIcon className="size-5 text-red-400" />,
        loading: <Loader2Icon className="size-5 animate-spin text-[#D4AF37]" />,
      }}
      {...props}
    />
  )
}

export { Toaster }
