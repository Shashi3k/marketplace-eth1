

import Link from "next/link"


export default function Navbar() {

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between">
            <div>
              <Link href="#" legacyBehavior>
              <a  className="font-medium mr-8 text-gray-500 hover:text-gray-900">Home</a>
              </Link>
              <Link href="#" legacyBehavior>
              <a  className="font-medium mr-8 text-gray-500 hover:text-gray-900">Marketplace</a>
              </Link>
              <Link href="#" legacyBehavior>
              <a  className="font-medium mr-8 text-gray-500 hover:text-gray-900">Blogs</a>
              </Link>
            </div>
            <div>
              <Link href="#" legacyBehavior>
              <a  className="font-medium mr-8 text-gray-500 hover:text-gray-900">Whishlist</a>
              </Link>
              <Link href="#" legacyBehavior>
              <a  className="w-flex px-6 py-3 text-white font-medium mr-8 bg-indigo-600  rounded-md  hover:bg-indigo-900">Log in</a>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </section>
  )
}
