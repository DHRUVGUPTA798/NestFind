import { useEffect, useState } from 'react'
import { imageService } from '../../services/imageService'

export default function PropertyImage({ src, alt, className = '', ...props }) {
  const [resolved, setResolved] = useState({ reference: '', url: '' })
  const [failedReference, setFailedReference] = useState('')
  const isLocal = typeof src === 'string' && src.startsWith('idb:')
  const resolvedSrc = isLocal ? (resolved.reference === src ? resolved.url : '') : src || ''
  const failed = failedReference === src

  useEffect(() => {
    let active = true
    if (!isLocal) return undefined
    imageService.acquire(src)
      .then((url) => { if (active) setResolved({ reference: src, url }); else imageService.release(src) })
      .catch(() => { if (active) setFailedReference(src) })
    return () => {
      active = false
      imageService.release(src)
    }
  }, [isLocal, src])

  if (failed || !resolvedSrc) {
    return <div role="img" aria-label={failed ? `${alt || 'Property'} image unavailable` : `${alt || 'Property'} image loading`} className={`bg-gradient-to-br from-brand-100 via-stone-100 to-emerald-50 ${className}`} {...props} />
  }
  return <img src={resolvedSrc} alt={alt || ''} className={className} onError={() => setFailedReference(src)} {...props} />
}
