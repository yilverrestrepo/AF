interface PriceProps {
  price: number
  period?: "night" | "day" | "week" | "month"
  size?: "sm" | "md" | "lg"
  showCurrency?: boolean
  className?: string
}

export default function Price({
  price,
  period = "night",
  size = "md",
  showCurrency = true,
  className = "",
}: PriceProps) {
  const periodText = {
    night: "/noche",
    day: "/día",
    week: "/semana",
    month: "/mes",
  }

  const sizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <div className={`font-semibold ${sizeClasses[size]} ${className}`}>
      {showCurrency && "€"}
      {price}
      <span className="text-gray-500 font-normal text-sm ml-1">{periodText[period]}</span>
    </div>
  )
}

