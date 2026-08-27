import { useEffect, useState } from 'react'
import { LiaAngleDoubleUpSolid } from 'react-icons/lia'


export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4  z-10 ">
      <button
        type="button"
        onClick={scrollToTop}
        className={classNames(
          isVisible ? 'opacity-100' : 'opacity-0',
          'bg-[#FF5E14] hover:bg-[#c54f19]  inline-flex items-center rounded-full p-3 text-white shadow-sm transition-opacity ',
        )}
      >
        <LiaAngleDoubleUpSolid className="h-5 w-5 text-[50px] font-bold leading-[80px] " aria-hidden="true" />
      </button>
    </div>
  )
}

 const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }