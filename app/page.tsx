// import Link from "next/link"
// import { Button } from "@/components/ui/button"

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
//         <h1 className="text-6xl font-bold">
//           Welcome to <span className="text-blue-600">Mindful Journal</span>
//         </h1>
//         <p className="mt-3 text-2xl">Reflect, grow, and track your journey.</p>
//         <div className="flex mt-6">
//           <Link href="/signup" passHref>
//             <Button className="mr-4">Sign Up</Button>
//           </Link>
//           <Link href="/login" passHref>
//             <Button variant="outline">Log In</Button>
//           </Link>
//         </div>
//       </main>
//     </div>
//   )
// }


import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-black">
          Welcome to <span className="text-blue-600">Mindful Journal</span>
        </h1>
        <p className="mt-3 text-2xl text-gray-700">Reflect, grow, and track your journey.</p>
        <div className="flex mt-6">
          <Link href="/signup" passHref>
            <Button className="mr-4 bg-blue-500 text-white hover:bg-blue-400">
              Sign Up
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-100">
              Log In
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
