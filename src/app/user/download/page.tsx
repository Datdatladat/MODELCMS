// app/download/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { FaWindows, FaApple, FaLinux, FaDownload } from 'react-icons/fa';
import { FiMonitor, FiCpu, FiHardDrive, FiLoader } from 'react-icons/fi';
import { getVersions, type OSVersion, type Version } from '@/service/version';

export default function DownloadPage() {
  const [versions, setVersions] = useState<OSVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        setLoading(true);
        const response = await getVersions();
        if (response.success) {
          setVersions(response.data);
        } else {
          setError('Không thể tải danh sách phiên bản');
        }
      } catch (err) {
        setError('Lỗi kết nối đến máy chủ');
        console.error('Error fetching versions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVersions();
  }, []);

  const getOSIcon = (os: string) => {
    switch (os.toUpperCase()) {
      case 'WINDOWS':
        return FaWindows;
      case 'MACOS':
        return FaApple;
      case 'LINUX':
        return FaLinux;
      default:
        return FaDownload;
    }
  };

  const getOSColors = (os: string) => {
    switch (os.toUpperCase()) {
      case 'WINDOWS':
        return {
          bg: 'from-blue-500 to-blue-600',
          hover: 'hover:border-blue-200',
          button: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
        };
      case 'MACOS':
        return {
          bg: 'from-gray-700 to-gray-800',
          hover: 'hover:border-gray-300',
          button: 'from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900'
        };
      case 'LINUX':
        return {
          bg: 'from-orange-500 to-orange-600',
          hover: 'hover:border-orange-200',
          button: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
        };
      default:
        return {
          bg: 'from-gray-500 to-gray-600',
          hover: 'hover:border-gray-200',
          button: 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
        };
    }
  };

  const getOSDisplayName = (os: string) => {
    switch (os.toUpperCase()) {
      case 'WINDOWS':
        return 'Windows';
      case 'MACOS':
        return 'macOS';
      case 'LINUX':
        return 'Linux';
      default:
        return os;
    }
  };

  const getOSSubtitle = (os: string) => {
    switch (os.toUpperCase()) {
      case 'WINDOWS':
        return 'Windows 10/11';
      case 'MACOS':
        return 'Intel & Apple Silicon';
      case 'LINUX':
        return 'Ubuntu/Debian';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <FiLoader className="animate-spin h-8 w-8 text-red-600 mr-2" />
              <span className="text-lg font-medium text-gray-700">Đang tải danh sách phiên bản...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-red-800 mb-2">Lỗi tải dữ liệu</h2>
              <p className="text-red-600">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Thử lại
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
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
          {versions.map((osData) => {
            const IconComponent = getOSIcon(osData.os);
            const colors = getOSColors(osData.os);
            const displayName = getOSDisplayName(osData.os);
            const subtitle = getOSSubtitle(osData.os);

            return (
              <div 
                key={osData.os}
                className={`bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 ${colors.hover} group`}
              >
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${colors.bg} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-white text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{displayName}</h2>
                    <p className="text-gray-500">{subtitle}</p>
                  </div>
                </div>

                <div className="mb-6 space-y-3">
                  {osData.versions.map((version, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-gray-700">{version.osTypeDetail}</p>
                          <p className="text-sm text-gray-500">Phiên bản {version.version}</p>
                        </div>
                      </div>
                      <a 
                        href={version.download_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full flex items-center justify-center space-x-2 bg-gradient-to-r ${colors.button} text-white px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl group`}
                      >
                        <FaDownload className="text-sm group-hover:scale-110 transition-transform duration-300" />
                        <span>Tải xuống {version.osTypeDetail}</span>
                      </a>
                    </div>
                  ))}
                </div>

                {/* If no versions available */}
                {osData.versions.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-gray-500">Chưa có phiên bản nào khả dụng</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Show message if no versions available */}
        {versions.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-yellow-800 mb-2">Chưa có phiên bản nào</h2>
              <p className="text-yellow-600">Hiện tại chưa có phiên bản nào khả dụng để tải xuống.</p>
            </div>
          </div>
        )}

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