import Link from "next/link";

const CalltoExpert = () => {
    return ( 
                <div className="my-16 text-center">
          <p className="mb-6 text-lg text-gray-600">Need help choosing the right acrylic for your project?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 will-change-transform transform-gpu"
            >
              Get Expert Consultation
            </Link>
            {/* <Link
              href="/quote"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-black bg-transparent border border-gray-300 rounded-full hover:border-gray-400 transition-all duration-300 hover:scale-105 will-change-transform transform-gpu"
            >
              Request Quote
            </Link> */}
          </div>
          {/* <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Free consultation
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              Custom solutions
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              Expert installation
            </span>
          </div> */}
        </div>
     );
}
 
export default CalltoExpert;