// Additional Pages (Profile, Analytics, etc.) would continue here...
        // For brevity, I'll include just a few key additional components

        // Certificates Page Component
        export const CertificatesPage = ({ user, userProgress, onNavigate }) => {
            const certificates = [
                {
                    id: 1,
                    title: "JavaScript Fundamentals",
                    issueDate: "2024-01-20",
                    score: 92,
                    credentialId: "JS-2024-001",
                    status: "verified"
                },
                {
                    id: 2,
                    title: "React Development",
                    issueDate: "2024-01-15",
                    score: 88,
                    credentialId: "REACT-2024-002",
                    status: "verified"
                },
                {
                    id: 3,
                    title: "Python Programming",
                    issueDate: "2024-01-10",
                    score: 95,
                    credentialId: "PY-2024-003",
                    status: "verified"
                }
            ];

            return (
                <div className="min-h-screen bg-gray-50">
                    <nav className="bg-white shadow-sm border-b">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <button
                                    onClick={() => onNavigate('dashboard')}
                                    className="flex items-center text-gray-600 hover:text-gray-900"
                                >
                                    <i className="fas fa-arrow-left mr-2"></i>
                                    Back to Dashboard
                                </button>
                                <h1 className="text-xl font-bold text-gray-900">My Certificates</h1>
                                <div></div>
                            </div>
                        </div>
                    </nav>

                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Certificates Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-certificate text-green-600 text-2xl"></i>
                                </div>
                                <div className="text-2xl font-bold text-gray-900 mb-1">{certificates.length}</div>
                                <div className="text-gray-600">Certificates Earned</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-star text-blue-600 text-2xl"></i>
                                </div>
                                <div className="text-2xl font-bold text-gray-900 mb-1">
                                    {Math.round(certificates.reduce((acc, cert) => acc + cert.score, 0) / certificates.length)}%
                                </div>
                                <div className="text-gray-600">Average Score</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-shield-alt text-purple-600 text-2xl"></i>
                                </div>
                                <div className="text-2xl font-bold text-gray-900 mb-1">
                                    {certificates.filter(c => c.status === 'verified').length}
                                </div>
                                <div className="text-gray-600">Verified</div>
                            </div>
                        </div>

                        {/* Certificates Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {certificates.map((certificate) => (
                                <div key={certificate.id} className="bg-white rounded-xl shadow-sm border overflow-hidden card-hover">
                                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                                        <div className="flex items-center justify-between mb-4">
                                            <i className="fas fa-certificate text-3xl"></i>
                                            <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs font-medium">
                                                Verified
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">Certificate of Completion</h3>
                                        <p className="text-blue-100 text-sm">ExamPro Learning Platform</p>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="font-semibold text-gray-900 mb-2">{certificate.title}</h4>
                                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                                            <div className="flex justify-between">
                                                <span>Issue Date:</span>
                                                <span>{certificate.issueDate}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Score:</span>
                                                <span className="font-medium text-green-600">{certificate.score}%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Credential ID:</span>
                                                <span className="font-mono text-xs">{certificate.credentialId}</span>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                                <i className="fas fa-download mr-2"></i>
                                                Download
                                            </button>
                                            <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm">
                                                <i className="fas fa-share mr-2"></i>
                                                Share
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        };

        export default CertificatesPage;