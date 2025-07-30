// app/download/page.tsx
import { FaWindows, FaApple, FaLinux } from 'react-icons/fa';

export default function DownloadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Download App</h1>
      
      <div className="mb-8">
        <p className="text-gray-600 mb-4">
          Download our application for your operating system to get started.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Windows Download Card */}
        <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <FaWindows className="text-blue-500 text-3xl mr-3" />
            <h2 className="text-xl font-semibold">Windows</h2>
          </div>
          <p className="text-gray-600 mb-4">Version 2.1.0 (64-bit)</p>
          <a 
            href="/downloads/app-windows.exe" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            download
          >
            Download for Windows
          </a>
        </div>

        {/* Mac Download Card */}
        <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <FaApple className="text-gray-700 text-3xl mr-3" />
            <h2 className="text-xl font-semibold">macOS</h2>
          </div>
          <p className="text-gray-600 mb-4">Version 2.1.0 (Universal)</p>
          <a 
            href="/downloads/app-mac.dmg" 
            className="inline-block bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition-colors"
            download
          >
            Download for Mac
          </a>
        </div>

        {/* Linux Download Card */}
        <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <FaLinux className="text-orange-500 text-3xl mr-3" />
            <h2 className="text-xl font-semibold">Linux</h2>
          </div>
          <p className="text-gray-600 mb-4">Version 2.1.0 (Debian/Ubuntu)</p>
          <a 
            href="/downloads/app-linux.deb" 
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors"
            download
          >
            Download for Linux
          </a>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t">
        <h2 className="text-lg font-semibold mb-3">System Requirements</h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-1">
          <li>Windows 10/11, macOS 10.15+, or Ubuntu 20.04+/Debian 10+</li>
          <li>4GB RAM minimum, 8GB recommended</li>
          <li>2GHz dual-core processor</li>
          <li>500MB available disk space</li>
        </ul>
      </div>
    </div>
  );
}