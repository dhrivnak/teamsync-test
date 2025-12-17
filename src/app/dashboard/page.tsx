import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Header } from '../header'
import { Footer } from '../footer'

export default async function Dashboard() {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth-token')

  if (!authToken) {
    redirect('/login')
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Protected Dashboard
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This page is only accessible to authenticated users.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">
                        You are successfully authenticated!
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Dashboard Features
                  </h2>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                        ✓
                      </span>
                      <span className="ml-3 text-gray-700">
                        Access team analytics and reports
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                        ✓
                      </span>
                      <span className="ml-3 text-gray-700">
                        Manage projects and tasks
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                        ✓
                      </span>
                      <span className="ml-3 text-gray-700">
                        Collaborate with team members
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 text-indigo-600">
                        ✓
                      </span>
                      <span className="ml-3 text-gray-700">
                        View real-time notifications
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        <strong>For accessibility testing:</strong> This page
                        demonstrates a protected route that requires
                        authentication to access.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
