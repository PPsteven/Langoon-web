import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"
import "./slider.css"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      "slider",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="slider-track relative h-0.5 w-full grow overflow-hidden rounded-full bg-gray-400 transition-all">
      <SliderPrimitive.Range className="slider-range absolute h-full bg-red-500" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="slider-thumb block h-0 w-0 bg-red-500 rounded-full transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
