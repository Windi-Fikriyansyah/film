import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="mt-16 py-12 border-t border-gray-800">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                {/* Social Icons */}
                <div className="flex items-center gap-4 mb-8">
                    <a href="#" className="text-gray-400 hover:text-white transition">
                        <Facebook className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                        <Instagram className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                        <Twitter className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                        <Youtube className="w-6 h-6" />
                    </a>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 mb-8">
                    <div className="flex flex-col gap-2">
                        <a href="#" className="hover:underline">Audio Description</a>
                        <a href="#" className="hover:underline">Investor Relations</a>
                        <a href="#" className="hover:underline">Legal Notices</a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <a href="#" className="hover:underline">Help Center</a>
                        <a href="#" className="hover:underline">Jobs</a>
                        <a href="#" className="hover:underline">Cookie Preferences</a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <a href="#" className="hover:underline">Gift Cards</a>
                        <a href="#" className="hover:underline">Terms of Use</a>
                        <a href="#" className="hover:underline">Corporate Information</a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <a href="#" className="hover:underline">Media Center</a>
                        <a href="#" className="hover:underline">Privacy</a>
                        <a href="#" className="hover:underline">Contact Us</a>
                    </div>
                </div>

                {/* Service Code Button */}
                <button className="border border-gray-600 px-3 py-1 text-sm text-gray-400 hover:text-white transition mb-6">
                    Service Code
                </button>

                {/* Copyright */}
                <p className="text-xs text-gray-500">© 2024 REBAHIN. All Rights Reserved.</p>
            </div>
        </footer>
    )
}
