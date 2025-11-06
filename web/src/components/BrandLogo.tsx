import React from 'react'

type Variant = 'head' | 'courier'

type Props = { variant?: Variant; size?: number; className?: string; title?: string }

export const BrandLogo: React.FC<Props> = ({ variant = 'head', size = 48, className = '', title }) => {
  const src = variant === 'head' ? '/branding/bull-head.svg' : '/branding/bull-courier.svg'
  const alt = variant === 'head' ? 'BullBox brand head' : 'BullBox courier bull'
  return (
    <img src={src} width={size} height={size} className={className} alt={alt} title={title ?? alt} />
  )
}

export default BrandLogo
