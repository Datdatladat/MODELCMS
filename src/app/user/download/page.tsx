// app/download/page.tsx
import { FaWindows, FaApple, FaLinux, FaDownload } from 'react-icons/fa';
import { FiMonitor, FiCpu, FiHardDrive } from 'react-icons/fi';

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
            Tải xuống ứng dụng TinaCode
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tải xuống ứng dụng TinaCode cho hệ điều hành của bạn để bắt đầu trải nghiệm các tính năng AI mạnh mẽ.
          </p>
        </div>

        {/* Download Cards Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12">
          {/* Windows Download Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <FaWindows className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Windows</h2>
                <p className="text-gray-500">Windows 10/11</p>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 mb-2">Phiên bản 2.1.0 (64-bit)</p>
              <p className="text-sm text-gray-500">Tương thích với Windows 10 và 11</p>
            </div>
            <a 
              href="/downloads/tinacode-windows-x64.exe" 
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-4 rounded-2xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl group"
              download
            >
              <FaDownload className="text-lg group-hover:scale-110 transition-transform duration-300" />
              <span>Tải xuống cho Windows</span>
            </a>
          </div>

          {/* Mac Download Cards */}
          <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-300 group">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <FaApple className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">macOS</h2>
                <p className="text-gray-500">Intel & Apple Silicon</p>
              </div>
            </div>
            <div className="mb-6 space-y-3">
              <div className="border border-gray-200 rounded-xl p-3">
                <p className="font-medium text-gray-700">Apple Silicon (M1/M2/M3)</p>
                <p className="text-sm text-gray-500">Phiên bản 2.1.0 - ARM64</p>
                <a 
                  href="/downloads/tinacode-macos-arm64.dmg" 
                  className="mt-2 w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium"
                  download
                >
                  <FaDownload className="text-sm" />
                  <span>Tải xuống ARM64</span>
                </a>
              </div>
              <div className="border border-gray-200 rounded-xl p-3">
                <p className="font-medium text-gray-700">Intel Chip</p>
                <p className="text-sm text-gray-500">Phiên bản 2.1.0 - x64</p>
                <a 
                  href="/downloads/tinacode-macos-x64.dmg" 
                  className="mt-2 w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium"
                  download
                >
                  <FaDownload className="text-sm" />
                  <span>Tải xuống Intel</span>
                </a>
              </div>
            </div>
          </div>

          {/* Linux Download Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 group">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <FaLinux className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Linux</h2>
                <p className="text-gray-500">Ubuntu/Debian</p>
              </div>
            </div>
            <div className="mb-6 space-y-3">
              <div className="border border-gray-200 rounded-xl p-3">
                <p className="font-medium text-gray-700">Debian/Ubuntu (.deb)</p>
                <p className="text-sm text-gray-500">Phiên bản 2.1.0 - AMD64</p>
                <a 
                  href="/downloads/tinacode-linux-amd64.deb" 
                  className="mt-2 w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium"
                  download
                >
                  <FaDownload className="text-sm" />
                  <span>Tải xuống .deb</span>
                </a>
              </div>
              <div className="border border-gray-200 rounded-xl p-3">
                <p className="font-medium text-gray-700">AppImage (Universal)</p>
                <p className="text-sm text-gray-500">Phiên bản 2.1.0 - Portable</p>
                <a 
                  href="/downloads/tinacode-linux.AppImage" 
                  className="mt-2 w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium"
                  download
                >
                  <FaDownload className="text-sm" />
                  <span>Tải xuống AppImage</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* System Requirements Section */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
              <FiMonitor className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Yêu cầu hệ thống</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FiMonitor className="text-blue-600 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Hệ điều hành</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Windows 10/11 (64-bit)</li>
                  <li>• macOS 10.15+ (Catalina trở lên)</li>
                  <li>• Ubuntu 20.04+/Debian 10+</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FiCpu className="text-green-600 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Bộ xử lý & RAM</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• CPU 2GHz dual-core trở lên</li>
                  <li>• RAM tối thiểu 4GB</li>
                  <li>• RAM khuyến nghị 8GB</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FiHardDrive className="text-orange-600 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Dung lượng ổ đĩa</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Cần tối thiểu 500MB</li>
                  <li>• Khuyến nghị 1GB trống</li>
                  <li>• SSD để hiệu suất tốt nhất</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Installation Notes */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">📝 Lưu ý cài đặt</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <p><strong>macOS:</strong> Có thể cần phải cho phép ứng dụng trong System Preferences → Security & Privacy.</p>
            </div>
            <div>
              <p><strong>Linux:</strong> Đối với .deb: <code className="bg-blue-200 px-2 py-1 rounded">sudo dpkg -i tinacode-linux-amd64.deb</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}