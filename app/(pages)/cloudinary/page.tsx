import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <Image
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          className="max-w-sm rounded-lg shadow-2xl"
          alt="Movie Poster"
          width={640}
          height={640}
        />
        <div>
          <h1 className="text-5xl font-bold">Spooky AI Hackathon!</h1>
          <p className="pt-6">
            We’re joining forces with Miguel Ángel Durán again to bring a new
            hackathon: Spooky AI Creations!
          </p>
          <p className="pt-4 pb-6">
            Your mission is to build something, anything, with Cloudinary that
            fits the theme of “Spooky AI Creation.”
          </p>
          <Link href="" className="btn btn-primary" type="button">
            Send Image to API
          </Link>
        </div>
      </div>
    </div>
  )
}
