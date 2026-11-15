import { useEffect, useRef, useState } from 'react'
import { MapPin, X } from 'lucide-react'

export default function LocationSuggest({ value, onChange, cities }) {
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const root = useRef(null)
  const suggestions = value.trim()
    ? cities.filter((city) => city.toLowerCase().includes(value.trim().toLowerCase())).slice(0, 5)
    : cities.slice(0, 5)

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => { if (!root.current?.contains(event.target)) { setOpen(false); setFocused(false) } }
    const onKeyDown = (event) => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
      setActiveIndex((index) => suggestions.length ? (index < 0 ? 0 : (index + 1) % suggestions.length) : -1)
    } else if (event.key === 'ArrowUp' && suggestions.length) {
      event.preventDefault()
      setActiveIndex((index) => (index < 0 ? suggestions.length - 1 : (index + suggestions.length - 1) % suggestions.length))
    } else if (event.key === 'Enter' && open && suggestions[activeIndex]) {
      event.preventDefault()
      onChange(suggestions[activeIndex])
      setOpen(false)
    }
  }

  return (
    <div ref={root} className="relative flex min-w-0 flex-1 items-center gap-3">
      <MapPin size={17} className="shrink-0 text-brand-700" />
      <div className="flex h-10 min-w-0 flex-1 flex-col justify-between">
        <label htmlFor="home-location" className={`h-3 text-[10px] font-bold uppercase tracking-wider text-stone-500 transition-opacity ${focused ? 'opacity-100' : 'opacity-0'}`}>Location</label>
        <input id="home-location" type="text" role="combobox" aria-label="Location" aria-autocomplete="list" aria-expanded={open} aria-controls="home-location-options" aria-activedescendant={open && activeIndex >= 0 && suggestions[activeIndex] ? `home-location-option-${activeIndex}` : undefined} value={value} onFocus={() => { setFocused(true); setOpen(true) }} onBlur={() => { setFocused(false); setOpen(false) }} onChange={(event) => { onChange(event.target.value); setActiveIndex(-1); setOpen(true) }} onKeyDown={handleKeyDown} placeholder="City, area or landmark..." className="min-h-0 min-w-0 bg-transparent text-sm font-semibold text-stone-900 outline-none placeholder:font-medium placeholder:text-stone-400 focus-visible:outline-none" />
        {open && suggestions.length > 0 && <div id="home-location-options" role="listbox" className="absolute left-0 right-0 top-full z-30 mt-4 rounded-xl border border-stone-200 bg-white p-1.5 shadow-xl">
          {suggestions.map((city, index) => <button key={city} id={`home-location-option-${index}`} type="button" role="option" aria-selected={index === activeIndex} onMouseDown={(event) => event.preventDefault()} onMouseEnter={() => setActiveIndex(index)} onClick={() => { onChange(city); setOpen(false) }} className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm ${index === activeIndex ? 'bg-brand-50 text-brand-800' : 'text-stone-700'}`}>{city}</button>)}
        </div>}
      </div>
      {value && <button type="button" aria-label="Clear location" onClick={() => onChange('')} className="rounded-full p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700"><X size={15} /></button>}
    </div>
  )
}
