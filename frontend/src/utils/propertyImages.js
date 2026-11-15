export function getPropertyImages(property) {
  const images = Array.isArray(property?.images) ? property.images : []
  if (images.length) return images.map((image) => typeof image === 'string' ? image : image?.url || image?.src).filter(Boolean)
  return [property?.coverImage, property?.image].filter(Boolean)
}
